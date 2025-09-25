'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { track } from '@/lib/analytics/track';

type TagFilterProps = {
  tags: string[];
  selectedTag?: string | null;
};

export function TagFilter({ tags, selectedTag }: TagFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  
  // Track filter changes with debounce
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
    
    const timeoutId = setTimeout(() => {
      if (selectedTag) {
        track('Projects: Filter', { tag: selectedTag });
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
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      <Button
        variant={!selectedTag ? 'default' : 'outline'}
        size="sm"
        onClick={() => {
          router.push(`${pathname}?${createQueryString('tag', '')}`, { scroll: false });
        }}
      >
        All
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
