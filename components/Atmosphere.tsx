"use client";

import { useEffect, useRef } from "react";

type Ribbon = {
  p: [number, number][]; // 4 bezier control points, relative coords
  width: number; // relative to canvas height
  alpha: number;
  dark: boolean;
  phase: number;
  speed: number;
  amp: number;
};

// Glassy silk-smoke field after the DeepSeek Harness hero. The ribbons are
// fat bezier strokes drawn on a tiny offscreen canvas and upscaled, so the
// heavy blur that makes them read as frosted glass is nearly free.
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
    let running = true;
    const start = performance.now();

    const ribbons: Ribbon[] = [
      // big bright smoke clouds, like the reference's white silk
      { p: [[0.55, 0.02], [0.75, 0.14], [0.95, 0.02], [1.15, 0.2]], width: 0.22, alpha: 0.75, dark: false, phase: 0.4, speed: 0.05, amp: 0.03 },
      { p: [[-0.18, 0.32], [0.05, 0.12], [0.2, 0.4], [0.38, 0.22]], width: 0.13, alpha: 0.35, dark: false, phase: 2.3, speed: 0.04, amp: 0.035 },
      { p: [[0.15, 1.05], [0.4, 0.7], [0.72, 0.95], [1.18, 0.55]], width: 0.2, alpha: 0.6, dark: false, phase: 4.1, speed: 0.045, amp: 0.03 },
      { p: [[0.6, 0.5], [0.8, 0.36], [1.0, 0.55], [1.16, 0.42]], width: 0.12, alpha: 0.4, dark: false, phase: 5.2, speed: 0.055, amp: 0.03 },
      // soft shadow folds
      { p: [[-0.1, 0.82], [0.3, 0.6], [0.6, 0.82], [1.12, 0.92]], width: 0.24, alpha: 0.35, dark: true, phase: 1.2, speed: 0.03, amp: 0.025 },
      { p: [[0.25, 0.2], [0.5, 0.42], [0.8, 0.14], [1.1, 0.3]], width: 0.13, alpha: 0.26, dark: true, phase: 3.4, speed: 0.045, amp: 0.03 },
    ];

    // faint constellation in the upper-middle, after the reference hero
    const nodes: [number, number][] = [
      [0.44, 0.1], [0.52, 0.06], [0.6, 0.11], [0.68, 0.07],
      [0.48, 0.19], [0.56, 0.23], [0.64, 0.18], [0.72, 0.15],
      [0.53, 0.31], [0.61, 0.29], [0.69, 0.26], [0.43, 0.26],
    ];
    const edges: [number, number][] = [
      [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 6], [3, 7],
      [4, 5], [5, 6], [6, 7], [4, 11], [5, 8], [6, 9], [7, 10],
      [8, 9], [9, 10], [11, 8],
    ];

    const drawConstellation = (t: number) => {
      const pos = nodes.map(([x, y], i) => [
        (x + Math.sin(t * 0.05 + i * 1.3) * 0.006) * width,
        (y + Math.cos(t * 0.04 + i * 2.1) * 0.006) * height,
      ]);
      ctx.save();
      ctx.strokeStyle = "rgba(160, 190, 230, 0.07)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const [a, b] of edges) {
        ctx.moveTo(pos[a][0], pos[a][1]);
        ctx.lineTo(pos[b][0], pos[b][1]);
      }
      ctx.stroke();
      ctx.fillStyle = "rgba(190, 210, 240, 0.2)";
      for (const [x, y] of pos) {
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

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

      ow = Math.max(150, Math.floor(width / 6));
      oh = Math.max(100, Math.floor(height / 6));
      off.width = ow;
      off.height = oh;
    };

    const drawSmoke = (t: number) => {
      octx.filter = "none";
      octx.globalCompositeOperation = "source-over";

      // saturated cobalt-blue base, brightest in the upper-left-center
      const base = octx.createLinearGradient(0, 0, ow, oh * 0.9);
      base.addColorStop(0, "#1a3260");
      base.addColorStop(0.4, "#3465ad");
      base.addColorStop(0.75, "#2a5492");
      base.addColorStop(1, "#0d1830");
      octx.fillStyle = base;
      octx.fillRect(0, 0, ow, oh);

      const glow = octx.createRadialGradient(
        ow * 0.42,
        oh * 0.35,
        0,
        ow * 0.42,
        oh * 0.35,
        Math.max(ow, oh) * 0.7,
      );
      glow.addColorStop(0, "rgba(74, 136, 218, 0.6)");
      glow.addColorStop(0.55, "rgba(48, 98, 170, 0.28)");
      glow.addColorStop(1, "rgba(13, 24, 48, 0)");
      octx.fillStyle = glow;
      octx.fillRect(0, 0, ow, oh);

      octx.filter = "blur(24px)";
      octx.lineCap = "round";
      for (const r of ribbons) {
        const pts = r.p.map(([x, y], i) => [
          (x + Math.sin(t * r.speed + r.phase + i * 1.7) * r.amp) * ow,
          (y + Math.cos(t * r.speed * 0.8 + r.phase + i * 2.1) * r.amp) * oh,
        ]);
        octx.globalCompositeOperation = r.dark ? "source-over" : "screen";
        octx.strokeStyle = r.dark
          ? `rgba(8, 16, 34, ${r.alpha})`
          : `rgba(213, 222, 233, ${r.alpha})`;
        octx.lineWidth = r.width * oh * (1 + Math.sin(t * r.speed + r.phase) * 0.12);
        octx.beginPath();
        octx.moveTo(pts[0][0], pts[0][1]);
        octx.bezierCurveTo(
          pts[1][0], pts[1][1],
          pts[2][0], pts[2][1],
          pts[3][0], pts[3][1],
        );
        octx.stroke();
      }
      octx.filter = "none";
      octx.globalCompositeOperation = "source-over";

      // vignette so the edges sink into shadow like frosted glass
      const vin = octx.createRadialGradient(
        ow * 0.5,
        oh * 0.42,
        Math.min(ow, oh) * 0.3,
        ow * 0.5,
        oh * 0.42,
        Math.max(ow, oh) * 0.85,
      );
      vin.addColorStop(0, "rgba(7, 13, 26, 0)");
      vin.addColorStop(1, "rgba(7, 13, 26, 0.28)");
      octx.fillStyle = vin;
      octx.fillRect(0, 0, ow, oh);

      // settle into the page background at the bottom
      const fade = octx.createLinearGradient(0, oh * 0.72, 0, oh);
      fade.addColorStop(0, "rgba(10, 10, 10, 0)");
      fade.addColorStop(1, "rgba(10, 10, 10, 1)");
      octx.fillStyle = fade;
      octx.fillRect(0, 0, ow, oh);
    };

    const drawGrid = () => {
      const step = 56;
      ctx.save();
      ctx.strokeStyle = "rgba(180, 205, 255, 0.035)";
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
      drawConstellation(t);

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
