import Image from 'next/image';
import Link from 'next/link';
import type { BlogPostListItem } from '@/lib/blog';
import { isSvgImage } from '@/lib/image-utils';

export function BlogFeatured({ post, lang, badgeLabel }: { post: BlogPostListItem; lang: string; badgeLabel: string }) {
  const href = `/${lang}/blog/${post.slug}`;
  const categoryText = post.categories.join(' · ');
  const coverIsSvg = isSvgImage(post.cover);

  return (
    <section className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14 2xl:grid-cols-[1fr_1fr]">
      <div className="order-1">
        <p className="text-[22px] font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">{badgeLabel}</p>
        <h1 className="mt-5 max-w-[540px] text-[clamp(2rem,4vw,2.5rem)] leading-[1.14] font-semibold tracking-[-0.015em] text-zinc-950 xl:text-[44px] dark:text-zinc-100">
          <Link href={href} className="transition hover:opacity-80">
            {post.title}
          </Link>
        </h1>
        <p className="mt-7 text-[13px] text-zinc-500 dark:text-zinc-400">
          {post.formattedDate} · {categoryText}
        </p>
      </div>
      <div className="order-2 relative aspect-[16/8.8] overflow-hidden rounded-[1.1rem] bg-zinc-100 lg:ml-auto lg:w-full lg:max-w-[760px] 2xl:max-w-[680px] dark:bg-zinc-900">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          unoptimized={coverIsSvg}
          className="object-cover object-center"
          sizes="(min-width: 1920px) 680px, (min-width: 1280px) 42vw, (min-width: 1024px) 46vw, 100vw"
        />
      </div>
    </section>
  );
}
