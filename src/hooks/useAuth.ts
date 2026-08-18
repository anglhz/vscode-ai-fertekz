import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (!newSession?.user) {
        setIsAdmin(false);
        setLoading(false);
      } else {
        setTimeout(async () => {
          const { data } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", newSession.user.id)
            .eq("role", "admin")
            .maybeSingle();
          setIsAdmin(!!data);
          setLoading(false);
        }, 0);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) setLoading(false);
      setSession(data.session);
      setUser(data.session?.user ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, user, isAdmin, loading };
}
