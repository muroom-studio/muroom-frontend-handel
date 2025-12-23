'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { Button, TextField } from '@muroom/components';
import { SearchIcon } from '@muroom/icons';

import { useInquiriesMyQuery } from '@/hooks/api/inquiries/useQueries';

import InquiryList from './inquiry-list';

interface Props {
  isMobile?: boolean;
}

export default function InquiriesBoard({ isMobile = false }: Props) {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);

  const observerRef = useRef<HTMLDivElement>(null);

  const {
    data: inquiriesMyData,
    isLoading: isInquiriesMyLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInquiriesMyQuery({
    page,
    size: 10,
    isMobile,
  });

  // useEffect(() => {
  //     setPage(1);
  //   }, [categoryId, keyword]);

  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [isMobile, hasNextPage, fetchNextPage]);

  const inquiryList = isMobile
    ? inquiriesMyData?.pages.flatMap((page) => page.content) || []
    : inquiriesMyData?.pages[0]?.content || [];

  const paginationInfo = inquiriesMyData?.pages[0]?.pagination;

  return (
    <div className='w-full'>
      <div className='flex-between'>
        <TextField
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='제목, 내용 검색하기'
          rightIcon={<SearchIcon className='size-6 text-gray-700' />}
          hideClearButton
          className={'w-101'}
        />
        {!isMobile && (
          <Link href='/mypage/cs/inquiry/new'>
            <Button variant='outline' size='l'>
              1:1 문의하기
            </Button>
          </Link>
        )}
      </div>

      <InquiryList
        isMobile={isMobile}
        items={inquiryList}
        isLoading={isInquiriesMyLoading}
        // Desktop 전용 Props
        pagination={
          !isMobile && paginationInfo
            ? {
                currentPage: page,
                totalPages: paginationInfo.totalPages,
                onPageChange: setPage,
              }
            : undefined
        }
        // Mobile 전용 Props
        infiniteScroll={
          isMobile
            ? {
                observerRef,
                isFetchingNextPage,
              }
            : undefined
        }
      />
    </div>
  );
}
