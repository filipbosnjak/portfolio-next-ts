"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SESSION_KEY = "vt_session";

function sessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

function send(payload: object, beacon = false) {
  const body = JSON.stringify(payload);
  if (beacon && typeof navigator.sendBeacon === "function") {
    navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    return;
  }
  fetch("/api/track", {
    method: "POST",
    body,
    headers: { "content-type": "application/json" },
    keepalive: true,
  }).catch(() => {});
}

/**
 * Records one page view per route change and reports how long the page stayed
 * visible. Cookie-free: the session id lives in sessionStorage only.
 */
export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || navigator.webdriver) return;

    const visitId = crypto.randomUUID();
    const startedAt = Date.now();
    send({
      type: "view",
      visitId,
      sessionId: sessionId(),
      path: pathname,
      referrer: document.referrer || null,
    });

    const leave = () => send({ type: "leave", visitId, durationMs: Date.now() - startedAt }, true);
    const onVisibility = () => {
      if (document.visibilityState === "hidden") leave();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", leave);
    return () => {
      leave();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", leave);
    };
  }, [pathname]);

  return null;
}
