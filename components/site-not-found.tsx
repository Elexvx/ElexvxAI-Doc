'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/logo';
import { SITE_STANDALONE_CONTAINER_CLASS } from '@/lib/responsive-layout';

const content = {
  zh: {
    code: '404',
    title: '页面不存在',
    description: '你访问的页面可能已被移动、删除，或链接地址有误。',
    home: '返回首页',
    docs: '查看文档',
  },
  en: {
    code: '404',
    title: 'Page not found',
    description: 'The page you are looking for may have been moved, removed, or the URL is incorrect.',
    home: 'Back to Home',
    docs: 'Browse Docs',
  },
} as const;

export function SiteNotFound() {
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en' : 'zh';
  const copy = content[locale];
  const base = `/${locale}`;

  return (
    <main className={`${SITE_STANDALONE_CONTAINER_CLASS} flex flex-1 items-center py-12 md:py-16 lg:py-20`}>
      <section className="w-full rounded-3xl bg-zinc-50/80 p-8 text-center backdrop-blur-sm md:p-12 dark:bg-zinc-900/60">
        <div className="mx-auto flex w-fit items-center justify-center rounded-full bg-white px-4 py-2 dark:bg-zinc-900">
          <Logo />
        </div>
        <p className="mt-8 text-6xl font-black leading-none tracking-[-0.04em] text-zinc-900 md:text-7xl dark:text-zinc-100">
          {copy.code}
        </p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950 md:text-4xl dark:text-zinc-50">{copy.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-500 md:text-base dark:text-zinc-400">{copy.description}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href={base}
            className="inline-flex w-full items-center justify-center rounded-full bg-zinc-950 px-7 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 sm:w-auto sm:text-base dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
          >
            {copy.home}
          </Link>
          <Link
            href={`${base}/docs`}
            className="inline-flex w-full items-center justify-center rounded-full bg-zinc-100 px-7 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 sm:w-auto sm:text-base dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          >
            {copy.docs}
          </Link>
        </div>
      </section>
    </main>
  );
}
