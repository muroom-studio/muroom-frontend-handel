import { RefObject } from 'react';

import { InquiryItem } from '@/types/inquiries';

import DesktopInquiryList from './desktop';
import MobileInquiryList from './mobile';

interface Props {
  isMobile?: boolean;
  items: InquiryItem[];
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

export default function InquiryList({
  isMobile,
  items,
  isLoading,
  pagination,
  infiniteScroll,
}: Props) {
  if (isMobile) {
    return (
      <MobileInquiryList
        items={items}
        isLoading={isLoading}
        infiniteScroll={infiniteScroll!}
      />
    );
  }

  return (
    <DesktopInquiryList
      items={items}
      isLoading={isLoading}
      pagination={pagination!}
    />
  );
}
