'use client';

import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  TagsList,
  TagsListItem,
} from 'fumadocs-ui/components/dialog/search';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import type { SearchLink, SharedProps, TagItem } from 'fumadocs-ui/contexts/search';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { useMemo, useState } from 'react';
import { useOnChange } from 'fumadocs-core/utils/use-on-change';
import type { ReactNode } from 'react';

export function DocsSearchDialog({
  defaultTag,
  tags = [],
  api,
  delayMs,
  links = [],
  footer,
  allowClear = true,
  ...props
}: SharedProps & {
  links?: SearchLink[];
  defaultTag?: string;
  tags?: TagItem[];
  api?: string;
  delayMs?: number;
  footer?: ReactNode;
  allowClear?: boolean;
}) {
  const { locale } = useI18n();
  const [tag, setTag] = useState(defaultTag);

  const { search, setSearch, query } = useDocsSearch({
    type: 'fetch',
    api,
    locale,
    tag,
    delayMs,
  });

  const defaultItems = useMemo(() => {
    if (links.length === 0) return null;

    return links.map(([name, link]) => ({
      type: 'page' as const,
      id: name,
      content: name,
      url: link,
    }));
  }, [links]);

  useOnChange(defaultTag, (value) => {
    setTag(value);
  });

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : defaultItems} />
      </SearchDialogContent>
      <SearchDialogFooter>
        {tags.length > 0 && (
          <TagsList tag={tag} onTagChange={setTag} allowClear={allowClear}>
            {tags.map((item) => (
              <TagsListItem key={item.value} value={item.value}>
                {item.name}
              </TagsListItem>
            ))}
          </TagsList>
        )}
        {footer}
      </SearchDialogFooter>
    </SearchDialog>
  );
}
