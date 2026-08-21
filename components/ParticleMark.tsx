"use client";

import { useEffect, useRef } from "react";

type Dot = {
  hx: number; // home position
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  a: number;
  phase: number;
  freq: number;
  amp: number;
};

const sampleTextPoints = (
  width: number,
  height: number,
  text: string,
): { x: number; y: number; shade: number }[] => {
  const off = document.createElement("canvas");
  off.width = width;
  off.height = height;
  const ctx = off.getContext("2d");
  if (!ctx) return [];

  const family =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--font-host")
      .trim() || "Montserrat";
  const fontSize = Math.min(width * 0.2, height * 0.34, 260);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fff";
  ctx.font = `600 ${fontSize}px ${family}, Montserrat, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = `${Math.round(fontSize * 0.04)}px`;

  // centered in the gap between the hero copy and the terminal card
  const cx = width * 0.55;
  const cy = height * 0.45;
  ctx.fillText(text, cx, cy);

  // strict grid sampling gives the dithered dot-matrix look
  const step = width < 768 ? 7 : 6;
  const data = ctx.getImageData(0, 0, width, height).data;
  const points: { x: number; y: number; shade: number }[] = [];

  // wrap the flat letterforms onto a sphere: expand the middle, pull the
  // edges in, and shade by depth so the cluster reads as a round blob
  const R = fontSize * 1.05;
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha <= 80) continue;
      const dx = x - cx;
      const dy = y - cy;
      const r = Math.hypot(dx, dy);
      const k = Math.min(r / R, 1);
      const bulge = r > 0 ? (Math.sin((k * Math.PI) / 2) * R * 0.82) / r : 1;
      points.push({
        x: cx + dx * bulge,
        y: cy + dy * bulge,
        shade: Math.cos((k * Math.PI) / 2) * 0.7 + 0.3,
      });
    }
  }

  // soft cloud halo so the blob has ragged edges instead of a crisp outline
  const haloCount = Math.floor(points.length * 0.35);
  for (let i = 0; i < haloCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const rr = R * (0.55 + Math.pow(Math.random(), 0.6) * 0.65);
    points.push({
      x: cx + Math.cos(angle) * rr * 1.15,
      y: cy + Math.sin(angle) * rr * 0.85,
      shade: 0.25 + Math.random() * 0.25,
    });
  }

  return points;
};

// Dot-matrix mark after the DeepSeek Harness hero: dim square particles
// sitting in the shadowed part of the field, scattering away from the cursor.
const ParticleMark = ({ text = "FB" }: { text?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let running = true;
    let start = performance.now();
    const mouse = { x: 0, y: 0, active: false };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const points = sampleTextPoints(width, height, text);
      dots = points.map((pt) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * Math.min(width, height) * 0.5;
        // mostly faint dots, a few brighter sparks; depth shading from the
        // sphere wrap keeps the center bright and the rim in shadow
        let a = (0.1 + Math.random() * 0.35) * pt.shade;
        if (Math.random() < 0.08) a += 0.3 * pt.shade;
        return {
          hx: pt.x,
          hy: pt.y,
          x: width * 0.5 + Math.cos(angle) * dist,
          y: height * 0.5 + Math.sin(angle) * dist,
          vx: 0,
          vy: 0,
          size: Math.random() < 0.3 ? 3 : 2,
          a,
          phase: Math.random() * Math.PI * 2,
          freq: 0.4 + Math.random() * 0.8,
          amp: 1.5 + Math.random() * 3.5,
        };
      });
    };

    const REPEL_RADIUS = 120;
    const REPEL_FORCE = 2.4;

    const draw = (now: number) => {
      if (!running) return;
      const t = (now - start) / 1000;

      ctx.clearRect(0, 0, width, height);

      for (const p of dots) {
        // gentle idle wobble around home
        const tx = p.hx + Math.cos(t * p.freq + p.phase) * p.amp;
        const ty = p.hy + Math.sin(t * p.freq * 0.85 + p.phase) * p.amp;
        p.vx += (tx - p.x) * 0.03;
        p.vy += (ty - p.y) * 0.03;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < REPEL_RADIUS && d > 0.5) {
            const f = ((REPEL_RADIUS - d) / REPEL_RADIUS) * REPEL_FORCE;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }

        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;

        const pulse = 0.85 + Math.sin(t * 1.2 + p.phase) * 0.15;
        ctx.fillStyle = `rgba(198, 212, 230, ${p.a * pulse})`;
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }

      frame = requestAnimationFrame(draw);
    };

    const startLoop = () => {
      build();
      start = performance.now();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };

    const onResize = () => startLoop();

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active =
        mouse.x >= 0 && mouse.y >= 0 && mouse.x <= width && mouse.y <= height;
    };

    const onPointerLeave = () => {
      mouse.active = false;
    };

    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) startLoop();
    });
    startLoop();

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelled = true;
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave,
      );
    };
  }, [text]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 block h-full w-full"
      aria-hidden
    />
  );
};

export default ParticleMark;
