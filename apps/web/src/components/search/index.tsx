'use client';

import { KeyboardEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import { TextField } from '@muroom/components';
import { CloseIcon, RightArrowIcon } from '@muroom/icons';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { useRecentSearchStore } from '@/store/useRecentKeywordStore';

export default function SearchPage() {
  const { isMobile } = useResponsiveLayout();

  const router = useRouter();
  const {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    setPendingKeyword,
  } = useRecentSearchStore();

  const [inputValue, setInputValue] = useState('');

  const inputRef = (element: HTMLInputElement | null) => {
    if (element) {
      setTimeout(() => element.focus(), 50);
    }
  };

  const handleSearch = (value: string) => {
    if (value.trim().length > 0) {
      addRecentSearch(value);
      setPendingKeyword(value);
    }

    router.back();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(inputValue);
    }
  };

  if (!isMobile) return null;

  return (
    <div className='z-9999 fixed inset-0 flex flex-col bg-white pb-[env(safe-area-inset-bottom)]'>
      <div className='flex items-center border-b border-gray-100'>
        <TextField
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          leftIcon={
            <RightArrowIcon
              className='size-6 rotate-180 cursor-pointer'
              onClick={() => router.back()}
            />
          }
          placeholder='지하철역 또는 작업실 검색하기'
          className='w-full'
          inputClassName='bg-transparent border-0 outline-none'
        />
      </div>

      <div className='flex flex-1 flex-col overflow-y-auto'>
        {inputValue.length === 0 && (
          <>
            {recentSearches.length === 0 ? (
              <div className='flex-center text-base-l-16-1 flex-1 text-gray-400'>
                최근 검색한 결과가 없습니다
              </div>
            ) : (
              <ul className='flex flex-col'>
                {recentSearches.map((item) => (
                  <li
                    key={item}
                    className='flex-between border-b border-gray-50 p-4 last:border-0'
                    onClick={() => handleSearch(item)}
                  >
                    <span className='text-base-m-14-2 flex-1 cursor-pointer'>
                      {item}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentSearch(item);
                      }}
                    >
                      <CloseIcon className='size-6 text-gray-400' />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
