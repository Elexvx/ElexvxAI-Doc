import Link from 'next/link';
import { footerColumns } from './home-data';
import { i18n } from '@/lib/i18n';

function withLocale(lang: string, href: string) {
  if (/^(https?:\/\/|mailto:|tel:)/.test(href)) return href;
  if (!href.startsWith('/')) return `/${lang}/${href}`.replaceAll(/\/+/g, '/');
  if (i18n.languages.some((locale) => href === `/${locale}` || href.startsWith(`/${locale}/`))) return href;
  return `/${lang}${href}`.replaceAll(/\/+/g, '/');
}

function isHttpLink(href: string) {
  return href.startsWith('http://') || href.startsWith('https://');
}

export function HomeFooter({ lang }: { lang: string }) {
  return (
    <footer className="mt-16 sm:mt-20 md:mt-24">
      <div className="mx-auto w-full max-w-[var(--fd-layout-width)] px-4 pb-10 sm:pb-12">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr] lg:gap-8">
          <div className="lg:pe-4">
            <h2 className="text-lg font-semibold text-zinc-900 sm:text-xl md:text-2xl dark:text-zinc-100">
              探索智能边界
            </h2>
            <p className="mt-3 max-w-xs text-sm text-zinc-500 sm:text-base dark:text-zinc-400">
              持续推动 AI 研究走向真实产业场景，连接研究、开发与落地实践。
            </p>
          </div>

          {footerColumns.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-zinc-900 sm:text-base dark:text-zinc-100">{group.title}</h3>
              <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                {group.links.map((item) => {
                  const href = withLocale(lang, item.href);

                  return (
                    <li key={item.label}>
                      {isHttpLink(href) ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-zinc-500 transition hover:text-zinc-900 sm:text-sm lg:text-base dark:text-zinc-400 dark:hover:text-zinc-100"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className="text-xs text-zinc-500 transition hover:text-zinc-900 sm:text-sm lg:text-base dark:text-zinc-400 dark:hover:text-zinc-100"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full overflow-hidden py-7 sm:py-9 md:py-10">
        <p className="w-full select-none whitespace-nowrap text-center text-[clamp(3.25rem,13vw,15rem)] font-black leading-[0.86] tracking-[-0.045em] text-zinc-900 dark:text-zinc-100">
          ElexvxAILab
        </p>
      </div>

      <div className="mx-auto w-full max-w-[var(--fd-layout-width)] px-4 py-6 sm:py-7 md:py-8">
        <p className="text-center text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
          Copyright © 2024 ElexvxAI Lab | 隶属于 宏翔商道（南京）科技发展有限公司 | ICP备案：苏ICP备2025160017号
        </p>
      </div>
    </footer>
  );
}
