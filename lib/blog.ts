import { blog as blogEntries } from 'fumadocs-mdx:collections/server';
import type { ReactNode } from 'react';

type BlogCategory = string | string[];

type BlogEntriesExport =
  | Array<{
      info: { path: string };
      title: string;
      date: string;
      category: BlogCategory;
      summary: string;
      cover: string;
      featured: boolean;
      body: unknown;
      toc: unknown;
    }>
  | {
      docs: Array<{
        info: { path: string };
        title: string;
        date: string;
        category: BlogCategory;
        summary: string;
        cover: string;
        featured: boolean;
        body: unknown;
        toc: unknown;
      }>;
    };

type BlogCollectionEntry = {
  info: { path: string };
  title: string;
  date: string;
  category: BlogCategory;
  summary: string;
  cover: string;
  featured: boolean;
  body: unknown;
  toc: unknown;
};

type BlogPostBase = {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  category: string;
  categories: string[];
  summary: string;
  cover: string;
  featured: boolean;
  timestamp: number;
};

export type BlogPostListItem = BlogPostBase;

export type BlogPost = BlogPostBase & {
  body: (props: Record<string, unknown>) => ReactNode;
  toc: BlogCollectionEntry['toc'];
};

function getSlugFromPath(path: string): string {
  return path.replace(/\.(md|mdx)$/i, '');
}

function toTimestamp(date: string): number {
  const parsed = new Date(date).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function formatBlogDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function normalizeCategories(input: BlogCategory): string[] {
  const raw = Array.isArray(input) ? input : [input];
  const categories = raw.map((item) => item.trim()).filter((item) => item.length > 0);

  if (categories.length === 0) return ['Uncategorized'];

  return [...new Set(categories)];
}

function mapToListItem(entry: BlogCollectionEntry): BlogPostListItem {
  const slug = getSlugFromPath(entry.info.path);
  const categories = normalizeCategories(entry.category);

  return {
    slug,
    title: entry.title,
    date: entry.date,
    formattedDate: formatBlogDate(entry.date),
    category: categories[0],
    categories,
    summary: entry.summary,
    cover: entry.cover,
    featured: entry.featured,
    timestamp: toTimestamp(entry.date),
  };
}

async function resolveBlogEntries(): Promise<BlogCollectionEntry[]> {
  const resolved = (await Promise.resolve(blogEntries as unknown)) as BlogEntriesExport | undefined;

  if (Array.isArray(resolved)) return resolved as BlogCollectionEntry[];
  if (resolved && Array.isArray(resolved.docs)) return resolved.docs as BlogCollectionEntry[];
  return [];
}

export async function getAllPosts(): Promise<BlogPostListItem[]> {
  const entries = await resolveBlogEntries();

  return entries
    .map(mapToListItem)
    .sort((a, b) => b.timestamp - a.timestamp);
}

export async function getFeaturedPost(): Promise<BlogPostListItem | undefined> {
  return (await getAllPosts()).find((post) => post.featured);
}

export async function getPostsByCategory(category: string): Promise<BlogPostListItem[]> {
  const allPosts = await getAllPosts();

  if (!category || category.toLowerCase() === 'all') {
    return allPosts;
  }

  return allPosts.filter((post) => post.categories.includes(category));
}

export async function getBlogCategories(): Promise<string[]> {
  const categories = new Set((await getAllPosts()).flatMap((post) => post.categories));
  return [...categories].sort((a, b) => a.localeCompare(b));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const entries = await resolveBlogEntries();
  const entry = entries.find((item) => getSlugFromPath(item.info.path) === slug);
  if (!entry) return undefined;

  const listItem = mapToListItem(entry);

  return {
    ...listItem,
    body: entry.body as (props: Record<string, unknown>) => ReactNode,
    toc: entry.toc,
  };
}
