'use client';

import { TextField } from '@muroom/components';
import { SearchIcon } from '@muroom/icons';

import { useSearch } from '@/hooks/nuqs/common/useSearch';

export default function SearchBar() {
  const [keyword, setKeyword] = useSearch();
  return (
    <TextField
      id='keyword'
      name='keyword'
      autoComplete='off'
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      onClear={() => setKeyword('')}
      placeholder='지하철역 또는 작업실 검색하기'
      leftIcon={<SearchIcon className='size-6' />}
      inputClassName='focus:border-primary-400 focus:rounded-b-none'
    />
  );
}
