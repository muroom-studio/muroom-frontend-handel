'use client';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import { Popover, TextField } from '@muroom/components';
import { CloseIcon, SearchIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import { useSearch } from '@/hooks/nuqs/common/useSearch';
import { useRecentSearchStore } from '@/store/useRecentKeywordStore';

interface SearchListProps {
  items: string[];
  onSelect: (value: string) => void;
  onDelete: (value: string) => void;
}

const RecentSearchList = ({ items, onSelect, onDelete }: SearchListProps) => {
  if (items.length === 0) {
    return (
      <div className='flex-center flex-1'>
        <p className='text-base-l-16-1 text-gray-400'>
          최근검색한 결과가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <ul className='flex flex-1 flex-col'>
      {items.map((item) => (
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
      ))}
    </ul>
  );
};

interface SearchResultListProps {
  onSelect: (value: string) => void;
  mockApiKeywords?: string[];
}

const SearchResultList = ({
  onSelect,
  mockApiKeywords = [],
}: SearchResultListProps) => {
  if (mockApiKeywords.length === 0) {
    return (
      <div className='flex-center flex-1'>
        <div className='flex-center-col gap-y-3 text-gray-400'>
          <SearchIcon className='size-11' />
          <p className='text-base-l-16-1 text-center'>
            검색결과에 일치하는 <br /> 장소가 없습니다
          </p>
        </div>
      </div>
    );
  }

  // 2. API 결과가 있을 때 -> 리스트 표시
  return (
    <ul className='flex flex-1 flex-col'>
      {mockApiKeywords.map((item, index) => (
        <li
          key={`${item}-${index}`}
          onMouseDown={(e) => {
            e.preventDefault();
            onSelect(item);
          }}
          className={cn(
            'flex items-center',
            'text-base-m-14-2 cursor-pointer rounded px-3 py-[11px] hover:bg-gray-50',
          )}
        >
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default function SearchBar() {
  const [keyword, setKeyword] = useSearch();
  const { recentSearches, addRecentSearch, removeRecentSearch } =
    useRecentSearchStore();

  const [inputValue, setInputValue] = useState(keyword ?? '');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [triggerWidth, setTriggerWidth] = useState<number | undefined>(
    undefined,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(keyword ?? '');
  }, [keyword]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setTriggerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleSearch = (value: string) => {
    if (value.trim().length > 0) {
      addRecentSearch(value);
    }
    setKeyword(value);
    setInputValue(value);
    setIsPopoverOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(inputValue);
    }
  };

  const handleClear = () => {
    setInputValue('');
    setKeyword('');
    setIsPopoverOpen(true);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <Popover.Trigger>
        <div ref={containerRef} className='w-full'>
          <TextField
            id='keyword'
            name='keyword'
            autoComplete='off'
            value={inputValue}
            placeholder='지하철역 또는 작업실 검색하기'
            leftIcon={<SearchIcon className='size-6' />}
            onClick={() => setIsPopoverOpen(true)}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (!isPopoverOpen) setIsPopoverOpen(true);
            }}
            onKeyDown={handleKeyDown}
            onClear={handleClear}
            inputClassName={cn(
              'transition-all duration-200 bg-white focus:border-primary-400',
              isPopoverOpen ? 'rounded-b-none' : '',
            )}
          />
        </div>
      </Popover.Trigger>

      <Popover.Content align='start' side='bottom' sideOffset={-1}>
        <div
          style={{ width: triggerWidth ? `${triggerWidth}px` : 'auto' }}
          className={cn(
            'flex flex-col',
            'min-h-[308px]',
            'border border-gray-100 bg-white',
            'shadow-level-0',
            'rounded-b-4',
          )}
        >
          {inputValue.length === 0 ? (
            <RecentSearchList
              items={recentSearches}
              onSelect={handleSearch}
              onDelete={removeRecentSearch}
            />
          ) : (
            <SearchResultList onSelect={handleSearch} mockApiKeywords={[]} />
          )}
        </div>
      </Popover.Content>
    </Popover>
  );
}
