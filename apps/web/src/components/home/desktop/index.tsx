'use client';

import { useState } from 'react';

import FilterItem, { Variant } from '@/components/home/components/filter-item';

export default function DesktopHomePage() {
  const [filteredValue, setFilteredValue] = useState<Record<Variant, string>>({
    e1: '',
    e2: '',
    e3: '',
    e4: '',
    e5: '',
  });

  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex items-center gap-x-4 p-4'>
        {Object.entries(filteredValue).map(([key, value]) => (
          <div aria-label='필터 박스' key={key}>
            <FilterItem variant={key as Variant} value={value} />
          </div>
        ))}
      </div>
      <p>content</p>
    </div>
  );
}
