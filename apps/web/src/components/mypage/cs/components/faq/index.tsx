'use client';

import { useState } from 'react';

import { TextField, ToggleButton } from '@muroom/components';
import { SearchIcon } from '@muroom/icons';

import Loading from '@/app/loading';
import { useFaqCategoriesQuery } from '@/hooks/api/faqs/useQueries';

export default function FaqBoard() {
  const [categoryId, setCategoryId] = useState(0);
  const [keyword, setKeyword] = useState('');

  const { data: faqCategoriesData, isLoading: isFaqCategoriesLoading } =
    useFaqCategoriesQuery();

  if (isFaqCategoriesLoading) {
    return <Loading />;
  }

  return (
    <div className='w-full'>
      <div className='flex-between'>
        <div className='flex items-center gap-x-3'>
          {faqCategoriesData?.map((category) => (
            <ToggleButton
              key={category.id}
              variant='text'
              size='m'
              selected={category.id === categoryId}
              onSelectedChange={(isSelected) => {
                if (isSelected) {
                  setCategoryId(category.id);
                }
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
          className='w-[404px]'
        />
      </div>
    </div>
  );
}
