import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { LivePreviewClient } from '@/components/live-preview-client';
import { siteConfig } from '@/lib/site';
import './global.css';

const htmlLangSyncInlineScript =
  "(()=>{var p=window.location.pathname;document.documentElement.lang=p.startsWith('/en')?'en':'zh-CN';})();";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <script dangerouslySetInnerHTML={{ __html: htmlLangSyncInlineScript }} />
        {process.env.NODE_ENV === 'development' ? <LivePreviewClient /> : null}
        {children}
      </body>
    </html>
  );
}
