import { BookOpen, Gift, PenTool } from 'lucide-react';
import type { HomeCapabilityItem } from '@/lib/home-content';

const iconMap = {
  PenTool,
  Gift,
  BookOpen,
};

export function CapabilitiesSection({ capabilities }: { capabilities: HomeCapabilityItem[] }) {
  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 md:grid-cols-3 md:gap-6">
      {capabilities.map((cap) => {
        const Icon = iconMap[cap.icon as keyof typeof iconMap] ?? PenTool;

        return (
          <article
            key={cap.title}
            className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition duration-300 sm:min-h-[240px] sm:p-6 dark:border-zinc-800 dark:bg-zinc-900/60"
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${cap.hoverGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
            />
            <div
              className={`pointer-events-none absolute left-1/2 top-1/2 h-40 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b ${cap.hoverGlow} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
            />

            <Icon
              className="relative h-6 w-6 text-zinc-700 transition-colors duration-300 group-hover:text-white/90 dark:text-zinc-300"
              strokeWidth={1.5}
            />
            <div className="relative mt-auto pt-8">
              <h2
                className="text-xl font-semibold leading-tight text-zinc-900 transition-colors duration-300 group-hover:text-white sm:text-2xl dark:text-zinc-100"
              >
                {cap.title}
              </h2>
              <p
                className="mt-2.5 text-sm leading-6 text-zinc-600 transition-colors duration-300 group-hover:text-white/90 sm:text-base dark:text-zinc-400"
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
