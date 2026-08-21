"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  phase: number;
  freq: number;
  amp: number;
};

const sampleTextPoints = (
  width: number,
  height: number,
  text: string,
): { x: number; y: number }[] => {
  const off = document.createElement("canvas");
  off.width = width;
  off.height = height;
  const ctx = off.getContext("2d");
  if (!ctx) return [];

  const family =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--font-host")
      .trim() || "Montserrat";
  const fontSize = Math.min(width * 0.38, height * 0.42, 380);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fff";
  ctx.font = `600 ${fontSize}px ${family}, Montserrat, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = `${Math.round(fontSize * 0.04)}px`;

  const cx = width * 0.68;
  const cy = height * 0.48;
  ctx.fillText(text, cx, cy);

  const step = width < 768 ? 7 : 5;
  const data = ctx.getImageData(0, 0, width, height).data;
  const points: { x: number; y: number }[] = [];

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > 80) {
        points.push({
          x: x + (Math.random() - 0.5) * step * 0.4,
          y: y + (Math.random() - 0.5) * step * 0.4,
        });
      }
    }
  }

  return points;
};

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
    let particles: Particle[] = [];
    let running = true;
    let start = performance.now();

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
      particles = points.map((pt) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * Math.min(width, height) * 0.55;
        return {
          x: width * 0.5 + Math.cos(angle) * dist,
          y: height * 0.5 + Math.sin(angle) * dist,
          tx: pt.x,
          ty: pt.y,
          vx: 0,
          vy: 0,
          r: Math.random() * 1.5 + 0.9,
          a: Math.random() * 0.28 + 0.4,
          phase: Math.random() * Math.PI * 2,
          freq: 0.7 + Math.random() * 1.4,
          amp: 4 + Math.random() * 10,
        };
      });
    };

    const draw = (now: number) => {
      if (!running) return;
      const t = (now - start) / 1000;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        const ox = Math.cos(t * p.freq + p.phase) * p.amp;
        const oy = Math.sin(t * p.freq * 0.85 + p.phase) * p.amp;
        const swirl = t * 0.22;
        const sx = ox * Math.cos(swirl) - oy * Math.sin(swirl);
        const sy = ox * Math.sin(swirl) + oy * Math.cos(swirl);

        const hx = p.tx + sx;
        const hy = p.ty + sy;
        p.vx += (hx - p.x) * 0.045;
        p.vy += (hy - p.y) * 0.045;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;

        const edge = Math.min(1, Math.max(0, (p.x / width - 0.32) / 0.18));
        const pulse = 0.8 + Math.sin(t * 1.6 + p.phase) * 0.2;
        ctx.fillStyle = `rgba(220, 236, 255, ${p.a * pulse * (0.35 + edge * 0.65)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      frame = requestAnimationFrame(draw);
    };

    const startLoop = () => {
      build();
      start = performance.now();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };

    const onResize = () => startLoop();

    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) startLoop();
    });
    startLoop();

    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
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
