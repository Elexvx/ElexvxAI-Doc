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

export function HomeFooter({ lang, layout = 'home' }: { lang: string; layout?: 'home' | 'blog' }) {
  const containerClassName =
    layout === 'blog'
      ? 'mx-auto w-full max-w-[1460px] px-8 md:px-12 lg:px-20'
      : 'mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16';

  return (
    <footer className="mt-8 sm:mt-10 md:mt-12">
      <div className={`${containerClassName} pb-8 sm:pb-10`}>
        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="md:max-w-[16rem] md:pe-4 xl:max-w-sm">
            <h2 className="text-lg font-semibold text-zinc-900 sm:text-xl md:text-2xl dark:text-zinc-100">
              探索智能边界
            </h2>
            <p className="mt-3 max-w-xs text-sm text-zinc-500 sm:text-base dark:text-zinc-400">
              持续推动 AI 研究走向真实产业场景，连接研究、开发与落地实践。
            </p>
          </div>

          <div className="grid w-full grid-cols-2 justify-items-start gap-x-8 gap-y-6 sm:grid-cols-3 sm:gap-x-10 md:ms-auto md:w-auto md:grid-cols-3 md:justify-items-end md:gap-x-12 lg:gap-8 xl:gap-14">
            {footerColumns.map((group) => (
              <div key={group.title} className="text-left md:text-right">
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
      </div>

      <div className="w-full overflow-hidden py-7 sm:py-9 md:py-10">
        <p className="w-full select-none whitespace-nowrap text-center text-[clamp(4.5rem,15vw,22rem)] font-black leading-[0.86] tracking-[-0.045em] text-zinc-900 dark:text-zinc-100">
          ElexvxAILab
        </p>
      </div>

      <div className={`${containerClassName} py-6 sm:py-7 md:py-8`}>
        <p className="text-center text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
          Copyright © 2024 ElexvxAI Lab | 隶属于 宏翔商道（南京）科技发展有限公司 | ICP备案：苏ICP备2025160017号
        </p>
      </div>
    </footer>
  );
}
