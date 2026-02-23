'use client';

import { cn } from '@muroom/lib';

import ListSortFilter, {
  SortOption,
} from '@/components/common/list-sort-filter';
import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';

const STUDIO_SORT_OPTIONS: SortOption[] = [
  { label: '선택', value: '' },
  { label: '최신순', value: 'latest,desc' },
  { label: '높은가격순', value: 'price,desc' },
  { label: '낮은가격순', value: 'price,asc' },
];

interface Props {
  studioNum: number;
  currentSort: string | null;
  onSortChange: (sortCode: string | null) => void;
}

export default function ListFilter({
  studioNum,
  currentSort,
  onSortChange,
}: Props) {
  const { isMobile } = useResponsiveLayout();

  return (
    <div
      className={cn('flex-between h-14 p-4', {
        'px-0 py-4': isMobile,
        'border-b border-b-gray-300': !isMobile,
      })}
    >
      <span className='text-base-exl-18-2 text-black'>{studioNum}개</span>

      <ListSortFilter
        currentSort={currentSort}
        options={STUDIO_SORT_OPTIONS}
        onSortChange={(val) => {
          onSortChange(val === '' ? null : val);
        }}
      />
    </div>
  );
}
