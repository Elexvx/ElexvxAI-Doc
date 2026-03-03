import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { i18n } from '@/lib/i18n';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; slug: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { lang, slug } = await params;
  const { category: categoryParam } = await searchParams;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const MDX = post.body;
  const displayCategory =
    categoryParam && categoryParam.trim().length > 0 ? categoryParam : post.categories.join(' · ');

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#080808] dark:text-zinc-100">
      <div className="mx-auto w-full max-w-[860px] px-6 pb-20 pt-14 md:px-10 md:pt-16">
        <header className="text-center">
          <p className="text-xs font-medium tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
            {displayCategory}
          </p>
          <h1 className="mx-auto mt-5 max-w-[780px] text-4xl leading-[1.06] font-semibold tracking-[-0.02em] text-zinc-950 md:text-6xl dark:text-white">
            {post.title}
          </h1>
          <p className="mt-4 text-xs text-zinc-500 md:text-sm dark:text-zinc-400">{post.formattedDate} · 文章详情</p>
        </header>

        <div className="mt-10 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(165,180,252,0.35),rgba(125,211,252,0.22)_44%,rgba(255,255,255,0.7)_85%)] p-3 dark:bg-[radial-gradient(circle_at_50%_0%,rgba(170,186,255,0.45),rgba(126,150,255,0.16)_44%,rgba(8,8,8,0.2)_80%)] md:p-5">
          <div className="overflow-hidden rounded-xl bg-white/90 ring-1 ring-zinc-200/80 dark:bg-zinc-950/80 dark:ring-white/10">
            <img src={post.cover} alt={post.title} className="aspect-[16/10] w-full object-cover" />
          </div>
        </div>

        <article className="mx-auto mt-14 max-w-[720px] space-y-5 text-[15px] leading-8 text-zinc-700 dark:text-zinc-300 [&_a]:text-zinc-900 [&_a]:underline [&_a]:underline-offset-4 dark:[&_a]:text-zinc-100 [&_h2]:mt-14 [&_h2]:text-2xl [&_h2]:leading-tight [&_h2]:font-semibold [&_h2]:text-zinc-950 dark:[&_h2]:text-white [&_h3]:mt-10 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-zinc-900 dark:[&_h3]:text-white [&_li]:my-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:text-zinc-700 dark:[&_p]:text-zinc-300 [&_strong]:font-semibold [&_strong]:text-zinc-900 dark:[&_strong]:text-white [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          <MDX components={getMDXComponents()} />
        </article>

        <div className="mx-auto mt-16 max-w-[720px] border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">下一步</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            你可以继续浏览更多相关文章，或返回 Blog 列表查看不同主题下的最新动态。
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:border-zinc-500"
            >
              返回 Blog
            </Link>
            <Link
              href={`/${lang}`}
              className="inline-flex items-center rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
            >
              返回首页
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return i18n.languages.flatMap((lang) => posts.map((post) => ({ lang, slug: post.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return {
    title: post.title,
    description: `${post.categories.join(' · ')} · ${post.formattedDate}`,
    openGraph: {
      images: post.cover,
    },
  };
}

export const dynamicParams = false;
