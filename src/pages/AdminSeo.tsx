import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import WebVitalsPanel from "@/components/seo/WebVitalsPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { RefreshCw, LogOut } from "lucide-react";
import { toast } from "sonner";

type SearchRow = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };
type Sitemap = {
  path: string;
  lastSubmitted?: string;
  lastDownloaded?: string;
  isPending?: boolean;
  errors?: string;
  warnings?: string;
  contents?: { type: string; submitted?: string; indexed?: string }[];
};
type Report = {
  status: string;
  message?: string;
  siteUrl?: string;
  candidates?: string[];
  range?: { startDate: string; endDate: string; days: number };
  totals?: { clicks: number; impressions: number; ctr: number; position: number } | null;
  byDate?: SearchRow[];
  pages?: SearchRow[];
  queries?: SearchRow[];
  sitemaps?: Sitemap[];
  indexing?: Record<string, string> | null;
};

const RANGES = [7, 28, 90];

const AdminSeo = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [days, setDays] = useState(28);
  const [report, setReport] = useState<Report | null>(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [loading, user, navigate]);

  const load = async () => {
    setFetching(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("seo-report", {
        body: { days, targetUrl: "https://fertekz.com/" },
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      setReport(data as Report);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kunde inte hämta Search Console-data");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (isAdmin) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, days]);

  const chartData = useMemo(
    () =>
      (report?.byDate ?? []).map((r) => ({
        date: r.keys[0].slice(5),
        Klick: r.clicks,
        Visningar: r.impressions,
      })),
    [report],
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Laddar…</div>;
  }

  if (user && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Ingen behörighet</CardTitle>
            <CardDescription>
              Ditt konto saknar adminrollen. Be en administratör att lägga till rollen för
              {" "}{user.email}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => supabase.auth.signOut()}>
              Logga ut
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totals = report?.totals;

  const kpis = [
    { label: "Klick", value: totals ? totals.clicks.toLocaleString("sv-SE") : "–" },
    { label: "Visningar", value: totals ? totals.impressions.toLocaleString("sv-SE") : "–" },
    { label: "CTR", value: totals ? `${(totals.ctr * 100).toFixed(1)} %` : "–" },
    { label: "Snittposition", value: totals ? totals.position.toFixed(1) : "–" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>SEO-panel | Fertekz IT</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-6 py-10 space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">SEO-panel</h1>
            <p className="text-muted-foreground text-sm">
              {report?.siteUrl ?? "fertekz.com"}
              {report?.range && ` · ${report.range.startDate} – ${report.range.endDate}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-md border border-border overflow-hidden">
              {RANGES.map((r) => (
                <button
                  key={r}
                  onClick={() => setDays(r)}
                  className={`px-3 py-1.5 text-sm transition-colors ${
                    days === r ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  {r} d
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={load} disabled={fetching}>
              <RefreshCw className={`h-4 w-4 ${fetching ? "animate-spin" : ""}`} />
              <span className="ml-2 hidden sm:inline">Uppdatera</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await supabase.auth.signOut();
                toast.success("Utloggad");
                navigate("/auth");
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {error && (
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-lg">Kunde inte hämta data</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
          </Card>
        )}

        {report?.status === "no_property" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ingen verifierad egendom</CardTitle>
              <CardDescription>{report.message}</CardDescription>
            </CardHeader>
          </Card>
        )}

        <Tabs defaultValue="oversikt">
          <TabsList>
            <TabsTrigger value="oversikt">Översikt</TabsTrigger>
            <TabsTrigger value="indexering">Indexering</TabsTrigger>
            <TabsTrigger value="sidor">Toppsidor</TabsTrigger>
            <TabsTrigger value="vitals">Core Web Vitals</TabsTrigger>
          </TabsList>

          <TabsContent value="oversikt" className="space-y-6 pt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {kpis.map((k) => (
                <Card key={k.label}>
                  <CardHeader className="pb-2">
                    <CardDescription>{k.label}</CardDescription>
                    <CardTitle className="text-3xl">{k.value}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Klick och visningar över tid</CardTitle>
              </CardHeader>
              <CardContent className="h-[320px]">
                {chartData.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Ingen rapporterad data för perioden ännu.
                  </p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: 8,
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="Visningar"
                        stroke="hsl(var(--muted-foreground))"
                        fill="hsl(var(--muted))"
                      />
                      <Area
                        type="monotone"
                        dataKey="Klick"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary) / 0.25)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Toppsökord</CardTitle>
              </CardHeader>
              <CardContent>
                <SearchTable rows={report?.queries ?? []} label="Sökord" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="indexering" className="space-y-6 pt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Indexeringsstatus – startsidan</CardTitle>
                <CardDescription>Så ser Google på https://fertekz.com/ just nu.</CardDescription>
              </CardHeader>
              <CardContent>
                {report?.indexing ? (
                  <dl className="grid gap-3 sm:grid-cols-2">
                    {[
                      ["Resultat", report.indexing.verdict],
                      ["Täckning", report.indexing.coverageState],
                      ["Robots.txt", report.indexing.robotsTxtState],
                      ["Indexering tillåten", report.indexing.indexingState],
                      ["Senast genomsökt", report.indexing.lastCrawlTime],
                      ["Googles canonical", report.indexing.googleCanonical],
                      ["Angiven canonical", report.indexing.userCanonical],
                      ["Hämtning", report.indexing.pageFetchState],
                    ].map(([label, value]) => (
                      <div key={label as string} className="flex justify-between gap-4 border-b border-border pb-2">
                        <dt className="text-sm text-muted-foreground">{label}</dt>
                        <dd className="text-sm text-right break-all">{value ?? "–"}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-sm text-muted-foreground">Ingen indexeringsdata tillgänglig.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sitemap-status</CardTitle>
              </CardHeader>
              <CardContent>
                {(report?.sitemaps ?? []).length === 0 ? (
                  <p className="text-sm text-muted-foreground">Inga inskickade sitemaps.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sitemap</TableHead>
                        <TableHead>Inskickad</TableHead>
                        <TableHead>Hämtad</TableHead>
                        <TableHead className="text-right">URL:er</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {report!.sitemaps!.map((s) => {
                        const submitted = s.contents?.[0]?.submitted ?? "–";
                        const errors = Number(s.errors ?? 0);
                        const warnings = Number(s.warnings ?? 0);
                        return (
                          <TableRow key={s.path}>
                            <TableCell className="break-all">{s.path}</TableCell>
                            <TableCell>{s.lastSubmitted?.slice(0, 10) ?? "–"}</TableCell>
                            <TableCell>{s.lastDownloaded?.slice(0, 10) ?? "–"}</TableCell>
                            <TableCell className="text-right">{submitted}</TableCell>
                            <TableCell className="text-right">
                              {errors > 0 ? (
                                <Badge variant="destructive">{errors} fel</Badge>
                              ) : warnings > 0 ? (
                                <Badge variant="secondary">{warnings} varningar</Badge>
                              ) : s.isPending ? (
                                <Badge variant="secondary">Bearbetas</Badge>
                              ) : (
                                <Badge>OK</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sidor" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Toppsidor</CardTitle>
                <CardDescription>Sorterade efter klick i perioden.</CardDescription>
              </CardHeader>
              <CardContent>
                <SearchTable rows={report?.pages ?? []} label="Sida" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitals" className="pt-6">
            <WebVitalsPanel days={days} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const SearchTable = ({ rows, label }: { rows: SearchRow[]; label: string }) => {
  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">Ingen rapporterad data för perioden ännu.</p>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{label}</TableHead>
          <TableHead className="text-right">Klick</TableHead>
          <TableHead className="text-right">Visningar</TableHead>
          <TableHead className="text-right">CTR</TableHead>
          <TableHead className="text-right">Position</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.keys[0]}>
            <TableCell className="max-w-[320px] truncate">{r.keys[0]}</TableCell>
            <TableCell className="text-right">{r.clicks}</TableCell>
            <TableCell className="text-right">{r.impressions}</TableCell>
            <TableCell className="text-right">{(r.ctr * 100).toFixed(1)} %</TableCell>
            <TableCell className="text-right">{r.position.toFixed(1)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminSeo;
