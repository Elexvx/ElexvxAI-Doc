import Link from 'next/link';
import { exploreItems } from './home-data';

export function ExploreSection() {
  return (
    <section className="mt-14 md:mt-20">
      <h2 className="mb-5 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-100">探索</h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {exploreItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.title} href="docs" className="rounded-2xl">
              <div
                className={`flex h-44 items-center justify-center rounded-2xl border border-zinc-200 bg-gradient-to-br ${item.tint} p-4 sm:h-52 md:h-60 dark:border-zinc-700/80`}
              >
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-100/50 bg-white/85 text-zinc-800 shadow-sm backdrop-blur sm:h-20 sm:w-20 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-100">
                  <Icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.5} />
                </span>
              </div>
              <p className="mt-3 px-1 text-base font-medium text-zinc-900 sm:text-lg dark:text-zinc-100">{item.title}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
