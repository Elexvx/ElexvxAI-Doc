import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { posts } from './home-data';

export function NewsSection() {
  return (
    <section className="mt-14 md:mt-20">
      <div className="mb-5 flex items-center justify-between sm:mb-7">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-100">最新消息</h2>
        <Link
          href="docs"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-900 sm:text-base dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          查看全部
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {posts.map((post) => {
          const Icon = post.icon;

          return (
            <article key={post.title} className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-5">
              <div className="flex items-start gap-4 sm:gap-5">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 sm:h-16 sm:w-16">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-tight text-zinc-900 sm:text-lg dark:text-zinc-100">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-500 sm:text-base dark:text-zinc-400">
                    {post.description}
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {post.tag}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
