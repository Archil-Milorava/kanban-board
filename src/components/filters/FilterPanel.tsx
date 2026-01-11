'use client';

import { useDebounce } from '@/hooks/useDebounce';
import { useFilters } from '@/hooks/useFilters';
import { useInquiryStore } from '@/store/useInquiryStore';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FilterPanel() {
  const { search, minValue, setFilter, clearFilters, activeFilterCount } =
    useFilters();
  const { fetchInquiries } = useInquiryStore();

  const [localSearch, setLocalSearch] = useState(search);
  const debouncedSearch = useDebounce(localSearch, 400);

  useEffect(() => {
    setFilter('search', debouncedSearch || null);
  }, [debouncedSearch]);

  useEffect(() => {
    if (!search) setLocalSearch('');
  }, [search]);

  useEffect(() => {
    fetchInquiries({ search, minValue: Number(minValue) });
  }, [search, minValue, fetchInquiries]);

  const handleClear = () => {
    setLocalSearch('');
    clearFilters();
  };

  return (
    <div className="flex flex-wrap items-center gap-6 border-b border-slate-200 bg-white px-8 py-4">
      <div className="relative max-w-sm flex-1 cursor-pointer">
        <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search client name..."
          className="w-full rounded-lg  border border-slate-200 py-2 pr-4 pl-10 text-sm focus:ring-2 focus:ring-blue-500"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-600">Min Value:</span>
        <input
          type="range"
          min="0"
          max="100000"
          step="5000"
          className="w-32 accent-blue-600"
          value={minValue || 0}
          onChange={(e) => setFilter('minValue', e.target.value)}
        />
        <span className="w-20 text-sm font-bold">
          CHF {Number(minValue || 0).toLocaleString()}
        </span>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={handleClear}
          className="flex items-center gap-2 cursor-pointer text-sm bg-red-300/30 rounded-md py-0.5 px-2 font-medium text-red-600 hover:text-red-700"
        >
          <X size={16} />
          Clear ({activeFilterCount})
        </button>
      )}
    </div>
  );
}
