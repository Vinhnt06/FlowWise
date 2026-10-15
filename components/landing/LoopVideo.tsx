'use client';

import { useEffect, useRef } from 'react';

/**
 * A silent decorative loop. It plays only while on screen and stays on its poster frame
 * under prefers-reduced-motion.
 */
export default function LoopVideo({ src, poster, className = '' }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const apply = () => {
      if (visible && !query.matches) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      apply();
    });
    observer.observe(video);
    query.addEventListener('change', apply);
    return () => {
      observer.disconnect();
      query.removeEventListener('change', apply);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
    >
      <source src={src} type="video/webm" />
    </video>
  );
}
