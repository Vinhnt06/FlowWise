'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Play, Pause, Video } from 'lucide-react';

interface FintechBackgroundVideoProps {
  videoSrc?: string;
}

export default function FintechBackgroundVideo({
  videoSrc = '/videos/hero-bg.mp4',
}: FintechBackgroundVideoProps) {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [hasVideoFile, setHasVideoFile] = useState<boolean>(false);
  const mousePos = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const animFrameId = useRef<number | null>(null);

  // Check if video file actually exists
  useEffect(() => {
    if (videoSrc) {
      const v = document.createElement('video');
      v.src = videoSrc;
      v.onloadeddata = () => setHasVideoFile(true);
      v.onerror = () => setHasVideoFile(false);
    }
  }, [videoSrc]);

  // Track subtle mouse movement across hero to warp liquidity currents
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 60FPS Fluid Liquidity Currents Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes representing micro-transactions & currencies
    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'emerald' : 'gold',
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    let step = 0;

    const render = () => {
      if (!isPlaying) {
        animFrameId.current = requestAnimationFrame(render);
        return;
      }

      step += 0.008;
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';

      // 1. Draw Organic Harmonic Liquidity Stream Waves (Sinusoidal Splines)
      const streamConfigs = [
        {
          color: isDark ? 'rgba(16, 185, 129, 0.45)' : 'rgba(5, 150, 105, 0.25)',
          freq: 0.0018,
          speed: 1.2,
          yOffset: height * 0.48,
          amplitude: height * 0.09,
          lineWidth: 2.2,
        },
        {
          color: isDark ? 'rgba(245, 158, 11, 0.42)' : 'rgba(217, 119, 6, 0.22)',
          freq: 0.0022,
          speed: 0.9,
          yOffset: height * 0.52,
          amplitude: height * 0.08,
          lineWidth: 1.8,
        },
        {
          color: isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(37, 99, 235, 0.18)',
          freq: 0.0015,
          speed: 1.4,
          yOffset: height * 0.56,
          amplitude: height * 0.07,
          lineWidth: 1.5,
        },
        {
          color: isDark ? 'rgba(16, 185, 129, 0.22)' : 'rgba(5, 150, 105, 0.12)',
          freq: 0.0028,
          speed: 1.6,
          yOffset: height * 0.45,
          amplitude: height * 0.11,
          lineWidth: 1.2,
        },
      ];

      streamConfigs.forEach((stream) => {
        ctx.beginPath();
        ctx.lineWidth = stream.lineWidth;
        ctx.strokeStyle = stream.color;

        const mouseInfluence = (mousePos.current.y - 0.5) * 35;

        for (let x = 0; x <= width; x += 12) {
          const y =
            stream.yOffset +
            mouseInfluence +
            Math.sin(x * stream.freq + step * stream.speed) * stream.amplitude +
            Math.sin(x * stream.freq * 0.5 - step * 0.7) * (stream.amplitude * 0.4);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // 2. Draw Floating Currency Node Constellations
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color === 'emerald'
            ? isDark
              ? `rgba(16, 185, 129, ${currentOpacity})`
              : `rgba(5, 150, 105, ${currentOpacity * 0.6})`
            : isDark
            ? `rgba(245, 158, 11, ${currentOpacity})`
            : `rgba(217, 119, 6, ${currentOpacity * 0.6})`;
        ctx.fill();

        // Connect nearby nodes with hairline fiber lines
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(148, 163, 184, ${(1 - dist / 110) * 0.12})`
              : `rgba(100, 116, 139, ${(1 - dist / 110) * 0.08})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isPlaying, theme]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Layer 1: High-Resolution 16:9 3D Cinematic Render Backdrop */}
      <div className="absolute inset-0 opacity-40 dark:opacity-35 transition-opacity duration-700">
        <Image
          src="/images/fintech-hero-bg.jpg"
          alt="Fintech Ambient Liquidity Flow"
          fill
          priority
          className="object-cover object-center filter saturate-120"
        />
      </div>

      {/* Layer 2: Optional Actual MP4 Video Stream (if file uploaded to /videos/hero-bg.mp4) */}
      {hasVideoFile && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Layer 3: 60FPS Dynamic Liquidity Currents Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full mix-blend-screen dark:mix-blend-lighten"
      />

      {/* Layer 4: Architectural Radial Mask & Theme Gradients */}
      <div
        className={`absolute inset-0 transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-[#0B0F17]/60 via-[#0B0F17]/30 to-[#0B0F17]'
            : 'bg-gradient-to-b from-[#F8FAFC]/75 via-[#F8FAFC]/45 to-[#F8FAFC]'
        }`}
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 45%, black 40%, transparent 95%)',
          maskImage: 'radial-gradient(ellipse at 50% 45%, black 40%, transparent 95%)',
        }}
      />

      {/* Ambient Motion Control Button (Allows user to toggle/pause animation) */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-auto hidden sm:block">
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-3 py-1.5 rounded-full bg-bg-surface/80 backdrop-blur-md border border-border-main text-[11px] font-mono text-text-muted hover:text-text-primary transition-all flex items-center gap-1.5 shadow-sm hover:border-border-strong"
          title={isPlaying ? 'Pause Ambient Video Motion' : 'Resume Ambient Video Motion'}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <Video className="w-3 h-3 text-primary" />
          <span>{isPlaying ? 'Live Ambient Flow' : 'Motion Paused'}</span>
          {isPlaying ? (
            <Pause className="w-2.5 h-2.5 ml-0.5 opacity-60" />
          ) : (
            <Play className="w-2.5 h-2.5 ml-0.5 opacity-60" />
          )}
        </button>
      </div>
    </div>
  );
}
