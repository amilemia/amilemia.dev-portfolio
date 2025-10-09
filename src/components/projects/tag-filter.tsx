'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { track } from '@/lib/analytics/track';
import type { Messages } from '@/i18n';

type TagFilterProps = {
  tags: string[];
  selectedTag?: string | null | string[];
  messages: Messages['common']['tagFilter'];
};

export function TagFilter({ tags, selectedTag, messages }: TagFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
    
    const timeoutId = setTimeout(() => {
      if (selectedTag) {
        const tag = Array.isArray(selectedTag) ? selectedTag[0] : selectedTag;
        track('Projects: Filter', { tag });
      }
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [selectedTag, isMounted]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant={!selectedTag ? 'default' : 'outline'}
        size="sm"
        onClick={() => {
          router.push(pathname, { scroll: false });
        }}
      >
        {messages.all}
      </Button>
      {tags.map((tag) => (
        <Button
          key={tag}
          variant={selectedTag === tag ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            router.push(
              `${pathname}?${createQueryString('tag', tag)}`,
              { scroll: false }
            );
          }}
        >
          {tag}
        </Button>
      ))}
    </div>
  );
}
