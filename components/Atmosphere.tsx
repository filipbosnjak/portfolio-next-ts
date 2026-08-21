"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
};

const Atmosphere = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = Math.max(window.innerHeight, 800);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 768 ? 28 : 70;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        a: Math.random() * 0.35 + 0.08,
      }));
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      const gx = width * 0.62;
      const gy = height * 0.42;
      const glow = ctx.createRadialGradient(gx, gy, 20, gx, gy, width * 0.42);
      glow.addColorStop(0, "rgba(103,153,254,0.16)");
      glow.addColorStop(0.35, "rgba(65,118,230,0.06)");
      glow.addColorStop(1, "rgba(10,10,10,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      const gx2 = width * 0.18;
      const gy2 = height * 0.78;
      const glow2 = ctx.createRadialGradient(gx2, gy2, 10, gx2, gy2, width * 0.3);
      glow2.addColorStop(0, "rgba(115,163,210,0.08)");
      glow2.addColorStop(1, "rgba(10,10,10,0)");
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.fillStyle = `rgba(186, 210, 255, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute top-[12%] right-[-8%] hidden size-[800px] rounded-full bg-[radial-gradient(circle,rgba(103,153,254,0.14)_0%,rgba(103,153,254,0.04)_35%,transparent_68%)] md:block" />
      <div className="absolute bottom-[-120px] left-[8%] size-[420px] rounded-full bg-[radial-gradient(circle,rgba(115,163,210,0.1),transparent_70%)] opacity-40" />
      <div className="absolute right-[12%] bottom-[-80px] size-[360px] rounded-full bg-[radial-gradient(circle,rgba(103,153,254,0.08),transparent_70%)] opacity-30" />
    </div>
  );
};

export default Atmosphere;
