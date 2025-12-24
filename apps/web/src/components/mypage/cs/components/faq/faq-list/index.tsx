import { RefObject } from 'react';

import { FaqItem } from '@/types/faqs';

import DesktopFaqList from './desktop';
import MobileFaqList from './mobile';

interface Props {
  isMobile?: boolean;
  items: FaqItem[];
  isLoading: boolean;

  // Desktop Props
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };

  // Mobile Props
  infiniteScroll?: {
    observerRef: RefObject<HTMLDivElement | null>;
    isFetchingNextPage: boolean;
  };
}

export default function FaqList({
  isMobile,
  items,
  isLoading,
  pagination,
  infiniteScroll,
}: Props) {
  if (isMobile) {
    return (
      <MobileFaqList
        items={items}
        isLoading={isLoading}
        infiniteScroll={infiniteScroll!}
      />
    );
  }

  return (
    <DesktopFaqList
      items={items}
      isLoading={isLoading}
      pagination={pagination!}
    />
  );
}
