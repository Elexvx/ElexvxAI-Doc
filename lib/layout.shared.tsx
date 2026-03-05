import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n } from '@/lib/i18n';
import { Logo } from '@/components/logo';

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'elexvx',
  repo: 'ElexvxAI-Doc',
  branch: 'main',
};

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      url: `/${locale}`,
    },
    i18n,
  };
}
