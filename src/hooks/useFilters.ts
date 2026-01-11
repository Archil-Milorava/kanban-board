'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setFilter = (name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  return {
    search: searchParams.get('search') || '',
    minValue: searchParams.get('minValue') || '',
    activeFilterCount: Array.from(searchParams.keys()).length,
    setFilter,
    clearFilters,
  };
}
