import { BlogFeatured } from '@/components/blog/blog-featured';
import { BlogPostRow } from '@/components/blog/blog-post-row';
import { BlogTabs } from '@/components/blog/blog-tabs';
import { getAllPosts, getBlogCategories, getFeaturedPost, getPostsByCategory } from '@/lib/blog';

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { lang } = await params;
  const { category: rawCategory } = await searchParams;

  const categories = await getBlogCategories();
  const activeCategory = rawCategory && categories.includes(rawCategory) ? rawCategory : 'All';
  const featuredPost = await getFeaturedPost();

  const postsByCategory = await getPostsByCategory(activeCategory);
  const listPosts =
    featuredPost == null ? postsByCategory : postsByCategory.filter((post) => post.slug !== featuredPost.slug);

  const fallbackPosts = featuredPost == null ? await getAllPosts() : [];
  const displayFeatured = featuredPost ?? fallbackPosts[0];

  return (
    <main className="mx-auto w-full max-w-[1460px] px-8 pb-20 pt-8 md:px-12 md:pt-12 lg:px-20">
      {displayFeatured ? <BlogFeatured post={displayFeatured} lang={lang} /> : null}

      <BlogTabs lang={lang} categories={categories} activeCategory={activeCategory} />

      <section className="mt-2 grid gap-x-10 md:grid-cols-2">
        {listPosts.map((post) => (
          <BlogPostRow key={post.slug} post={post} lang={lang} />
        ))}
      </section>
    </main>
  );
}
