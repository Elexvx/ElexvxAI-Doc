import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Typewriter } from '@/components/Typewriter';

export function HeroSection() {
  return (
    <section className="mx-auto flex flex-col items-center pt-2 text-center sm:pt-4">
      <h1 className="min-h-[1.2em] max-w-5xl text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-zinc-950 sm:text-4xl md:text-5xl lg:text-6xl dark:text-zinc-50">
        <Typewriter text="推动智能技术赋能工业创新" typingSpeed={220} />
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-zinc-500 sm:text-base md:mt-4 md:text-lg dark:text-zinc-400">
        文档和资源，帮助你在 OpenAI 上，为 OpenAI 开发和使用。
      </p>

      <div className="mt-6 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:justify-center sm:gap-4">
        <Link
          href="docs"
          className="inline-flex w-full items-center justify-center rounded-full bg-zinc-950 px-7 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 sm:w-auto sm:text-base dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
        >
          我们的项目
        </Link>
        <Link
          href="docs"
          className="inline-flex w-full items-center justify-center rounded-full bg-zinc-100 px-7 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 sm:w-auto sm:text-base dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          查看文档
        </Link>
      </div>

      <Link
        href="docs"
        className="group mx-auto mt-7 flex w-full max-w-4xl items-start justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-left transition hover:bg-zinc-100 sm:items-center sm:px-6 sm:py-5 md:px-8 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:bg-zinc-900"
      >
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500 text-sm font-semibold text-white shadow-sm dark:bg-indigo-400 dark:text-zinc-950">
            {'</>'}
          </span>
          <div>
            <p className="text-base font-semibold text-zinc-900 sm:text-lg md:text-xl dark:text-zinc-100">用Codex应用更快构建</p>
            <p className="mt-1 text-xs text-zinc-500 sm:text-sm md:text-base dark:text-zinc-400">
              在有限时间内，Codex 可包含在 ChatGPT 免费开放中，或享受 Plus、Pro、Business 和 Enterprise
              订阅的 Codex 2 倍速率限制。
            </p>
          </div>
        </div>
        <ChevronRight className="mt-1 hidden h-5 w-5 shrink-0 text-zinc-400 transition group-hover:translate-x-1 sm:block dark:text-zinc-500" />
      </Link>
    </section>
  );
}
