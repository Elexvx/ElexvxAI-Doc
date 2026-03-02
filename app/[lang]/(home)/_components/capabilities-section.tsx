'use client';

import { useState } from 'react';
import { capabilities } from './home-data';

export function CapabilitiesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isTouchLikePointer = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: none), (pointer: coarse)').matches;

  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 md:gap-6 lg:grid-cols-3">
      {capabilities.map((cap, index) => {
        const Icon = cap.icon;
        const isActive = activeIndex === index;

        return (
          <article
            key={cap.title}
            className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition duration-300 sm:min-h-[240px] sm:p-6 dark:border-zinc-800 dark:bg-zinc-900/60"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onClick={() => {
              if (!isTouchLikePointer()) return;
              setActiveIndex((prev) => (prev === index ? null : index));
            }}
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${cap.hoverGradient} transition-opacity duration-300 group-hover:opacity-100 ${isActive ? 'opacity-100' : 'opacity-0'}`}
            />
            <div
              className={`pointer-events-none absolute left-1/2 top-1/2 h-40 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b ${cap.hoverGlow} blur-2xl transition-opacity duration-300 group-hover:opacity-100 ${isActive ? 'opacity-100' : 'opacity-0'}`}
            />

            <Icon
              className={`relative h-6 w-6 transition-colors duration-300 group-hover:text-white/90 ${
                isActive ? 'text-white/90' : 'text-zinc-700 dark:text-zinc-300'
              }`}
              strokeWidth={1.5}
            />
            <div className="relative mt-auto pt-8">
              <h2
                className={`text-xl font-semibold leading-tight transition-colors duration-300 group-hover:text-white sm:text-2xl ${
                  isActive ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'
                }`}
              >
                {cap.title}
              </h2>
              <p
                className={`mt-2.5 text-sm leading-6 transition-colors duration-300 group-hover:text-white/90 sm:text-base ${
                  isActive ? 'text-white/90' : 'text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {cap.description}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
