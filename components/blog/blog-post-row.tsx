import type { BlogPostListItem } from '@/lib/blog';
import { ReadBlogButton } from '@/components/blog/read-blog-button';

export function BlogPostRow({ post, lang }: { post: BlogPostListItem; lang: string }) {
  const href = `/${lang}/blog/${post.slug}`;
  const categoryText = post.categories.join(' · ');

  return (
    <article className="flex items-center justify-between gap-5 border-b border-zinc-200 py-7 dark:border-zinc-800 sm:gap-6">
      <div className="min-w-0 max-w-[68%] flex-1">
        <h2 className="text-[24px] leading-[1.14] font-semibold tracking-[-0.015em] text-zinc-900 sm:text-[32px] dark:text-zinc-100">
          {post.title}
        </h2>
        <p className="mt-3 text-[13px] text-zinc-500 dark:text-zinc-400">
          {post.formattedDate} · {categoryText}
        </p>
        <ReadBlogButton href={href} className="mt-6" />
      </div>
      <div className="h-[124px] w-[124px] shrink-0 overflow-hidden rounded-2xl bg-black sm:h-[132px] sm:w-[132px]">
        <img src={post.cover} alt={post.title} className="h-full w-full object-contain object-center p-2.5 sm:p-3" />
      </div>
    </article>
  );
}
