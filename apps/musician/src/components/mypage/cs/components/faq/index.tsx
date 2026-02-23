'use client';

import { useEffect, useRef, useState } from 'react';

import { TextField, ToggleButton } from '@muroom/components';
import { SearchIcon } from '@muroom/icons';

import Loading from '@/app/loading';
import DraggableCarousel from '@/components/common/draggable-carousel';
import {
  useFaqCategoriesQuery,
  useFaqsQuery,
} from '@/hooks/api/faqs/useQueries';
import { FaqItem } from '@/types/faqs';
import { extractInfiniteData } from '@/utils/query';

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

  const { content: faqList, pagination } = extractInfiniteData<FaqItem>(
    faqsData,
    isMobile,
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

  if (isFaqCategoriesLoading) return <Loading />;

  return (
    <div className='w-full'>
      <div className={isMobile ? 'flex-center-col gap-y-6' : 'flex-between'}>
        <DraggableCarousel containerClassName='gap-x-3' className='w-full'>
          {faqCategoriesData?.map((category) => (
            <div key={category.id}>
              <ToggleButton
                variant={isMobile ? 'outline' : 'text'}
                size='m'
                selected={category.id === categoryId}
                onSelectedChange={(isSelected) => {
                  if (isSelected) setCategoryId(category.id);
                }}
              >
                {category.name}
              </ToggleButton>
            </div>
          ))}
        </DraggableCarousel>

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
        isKeyword={!!keyword}
        isMobile={isMobile}
        items={faqList}
        isLoading={isFaqsLoading}
        pagination={
          !isMobile && pagination
            ? {
                currentPage: page,
                totalPages: pagination.totalPages,
                onPageChange: setPage,
              }
            : undefined
        }
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
