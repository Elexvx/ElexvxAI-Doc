'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function HtmlLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    const locale = pathname.startsWith('/en') ? 'en' : 'zh-CN';
    document.documentElement.lang = locale;
  }, [pathname]);

  return null;
}
