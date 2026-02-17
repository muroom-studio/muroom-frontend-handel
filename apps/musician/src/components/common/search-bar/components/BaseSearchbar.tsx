'use client';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import { Popover, TextField } from '@muroom/components';
import { CloseIcon, SearchIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

// --- [Part 1] 재사용 가능한 리스트 컴포넌트들 ---

interface SearchListProps {
  items: string[];
  onSelect: (value: string) => void;
  onDelete?: (value: string) => void;
}

export const RecentSearchList = ({
  items,
  onSelect,
  onDelete,
}: SearchListProps) => {
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
            e.preventDefault(); // 포커스 잃지 않게 방지
            onSelect(item);
          }}
          className={cn(
            'flex-between group',
            'text-base-m-14-2 cursor-pointer rounded px-3 py-[11px] hover:bg-gray-50',
          )}
        >
          <span>{item}</span>
          {onDelete && (
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
          )}
        </li>
      ))}
    </ul>
  );
};

export const SearchResultList = ({ items, onSelect }: SearchListProps) => {
  if (items.length === 0) {
    return (
      <div className='flex-center min-h-[308px] flex-1'>
        <div className='flex-center-col gap-y-3 text-gray-400'>
          <SearchIcon className='size-11' />
          <p className='text-base-l-16-1 text-center'>
            검색결과에 일치하는 <br /> 장소가 없습니다
          </p>
        </div>
      </div>
    );
  }

  return (
    <ul className='flex flex-1 flex-col'>
      {items.map((item, index) => (
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

// --- [Part 2] BaseSearchBar 본체 ---

export interface BaseSearchBarProps {
  keyword: string | null;
  placeholder?: string;
  onSearch: (value: string) => void;
  onInputChange?: (value: string) => void;

  // 렌더링 전략 (Render Props)
  renderEmptyState?: () => React.ReactNode;
  renderResultState: (keyword: string) => React.ReactNode;

  // [핵심] 표시 모드 (기본: popover, 밀어내기: inline)
  displayMode?: 'popover' | 'inline';
}

export default function BaseSearchBar({
  keyword,
  placeholder = '지하철역 또는 작업실 검색하기',
  onSearch,
  onInputChange,
  renderEmptyState,
  renderResultState,
  displayMode = 'popover',
}: BaseSearchBarProps) {
  const [inputValue, setInputValue] = useState(keyword ?? '');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [triggerWidth, setTriggerWidth] = useState<number | undefined>(
    undefined,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // 부모의 keyword가 바뀌면 input 값 동기화
  useEffect(() => {
    setInputValue(keyword ?? '');
  }, [keyword]);

  useEffect(() => {
    if (displayMode === 'inline') return;

    const updateWidth = () => {
      if (containerRef.current) {
        setTriggerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [displayMode]);

  const handleSearch = (value: string) => {
    onSearch(value);
    setInputValue(value);
    setIsPopoverOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onInputChange) onInputChange(newValue);

    if (newValue.length > 0 || renderEmptyState) {
      if (!isPopoverOpen) setIsPopoverOpen(true);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(inputValue);
    }
  };

  const handleClear = () => {
    setInputValue('');
    if (onInputChange) onInputChange('');

    // 최근검색어가 있으면(renderEmptyState 존재) 결과창 유지, 없으면 닫기
    if (renderEmptyState) {
      setIsPopoverOpen(true);
    } else {
      setIsPopoverOpen(false);
    }
  };

  // 현재 보여줄 콘텐츠 결정
  const content =
    inputValue.length === 0
      ? renderEmptyState?.()
      : renderResultState(inputValue);

  // ------------------------------------------------------------
  // [Case A] Inline 모드: Popover 없이 div 흐름 그대로 노출 (밀어내기)
  // ------------------------------------------------------------
  if (displayMode === 'inline') {
    return (
      <div className='w-full'>
        <TextField
          id='search-bar-inline'
          autoComplete='off'
          value={inputValue}
          placeholder={placeholder}
          leftIcon={<SearchIcon className='size-6' />}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onClear={handleClear}
          inputClassName='bg-white focus:border-primary-400'
        />
        {/* 콘텐츠가 있을 때만 렌더링하여 하단 요소들을 밀어냄 */}
        {content && (
          <div className='rounded-4 shadow-level-0 flex -translate-y-px flex-col border border-gray-100 bg-white'>
            {content}
          </div>
        )}
      </div>
    );
  }

  // ------------------------------------------------------------
  // [Case B] Popover 모드: 기존 로직 (붕 떠있는 형태)
  // ------------------------------------------------------------
  const shouldOpen = isPopoverOpen && !!content;

  return (
    <Popover open={shouldOpen} onOpenChange={setIsPopoverOpen}>
      <Popover.Trigger>
        <div ref={containerRef} className='w-full'>
          <TextField
            id='search-bar'
            autoComplete='off'
            value={inputValue}
            placeholder={placeholder}
            leftIcon={<SearchIcon className='size-6' />}
            onClick={() => {
              if (content) setIsPopoverOpen(true);
            }}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onClear={handleClear}
            inputClassName={cn(
              'transition-all duration-200 bg-white focus:border-primary-400',
              shouldOpen ? 'rounded-b-none' : '',
            )}
          />
        </div>
      </Popover.Trigger>

      <Popover.Content align='start' side='bottom' sideOffset={-1}>
        <div
          style={{ width: triggerWidth ? `${triggerWidth}px` : 'auto' }}
          className={cn(
            'flex min-h-[100px] flex-col',
            'shadow-level-0 rounded-b-4 border border-gray-100 bg-white',
          )}
        >
          {content}
        </div>
      </Popover.Content>
    </Popover>
  );
}
