import Link from 'next/link';
import { getHomeFooterContent } from '@/lib/home-content';
import type { AppLocale } from '@/lib/i18n';
import { SITE_CONTAINER_CLASS } from '@/lib/responsive-layout';
import { FooterWordmark } from '@/components/footer-wordmark';

function isHttpLink(href: string) {
  return href.startsWith('http://') || href.startsWith('https://');
}

export async function HomeFooter({ lang }: { lang: AppLocale }) {
  const footerContent = await getHomeFooterContent(lang);
  const containerClassName = SITE_CONTAINER_CLASS;

  return (
    <footer className="mt-8 sm:mt-10 md:mt-12">
      <div className={`${containerClassName} pb-8 sm:pb-10`}>
        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="md:max-w-[16rem] md:pe-4 xl:max-w-sm">
            <h2 className="text-lg font-semibold text-zinc-900 sm:text-xl md:text-2xl dark:text-zinc-100">
              {footerContent.title}
            </h2>
            <p className="mt-3 max-w-xs text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
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
                            className="text-xs text-zinc-600 transition hover:text-zinc-900 sm:text-sm lg:text-base dark:text-zinc-400 dark:hover:text-zinc-100"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link
                            href={href}
                            prefetch={false}
                            className="text-xs text-zinc-600 transition hover:text-zinc-900 sm:text-sm lg:text-base dark:text-zinc-400 dark:hover:text-zinc-100"
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

      <div className={containerClassName}>
        <FooterWordmark text="ElexvxAILab" />
      </div>

      <div className={`${containerClassName} py-6 sm:py-7 md:py-8`}>
        <p className="text-center text-xs text-zinc-600 sm:text-sm dark:text-zinc-400">
          {footerContent.copyright}
        </p>
      </div>
    </footer>
  );
}
