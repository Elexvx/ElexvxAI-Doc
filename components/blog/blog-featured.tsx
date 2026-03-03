import type { BlogPostListItem } from '@/lib/blog';
import { ReadBlogButton } from '@/components/blog/read-blog-button';

export function BlogFeatured({ post, lang }: { post: BlogPostListItem; lang: string }) {
  const href = `/${lang}/blog/${post.slug}?category=${encodeURIComponent(post.category)}`;
  const categoryText = post.categories.join(' · ');

  return (
    <section className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-14">
      <div className="order-1">
        <p className="text-[22px] font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">Featured</p>
        <h1 className="mt-5 max-w-[540px] text-[44px] leading-[0.98] font-semibold tracking-[-0.02em] text-zinc-950 sm:text-[52px] dark:text-zinc-100">
          {post.title}
        </h1>
        <p className="mt-7 text-[13px] text-zinc-500 dark:text-zinc-400">
          {post.formattedDate} · {categoryText}
        </p>
        <ReadBlogButton href={href} className="mt-7" />
      </div>
      <div className="order-2 overflow-hidden rounded-[1.1rem] bg-zinc-100 dark:bg-zinc-900">
        <img src={post.cover} alt={post.title} className="aspect-[16/8.8] h-full w-full object-cover" />
      </div>
    </section>
  );
}
