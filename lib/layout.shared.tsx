import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n } from '@/lib/i18n';

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'fuma-nama',
  repo: 'fumadocs',
  branch: 'main',
};

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    nav: {
      title: 'Elexvx',
      url: `/${locale}`,
    },
    i18n,
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
