'use client';

import { useEffect, useRef, useState } from 'react';

import { TextField, ToggleButton } from '@muroom/components';
import { SearchIcon } from '@muroom/icons';

import Loading from '@/app/loading';
import {
  useFaqCategoriesQuery,
  useFaqsQuery,
} from '@/hooks/api/faqs/useQueries';

import FaqList from './faq-list';

interface Props {
  isMobile?: boolean;
}

export default function FaqBoard({ isMobile = false }: Props) {
  const [categoryId, setCategoryId] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);

  const observerRef = useRef<HTMLDivElement>(null);

  const { data: faqCategoriesData, isLoading: isFaqCategoriesLoading } =
    useFaqCategoriesQuery();

  const {
    data: faqsData,
    isLoading: isFaqsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFaqsQuery(
    {
      categoryId: categoryId === 0 ? undefined : categoryId,
      keyword,
    },
    { page, size: 10, isMobile },
  );

  useEffect(() => {
    setPage(1);
  }, [categoryId, keyword]);

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

  const faqList = isMobile
    ? faqsData?.pages.flatMap((page) => page.content) || []
    : faqsData?.pages[0]?.content || [];

  const paginationInfo = faqsData?.pages[0]?.pagination;

  if (isFaqCategoriesLoading) return <Loading />;

  return (
    <div className='w-full'>
      <div className={isMobile ? 'flex-center-col gap-y-6' : 'flex-between'}>
        <div className='scrollbar-hide flex items-center gap-x-3 overflow-x-auto'>
          {faqCategoriesData?.map((category) => (
            <ToggleButton
              key={category.id}
              variant={isMobile ? 'outline' : 'text'}
              size='m'
              selected={category.id === categoryId}
              onSelectedChange={(isSelected) => {
                if (isSelected) setCategoryId(category.id);
              }}
            >
              {category.name}
            </ToggleButton>
          ))}
        </div>

        <TextField
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='제목, 내용 검색하기'
          rightIcon={<SearchIcon className='size-6 text-gray-700' />}
          hideClearButton
          className={isMobile ? 'w-full' : 'w-101'}
        />
      </div>

      {/* --- 리스트 분기 처리 --- */}
      <FaqList
        isMobile={isMobile}
        items={faqList}
        isLoading={isFaqsLoading}
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
