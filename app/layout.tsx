import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { LivePreviewClient } from '@/components/live-preview-client';
import { i18n } from '@/lib/i18n';
import { getSeoSite } from '@/lib/seo-content';
import { siteConfig } from '@/lib/site';
import './global.css';

const htmlLangSyncInlineScript =
  "(()=>{var p=window.location.pathname;document.documentElement.lang=p.startsWith('/en')?'en':'zh-CN';})();";

export async function generateMetadata(): Promise<Metadata> {
  const siteSeo = await getSeoSite(i18n.defaultLanguage);

  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteSeo.title,
    title: {
      default: siteSeo.title,
      template: `%s | ${siteSeo.title}`,
    },
    description: siteSeo.description,
    openGraph: {
      type: 'website',
      siteName: siteSeo.title,
      title: siteSeo.title,
      description: siteSeo.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteSeo.title,
      description: siteSeo.description,
    },
  };
}

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
