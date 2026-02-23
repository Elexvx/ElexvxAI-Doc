import { getCollection, type CollectionEntry } from 'astro:content';

export interface BlogPost {
    slug: string;
    title: string;
    summary: string;
    date: Date;
    author: string;
    tags: string[];
    image: string;
    featured: boolean;
    body: string;
    entry: CollectionEntry<'blog'>;
}

type BlogFrontmatter = {
    title?: string;
    summary?: string;
    description?: string;
    date?: string | Date;
    author?: string;
    tags?: string[] | string;
    image?: string;
    featured?: boolean | string;
};

function parseBoolean(value: boolean | string | undefined, fallback = false): boolean {
    if (typeof value === 'boolean') return value;
    if (!value) return fallback;
    return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
}

function parseDate(value: string | Date | undefined): Date {
    if (!value) return new Date('1970-01-01');
    if (value instanceof Date) return value;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? new Date('1970-01-01') : parsed;
}

function firstHeading(markdown: string): string | null {
    const match = markdown.match(/^#\s+(.+)$/m);
    return match?.[1]?.trim() ?? null;
}

function firstImage(markdown: string): string {
    const match = markdown.match(/!\[[^\]]*]\(([^)\s]+)[^)]*\)/);
    return match?.[1] ?? '';
}

function firstParagraph(markdown: string): string {
    const blocks = markdown
        .split(/\n{2,}/)
        .map((block) => block.trim())
        .filter(Boolean);

    for (const block of blocks) {
        if (block.startsWith('#')) continue;
        if (block.startsWith('![')) continue;
        if (block.startsWith('```')) continue;
        return block.replace(/\s+/g, ' ').slice(0, 220);
    }

    return '';
}

function parseTags(value: string[] | string | undefined): string[] {
    if (!value) return [];
    if (Array.isArray(value)) {
        return value.map((tag) => tag.trim()).filter(Boolean);
    }
    return value
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
}

function parsePost(entry: CollectionEntry<'blog'>): BlogPost {
    const slug = entry.id;
    const body = entry.body;
    const data = (entry.data ?? {}) as BlogFrontmatter;

    return {
        slug,
        title: data.title ?? firstHeading(body) ?? slug,
        summary: data.summary ?? data.description ?? firstParagraph(body),
        date: parseDate(data.date),
        author: data.author ?? 'ElexvxAI Team',
        tags: parseTags(data.tags),
        image: data.image ?? firstImage(body),
        featured: parseBoolean(data.featured, false),
        body,
        entry,
    };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
    const entries = await getCollection('blog');
    return entries
        .map((entry) => parsePost(entry))
        .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const posts = await getAllBlogPosts();
    return posts.find((post) => post.slug === slug);
}
