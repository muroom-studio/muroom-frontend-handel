import { RefObject } from 'react';

import { FaqItem } from '@/types/faqs';

import DesktopFaqList from './desktop';
import MobileFaqList from './mobile';

interface Props {
  isKeyword: boolean;
  isMobile?: boolean;
  items: FaqItem[];
  isLoading: boolean;

  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };

  infiniteScroll?: {
    observerRef: RefObject<HTMLDivElement | null>;
    isFetchingNextPage: boolean;
  };
}

export default function FaqList({
  isKeyword,
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
        isKeyword={isKeyword}
        isLoading={isLoading}
        infiniteScroll={infiniteScroll!}
      />
    );
  }

  return (
    <DesktopFaqList
      items={items}
      isKeyword={isKeyword}
      isLoading={isLoading}
      pagination={pagination!}
    />
  );
}
