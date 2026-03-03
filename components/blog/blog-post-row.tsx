import type { BlogPostListItem } from '@/lib/blog';
import { ReadBlogButton } from '@/components/blog/read-blog-button';

export function BlogPostRow({ post, lang }: { post: BlogPostListItem; lang: string }) {
  const href = `/${lang}/blog/${post.slug}?category=${encodeURIComponent(post.category)}`;
  const categoryText = post.categories.join(' · ');

  return (
    <article className="flex items-center justify-between gap-4 border-b border-zinc-200 py-7 dark:border-zinc-800">
      <div className="min-w-0 max-w-[70%] flex-1">
        <h2 className="text-[30px] leading-[1.02] font-semibold tracking-[-0.02em] text-zinc-900 sm:text-[38px] dark:text-zinc-100">
          {post.title}
        </h2>
        <p className="mt-3 text-[13px] text-zinc-500 dark:text-zinc-400">
          {post.formattedDate} · {categoryText}
        </p>
        <ReadBlogButton href={href} className="mt-6" />
      </div>
      <div className="h-[100px] w-[140px] shrink-0 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 sm:h-[108px] sm:w-[150px]">
        <img src={post.cover} alt={post.title} className="h-full w-full object-cover" />
      </div>
    </article>
  );
}
