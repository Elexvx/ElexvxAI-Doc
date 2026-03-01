import Link from 'next/link';
import { footerColumns } from './home-data';

export function HomeFooter() {
  return (
    <footer className="mt-16 border-t border-zinc-200 pt-10 sm:mt-20 sm:pt-12 md:mt-24 dark:border-zinc-800">
      <div className="mb-12 grid grid-cols-2 gap-8 sm:mb-16 sm:grid-cols-3 lg:mb-20 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr]">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <h2 className="text-lg font-semibold text-zinc-900 sm:text-xl dark:text-zinc-100">探索智能边界</h2>
        </div>

        {footerColumns.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold text-zinc-900 sm:text-base dark:text-zinc-100">{group.title}</h3>
            <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
              {group.links.map((label) => (
                <li key={label}>
                  <Link
                    href="/docs"
                    className="text-xs text-zinc-500 transition hover:text-zinc-900 sm:text-sm lg:text-base dark:text-zinc-400 dark:hover:text-zinc-100"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 flex w-full justify-center overflow-hidden border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <p className="select-none text-center text-[clamp(2.8rem,15.6vw,17rem)] font-black leading-none tracking-[-0.04em] text-zinc-900 dark:text-zinc-100">
          ElexvxAILab
        </p>
      </div>

      <div className="py-6 sm:py-7">
        <p className="text-center text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
          Copyright © 2024 ElexvxAI Lab | 隶属于 宏翔商道（南京）科技发展有限公司 | ICP备案：苏ICP备2025160017号
        </p>
      </div>
    </footer>
  );
}
