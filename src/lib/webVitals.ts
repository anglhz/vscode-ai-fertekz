import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "wv_session_id";

function sessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function deviceType() {
  return window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
}

const sent = new Set<string>();

async function send(metric: Metric) {
  if (sent.has(metric.id)) return;
  sent.add(metric.id);

  try {
    await supabase.from("web_vitals").insert({
      path: window.location.pathname,
      metric_name: metric.name,
      metric_value: Math.round(metric.value * 1000) / 1000,
      rating: metric.rating,
      device: deviceType(),
      session_id: sessionId(),
    });
  } catch {
    // Silent: measurement must never break the page
  }
}

export function initWebVitals() {
  if (typeof window === "undefined") return;
  onCLS(send);
  onFCP(send);
  onINP(send);
  onLCP(send);
  onTTFB(send);
}
