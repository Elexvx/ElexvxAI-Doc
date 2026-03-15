import Link from 'next/link';
import type { BlogPostListItem } from '@/lib/blog';

export function BlogPostRow({ post, lang, prefetch = true }: { post: BlogPostListItem; lang: string; prefetch?: boolean }) {
  const href = `/${lang}/blog/${post.slug}`;
  const categoryText = post.categories.join(' | ');

  return (
    <article className="flex items-center justify-between gap-5 border-b border-zinc-200 py-7 dark:border-zinc-800 sm:gap-6">
      <div className="min-w-0 max-w-[68%] flex-1 md:flex md:h-[132px] md:flex-col md:justify-between">
        <h2 className="text-[clamp(1.5rem,3.2vw,1.875rem)] leading-[1.14] font-semibold tracking-[-0.015em] text-zinc-900 xl:text-[32px] dark:text-zinc-100">
          <Link href={href} prefetch={prefetch} className="transition hover:opacity-80">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 text-[13px] text-zinc-500 dark:text-zinc-400">
          {post.formattedDate} | {categoryText}
        </p>
      </div>
      <div className="relative h-[124px] w-[124px] shrink-0 overflow-hidden rounded-2xl bg-black sm:h-[132px] sm:w-[132px]">
        <img
          src={post.cover}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </article>
  );
}
