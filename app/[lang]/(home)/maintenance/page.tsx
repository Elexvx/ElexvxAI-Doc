import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type AppLocale } from '@/lib/i18n';
import { buildAbsoluteUrl, buildLocaleAlternates, buildLocalePath } from '@/lib/site';
import { HomeFooter } from '../_components/home-footer';

const maintenanceCopy: Record<
  AppLocale,
  {
    eyebrow: string;
    title: string;
    description: string;
    statusLabel: string;
    statusValue: string;
    updateLabel: string;
    updateValue: string;
    impactLabel: string;
    impactValue: string;
    homeCta: string;
    docsCta: string;
    metadataDescription: string;
  }
> = {
  zh: {
    eyebrow: '系统维护中',
    title: '我们正在升级服务能力',
    description: '当前页面正在进行系统维护与功能升级，部分内容暂不可用。维护完成后将第一时间恢复访问。',
    statusLabel: '当前状态',
    statusValue: '计划维护',
    updateLabel: '最近更新',
    updateValue: '基础服务稳定，正在分批恢复功能。',
    impactLabel: '影响范围',
    impactValue: '部分页面访问与交互可能受限。',
    homeCta: '返回首页',
    docsCta: '查看文档',
    metadataDescription: 'ElexvxAI Lab 页面维护中，服务升级完成后将恢复访问。',
  },
  en: {
    eyebrow: 'Maintenance In Progress',
    title: 'We are upgrading core services',
    description:
      'This page is currently under scheduled maintenance and feature upgrades. Some content is temporarily unavailable and will be restored soon.',
    statusLabel: 'Current status',
    statusValue: 'Scheduled maintenance',
    updateLabel: 'Latest update',
    updateValue: 'Core services are stable and features are being restored in phases.',
    impactLabel: 'Impact',
    impactValue: 'Some page access and interactions may be limited.',
    homeCta: 'Back to Home',
    docsCta: 'Browse Docs',
    metadataDescription: 'ElexvxAI Lab page is under maintenance and will be back online after service upgrades.',
  },
};

async function validateLocale(lang: string): Promise<AppLocale> {
  if (!isLocale(lang)) notFound();
  return lang as AppLocale;
}

export default async function MaintenancePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = await validateLocale(lang);
  const copy = maintenanceCopy[locale];

  return (
    <>
      <main className="mx-auto w-full max-w-[1460px] px-6 pb-10 pt-6 md:px-12 md:pb-12 md:pt-10 lg:px-20">
        <section className="rounded-2xl border border-zinc-200 bg-zinc-50/60 px-5 py-6 sm:px-7 sm:py-8 dark:border-zinc-800 dark:bg-zinc-900/40">
          <p className="text-xs font-medium tracking-[0.16em] text-zinc-500 uppercase dark:text-zinc-400">{copy.eyebrow}</p>
          <h1 className="mt-3 text-3xl leading-tight font-semibold tracking-[-0.02em] text-zinc-900 sm:text-4xl dark:text-zinc-100">
            {copy.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-500 sm:text-base dark:text-zinc-400">{copy.description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <article className="rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/70">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{copy.statusLabel}</p>
              <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">{copy.statusValue}</p>
            </article>
            <article className="rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/70">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{copy.updateLabel}</p>
              <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">{copy.updateValue}</p>
            </article>
            <article className="rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/70">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{copy.impactLabel}</p>
              <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">{copy.impactValue}</p>
            </article>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`/${lang}`}
              className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              {copy.homeCta}
            </Link>
            <Link
              href={`/${lang}/docs`}
              className="inline-flex items-center justify-center rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              {copy.docsCta}
            </Link>
          </div>
        </section>
      </main>
      <HomeFooter lang={locale} layout="blog" />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = await validateLocale(lang);
  const copy = maintenanceCopy[locale];
  const canonical = buildAbsoluteUrl(buildLocalePath(locale, '/maintenance'));

  return {
    title: copy.title,
    description: copy.metadataDescription,
    alternates: {
      canonical,
      languages: buildLocaleAlternates('/maintenance'),
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: copy.title,
      description: copy.metadataDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.metadataDescription,
    },
  };
}
