import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type Row = {
  metric_name: string;
  metric_value: number;
  rating: string | null;
  device: string | null;
  created_at: string;
};

const METRICS = ["LCP", "INP", "CLS", "FCP", "TTFB"] as const;

// Google's "good" thresholds (ms, except CLS which is unitless)
const THRESHOLDS: Record<string, { good: number; poor: number; unit: string }> = {
  LCP: { good: 2500, poor: 4000, unit: "ms" },
  INP: { good: 200, poor: 500, unit: "ms" },
  CLS: { good: 0.1, poor: 0.25, unit: "" },
  FCP: { good: 1800, poor: 3000, unit: "ms" },
  TTFB: { good: 800, poor: 1800, unit: "ms" },
};

function percentile(values: number[], p: number) {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length));
  return sorted[idx];
}

function format(metric: string, value: number | null) {
  if (value === null) return "–";
  if (metric === "CLS") return value.toFixed(3);
  return `${Math.round(value)} ms`;
}

function verdict(metric: string, value: number | null) {
  if (value === null) return null;
  const t = THRESHOLDS[metric];
  if (!t) return null;
  if (value <= t.good) return { label: "Bra", variant: "default" as const };
  if (value <= t.poor) return { label: "Behöver förbättras", variant: "secondary" as const };
  return { label: "Dåligt", variant: "destructive" as const };
}

const WebVitalsPanel = ({ days }: { days: number }) => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const since = new Date(Date.now() - days * 86_400_000).toISOString();
    supabase
      .from("web_vitals")
      .select("metric_name, metric_value, rating, device, created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: true })
      .limit(5000)
      .then(({ data }) => {
        if (!active) return;
        setRows((data as Row[]) ?? []);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [days]);

  const summary = useMemo(
    () =>
      METRICS.map((m) => {
        const values = rows.filter((r) => r.metric_name === m).map((r) => r.metric_value);
        return { metric: m, p75: percentile(values, 75), samples: values.length };
      }),
    [rows],
  );

  const series = useMemo(() => {
    const byDay = new Map<string, Record<string, number[]>>();
    rows.forEach((r) => {
      const day = r.created_at.slice(0, 10);
      const bucket = byDay.get(day) ?? {};
      bucket[r.metric_name] = [...(bucket[r.metric_name] ?? []), r.metric_value];
      byDay.set(day, bucket);
    });
    return [...byDay.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([day, bucket]) => ({
        date: day.slice(5),
        LCP: percentile(bucket.LCP ?? [], 75) ?? undefined,
        INP: percentile(bucket.INP ?? [], 75) ?? undefined,
        FCP: percentile(bucket.FCP ?? [], 75) ?? undefined,
        TTFB: percentile(bucket.TTFB ?? [], 75) ?? undefined,
      }));
  }, [rows]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {summary.map((s) => {
          const v = verdict(s.metric, s.p75);
          return (
            <Card key={s.metric}>
              <CardHeader className="pb-2">
                <CardDescription>{s.metric} (p75)</CardDescription>
                <CardTitle className="text-2xl">{format(s.metric, s.p75)}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{s.samples} mätningar</span>
                {v && <Badge variant={v.variant}>{v.label}</Badge>}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Core Web Vitals över tid (p75 per dag)</CardTitle>
          <CardDescription>
            Mätt hos riktiga besökare. CLS visas separat eftersom skalan skiljer sig.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[320px]">
          {loading ? (
            <p className="text-sm text-muted-foreground">Laddar…</p>
          ) : series.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Inga mätningar ännu. Data samlas in automatiskt när besökare laddar sidan.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="ms" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="LCP" stroke="hsl(var(--primary))" dot={false} />
                <Line type="monotone" dataKey="INP" stroke="hsl(var(--accent))" dot={false} />
                <Line type="monotone" dataKey="FCP" stroke="hsl(var(--muted-foreground))" dot={false} />
                <Line type="monotone" dataKey="TTFB" stroke="hsl(var(--secondary-foreground))" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WebVitalsPanel;
