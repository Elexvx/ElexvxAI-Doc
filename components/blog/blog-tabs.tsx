import Link from 'next/link';
import { cn } from '@/lib/cn';

export function BlogTabs({
  lang,
  categories,
  activeCategory,
}: {
  lang: string;
  categories: string[];
  activeCategory: string;
}) {
  const tabs = ['All', ...categories];

  return (
    <nav className="mt-14 border-b border-zinc-200 dark:border-zinc-800" aria-label="Blog categories">
      <ul className="flex items-center gap-7 overflow-x-auto">
        {tabs.map((tab) => {
          const href = tab === 'All' ? `/${lang}/blog` : `/${lang}/blog?category=${encodeURIComponent(tab)}`;
          const isActive = tab === activeCategory;

          return (
            <li key={tab}>
              <Link
                href={href}
                className={cn(
                  'inline-flex h-10 items-center border-b-2 border-transparent text-[14px] text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100',
                  isActive && 'border-blue-500 text-zinc-900 dark:border-blue-400 dark:text-zinc-100',
                )}
              >
                {tab}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
