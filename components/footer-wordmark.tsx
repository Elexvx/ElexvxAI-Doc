'use client';

import { useLayoutEffect, useRef, useState } from 'react';

const MIN_FONT_SIZE = 32;
const MAX_LAYOUT_WIDTH = 1880;
const LAYOUT_VIEWPORT_RATIO = 0.92;
const SAFE_FIT_RATIO = 0.995;
const MEASURE_FONT_SIZE = 100;

export function FooterWordmark({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(180);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const measureEl = measureRef.current;
    if (!container || !measureEl) return;

    const updateFontSize = () => {
      measureEl.style.fontSize = `${MEASURE_FONT_SIZE}px`;
      const measuredWidth = measureEl.getBoundingClientRect().width;
      if (!measuredWidth) return;

      const screenMaxWidth = Math.min(MAX_LAYOUT_WIDTH, window.innerWidth * LAYOUT_VIEWPORT_RATIO);
      const targetWidth = Math.min(container.clientWidth, screenMaxWidth) * SAFE_FIT_RATIO;
      const unitWidth = measuredWidth / MEASURE_FONT_SIZE;
      if (!unitWidth) return;
      const scaledFontSize = targetWidth / unitWidth;
      const clampedFontSize = Math.max(MIN_FONT_SIZE, scaledFontSize);
      setFontSize(clampedFontSize);
    };

    updateFontSize();
    const observer = new ResizeObserver(updateFontSize);
    observer.observe(container);

    document.fonts?.ready.then(updateFontSize).catch(() => {});
    window.addEventListener('resize', updateFontSize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateFontSize);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden py-7 text-center sm:py-9 md:py-10">
      <span
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 inline-block whitespace-nowrap font-semibold leading-[0.9] tracking-[-0.04em] opacity-0"
      >
        {text}
      </span>
      <p
        ref={textRef}
        className="inline-block select-none whitespace-nowrap font-semibold leading-[0.9] tracking-[-0.04em] text-zinc-900 dark:text-zinc-100"
        style={{ fontSize: `${fontSize}px` }}
      >
        {text}
      </p>
    </div>
  );
}
