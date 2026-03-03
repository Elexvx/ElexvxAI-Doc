import Link from 'next/link';
import type { AppLocale } from '@/lib/i18n';
import { HomeFooter } from '../_components/home-footer';
import { getSponsorsPageCopy, sponsorItems } from './sponsors-data';

export default async function SponsorsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as AppLocale;
  const copy = getSponsorsPageCopy(locale);

  return (
    <>
      <main className="mx-auto w-full max-w-[1460px] px-6 pb-10 pt-6 md:px-12 md:pb-12 md:pt-10 lg:px-20">
        <section className="rounded-2xl border border-zinc-200 px-5 py-6 sm:px-7 sm:py-8 dark:border-zinc-800">
          <div className="grid gap-6 md:grid-cols-[1fr_minmax(260px,320px)] md:items-center md:gap-10">
            <div className="space-y-3">
              <p className="text-xs font-medium tracking-[0.16em] text-zinc-500 uppercase dark:text-zinc-400">
                Sponsor Wall
              </p>
              <h1 className="text-3xl leading-tight font-semibold tracking-[-0.02em] text-zinc-900 sm:text-4xl dark:text-zinc-100">
                {copy.title}
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base dark:text-zinc-400">{copy.description}</p>
              <Link
                href={`/${lang}/docs`}
                className="inline-flex items-center rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
              >
                {copy.cta}
              </Link>
              <p className="text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">{copy.subline}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
              <article className="rounded-xl border border-zinc-200 px-4 py-3 dark:border-zinc-800">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{copy.stats.totalLabel}</p>
                <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{copy.stats.totalValue}</p>
              </article>
              <article className="rounded-xl border border-zinc-200 px-4 py-3 dark:border-zinc-800">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{copy.stats.yearlyLabel}</p>
                <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{copy.stats.yearlyValue}</p>
              </article>
              <article className="rounded-xl border border-zinc-200 px-4 py-3 dark:border-zinc-800">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{copy.stats.openSourceLabel}</p>
                <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{copy.stats.openSourceValue}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-semibold tracking-[0.08em] text-zinc-500 uppercase dark:text-zinc-400">{copy.sectionTitle}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {sponsorItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4 transition hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition group-hover:opacity-100`} />
                <div className="relative">
                  <span className="inline-flex rounded-full border border-zinc-300/80 px-2.5 py-1 text-[11px] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
                    {item.category[locale]}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-zinc-900 dark:text-zinc-100">{item.name}</h3>
                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-zinc-500 dark:text-zinc-400">
                    {item.description[locale]}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <HomeFooter lang={lang} layout="blog" />
    </>
  );
}
