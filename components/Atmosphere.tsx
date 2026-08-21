"use client";

import { useEffect, useRef } from "react";

type Puff = {
  x: number; // 0..1 relative
  y: number;
  rx: number; // relative radius
  ry: number;
  rot: number;
  alpha: number;
  phase: number;
  speed: number;
  drift: number;
  dark: boolean;
};

type Speck = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
};

// Deep-blue smoke field after the DeepSeek Harness hero. The smoke is drawn on
// a low-res offscreen canvas and upscaled — the blur comes free.
const Atmosphere = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const off = document.createElement("canvas");
    const octx = off.getContext("2d");
    if (!octx) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let ow = 0;
    let oh = 0;
    let specks: Speck[] = [];
    let running = true;
    const start = performance.now();

    const puffs: Puff[] = [
      // bright cloud wisps
      { x: 0.62, y: 0.2, rx: 0.5, ry: 0.14, rot: -0.35, alpha: 0.3, phase: 0.3, speed: 0.045, drift: 0.09, dark: false },
      { x: 0.38, y: 0.5, rx: 0.44, ry: 0.11, rot: 0.25, alpha: 0.22, phase: 1.7, speed: 0.035, drift: 0.11, dark: false },
      { x: 0.82, y: 0.55, rx: 0.36, ry: 0.1, rot: -0.15, alpha: 0.24, phase: 3.1, speed: 0.05, drift: 0.08, dark: false },
      { x: 0.18, y: 0.16, rx: 0.32, ry: 0.1, rot: 0.4, alpha: 0.16, phase: 4.4, speed: 0.04, drift: 0.1, dark: false },
      { x: 0.52, y: 0.72, rx: 0.4, ry: 0.1, rot: 0.1, alpha: 0.15, phase: 5.5, speed: 0.03, drift: 0.09, dark: false },
      // dark pockets for depth
      { x: 0.12, y: 0.65, rx: 0.34, ry: 0.2, rot: 0.2, alpha: 0.5, phase: 2.2, speed: 0.028, drift: 0.06, dark: true },
      { x: 0.9, y: 0.12, rx: 0.3, ry: 0.18, rot: -0.3, alpha: 0.42, phase: 0.9, speed: 0.033, drift: 0.05, dark: true },
    ];

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ow = Math.max(160, Math.floor(width / 5));
      oh = Math.max(120, Math.floor(height / 5));
      off.width = ow;
      off.height = oh;

      const count = width < 768 ? 50 : 100;
      specks = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.5,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        a: Math.random() * 0.26 + 0.14,
      }));
    };

    const drawSmoke = (t: number) => {
      // deep blue base — brighter around the upper middle, dark corners
      const base = octx.createLinearGradient(0, 0, ow * 0.3, oh);
      base.addColorStop(0, "#0e1c33");
      base.addColorStop(0.45, "#16345e");
      base.addColorStop(0.8, "#122a4d");
      base.addColorStop(1, "#0b1220");
      octx.globalCompositeOperation = "source-over";
      octx.filter = "none";
      octx.fillStyle = base;
      octx.fillRect(0, 0, ow, oh);

      const glow = octx.createRadialGradient(
        ow * 0.6,
        oh * 0.35,
        0,
        ow * 0.6,
        oh * 0.35,
        Math.max(ow, oh) * 0.75,
      );
      glow.addColorStop(0, "rgba(58, 106, 165, 0.55)");
      glow.addColorStop(0.5, "rgba(38, 76, 128, 0.22)");
      glow.addColorStop(1, "rgba(10, 18, 32, 0)");
      octx.fillStyle = glow;
      octx.fillRect(0, 0, ow, oh);

      octx.filter = "blur(10px)";
      for (const p of puffs) {
        const cx = (p.x + Math.cos(t * p.speed + p.phase) * p.drift) * ow;
        const cy = (p.y + Math.sin(t * p.speed * 0.8 + p.phase) * p.drift * 0.7) * oh;
        const rot = p.rot + Math.sin(t * p.speed * 0.5 + p.phase) * 0.15;
        const rx = p.rx * ow;
        const ry = p.ry * oh * (1 + Math.sin(t * p.speed * 0.6 + p.phase) * 0.2);

        octx.save();
        octx.translate(cx, cy);
        octx.rotate(rot);
        const g = octx.createRadialGradient(0, 0, 0, 0, 0, 1);
        if (p.dark) {
          octx.globalCompositeOperation = "source-over";
          g.addColorStop(0, `rgba(8, 14, 26, ${p.alpha})`);
          g.addColorStop(1, "rgba(8, 14, 26, 0)");
        } else {
          octx.globalCompositeOperation = "screen";
          g.addColorStop(0, `rgba(196, 212, 228, ${p.alpha})`);
          g.addColorStop(0.55, `rgba(150, 175, 205, ${p.alpha * 0.4})`);
          g.addColorStop(1, "rgba(150, 175, 205, 0)");
        }
        octx.scale(rx, ry);
        octx.fillStyle = g;
        octx.beginPath();
        octx.arc(0, 0, 1, 0, Math.PI * 2);
        octx.fill();
        octx.restore();
      }
      octx.filter = "none";
      octx.globalCompositeOperation = "source-over";

      // settle into the page background at the bottom
      const fade = octx.createLinearGradient(0, oh * 0.55, 0, oh);
      fade.addColorStop(0, "rgba(10, 10, 10, 0)");
      fade.addColorStop(1, "rgba(10, 10, 10, 1)");
      octx.fillStyle = fade;
      octx.fillRect(0, 0, ow, oh);
    };

    const drawGrid = () => {
      const step = 56;
      ctx.save();
      ctx.strokeStyle = "rgba(180, 205, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
      ctx.restore();
    };

    const draw = (now: number) => {
      if (!running) return;
      const t = (now - start) / 1000;

      drawSmoke(t);
      ctx.clearRect(0, 0, width, height);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(off, 0, 0, ow, oh, 0, 0, width, height);

      drawGrid();

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const p of specks) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -8) p.x = width + 8;
        if (p.x > width + 8) p.x = -8;
        if (p.y < -8) p.y = height + 8;
        if (p.y > height + 8) p.y = -8;

        const pulse = 0.75 + Math.sin(t * 1.8 + p.x * 0.01) * 0.25;
        ctx.fillStyle = `rgba(210, 228, 255, ${p.a * pulse})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      frame = requestAnimationFrame(draw);
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
};

export default Atmosphere;
