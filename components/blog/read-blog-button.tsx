import Link from 'next/link';
import { cn } from '@/lib/cn';

export function ReadBlogButton({ href, className }: { href: string; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-[13px] font-medium text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800',
        className,
      )}
    >
      Read blog
    </Link>
  );
}
