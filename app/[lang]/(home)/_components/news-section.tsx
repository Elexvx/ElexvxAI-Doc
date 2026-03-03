import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogPostRow } from '@/components/blog/blog-post-row';
import { getAllPosts } from '@/lib/blog';

export async function NewsSection({ lang }: { lang: string }) {
  const latestPosts = (await getAllPosts()).slice(0, 6);

  return (
    <section className="mt-14 md:mt-20">
      <div className="mb-5 flex items-center justify-between sm:mb-7">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-100">最新消息</h2>
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-900 sm:text-base dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          查看全部
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-x-10 md:grid-cols-2">
        {latestPosts.map((post) => (
          <BlogPostRow key={post.slug} post={post} lang={lang} />
        ))}
      </div>
    </section>
  );
}
