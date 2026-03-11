import Link from 'next/link';
import { getHomeFooterContent } from '@/lib/home-content';
import type { AppLocale } from '@/lib/i18n';

function isHttpLink(href: string) {
  return href.startsWith('http://') || href.startsWith('https://');
}

export async function HomeFooter({ lang, layout = 'home' }: { lang: AppLocale; layout?: 'home' | 'blog' }) {
  const footerContent = await getHomeFooterContent(lang);
  const containerClassName =
    layout === 'blog'
      ? 'mx-auto w-full max-w-[1460px] px-8 md:px-12 lg:px-20 2xl:max-w-[1700px] 2xl:px-24 [@media(min-width:2100px)]:max-w-[1880px] [@media(min-width:2100px)]:px-28'
      : 'mx-auto w-full max-w-[var(--fd-layout-width)] px-4';

  return (
    <footer className="mt-8 sm:mt-10 md:mt-12">
      <div className={`${containerClassName} pb-8 sm:pb-10`}>
        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="md:max-w-[16rem] md:pe-4 xl:max-w-sm">
            <h2 className="text-lg font-semibold text-zinc-900 sm:text-xl md:text-2xl dark:text-zinc-100">
              {footerContent.title}
            </h2>
            <p className="mt-3 max-w-xs text-sm text-zinc-500 sm:text-base dark:text-zinc-400">
              {footerContent.description}
            </p>
          </div>

          <div className="grid w-full grid-cols-2 justify-items-start gap-x-8 gap-y-6 sm:grid-cols-3 sm:gap-x-10 md:ms-auto md:w-auto md:grid-cols-3 md:justify-items-end md:gap-x-12 lg:gap-8 xl:gap-14">
            {footerContent.columns.map((group) => (
              <div key={group.title} className="text-left md:text-right">
                <h3 className="text-sm font-semibold text-zinc-900 sm:text-base dark:text-zinc-100">{group.title}</h3>
                <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                  {group.links.map((item) => {
                    const href = item.href;

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

      <div className="w-full overflow-hidden px-4 py-7 sm:px-0 sm:py-9 md:py-10">
        <p className="w-full select-none whitespace-nowrap text-center text-[clamp(2.3rem,15vw,3.2rem)] font-black leading-[0.9] tracking-[-0.035em] text-zinc-900 sm:text-[clamp(3.2rem,15vw,8rem)] md:text-[clamp(4.5rem,15vw,22rem)] md:tracking-[-0.045em] dark:text-zinc-100">
          ElexvxAILab
        </p>
      </div>

      <div className={`${containerClassName} py-6 sm:py-7 md:py-8`}>
        <p className="text-center text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
          {footerContent.copyright}
        </p>
      </div>
    </footer>
  );
}
