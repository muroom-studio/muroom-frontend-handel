'use client';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { TextField } from '@muroom/components';
import { CloseIcon, SearchIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import { useSearch } from '@/hooks/nuqs/common/useSearch';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { useAuthRedirectStore } from '@/store/useAuthRedirectStore';
import { useRecentSearchStore } from '@/store/useRecentKeywordStore';

interface SearchListProps {
  items: string[];
  onSelect: (value: string) => void;
  onDelete: (value: string) => void;
}

const RecentSearchList = ({ items, onSelect, onDelete }: SearchListProps) => {
  return (
    <ul className='flex flex-1 flex-col'>
      {items.length === 0 ? (
        <div className='flex-center flex-1 flex-col text-gray-400'>
          <SearchIcon className='mb-3 size-11' />
          <p className='text-base-l-16-1 text-center'>
            검색결과에 일치하는 <br /> 장소가 없습니다
          </p>
        </div>
      ) : (
        items.map((item) => (
          <li
            key={item}
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(item);
            }}
            className={cn(
              'flex-between group',
              'text-base-m-14-2 cursor-pointer rounded px-3 py-[11px] hover:bg-gray-50',
            )}
          >
            <span>{item}</span>
            <div
              className='hidden group-hover:block'
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDelete(item);
              }}
            >
              <CloseIcon className='size-4 text-gray-400 hover:text-gray-600' />
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isMobile } = useResponsiveLayout();

  const [keyword, setKeyword] = useSearch(); // URL State
  const { setRedirectUrl } = useAuthRedirectStore(); // Return URL Store
  const { recentSearches, addRecentSearch, removeRecentSearch } =
    useRecentSearchStore(); // Keyword Store

  // 2. Local State
  const [inputValue, setInputValue] = useState(keyword ?? '');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3. Effects
  // URL keyword 변경 시 로컬 인풋 동기화
  useEffect(() => {
    setInputValue(keyword ?? '');
  }, [keyword]);

  // 외부 클릭 시 드롭다운 닫기 (데스크탑 전용)
  useEffect(() => {
    if (isMobile) return; // 모바일에서는 이벤트 리스너 부착 불필요

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile]);

  // 4. Handlers

  // [Mobile] 페이지 이동 핸들러
  const handleMobileClick = () => {
    if (!isMobile) return;

    const queryString = searchParams.toString();
    const currentUrl = queryString ? `${pathname}?${queryString}` : pathname;
    setRedirectUrl(currentUrl);

    router.push('/search');
  };

  // [Desktop] 검색 실행 핸들러
  const handleSearch = (value: string) => {
    if (value.trim().length > 0) {
      addRecentSearch(value);
    }
    setKeyword(value);
    setInputValue(value);
    setIsFocused(false);
  };

  // [Desktop] 엔터키 핸들러
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isMobile) return; // 모바일은 엔터 이벤트 무시 (어차피 readOnly지만 안전장치)
    if (e.key === 'Enter') {
      handleSearch(inputValue);
    }
  };

  // [Desktop] 초기화 핸들러
  const handleClear = () => {
    setInputValue('');
    setKeyword('');
  };

  const showRecentSearch = !isMobile && isFocused && inputValue.length === 0;

  return (
    <div ref={containerRef} className='relative w-full'>
      <TextField
        id='keyword'
        name='keyword'
        autoComplete='off'
        value={inputValue}
        placeholder='지하철역 또는 작업실 검색하기'
        leftIcon={<SearchIcon className='size-6' />}
        readOnly={isMobile}
        onClick={handleMobileClick}
        // Desktop Logic
        onFocus={() => !isMobile && setIsFocused(true)}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (!isMobile) setIsFocused(true);
        }}
        onKeyDown={handleKeyDown}
        onClear={handleClear}
        inputClassName={cn(
          'transition-all duration-200 bg-white focus:rounded-b-none focus:border-primary-400',
          isMobile && 'cursor-pointer border-transparent',
        )}
      />

      {showRecentSearch && (
        <div
          className={cn(
            'absolute left-0 top-full w-full',
            'flex flex-col',
            'min-h-[308px]',
            'border border-gray-100 bg-white',
            'shadow-level-0',
            'z-40',
            'rounded-b-4',
          )}
        >
          <RecentSearchList
            items={recentSearches}
            onSelect={handleSearch}
            onDelete={removeRecentSearch}
          />
        </div>
      )}
    </div>
  );
}
