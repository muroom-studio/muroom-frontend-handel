'use client';

import { useState } from 'react';

import BaseSearchBar, { SearchResultList } from '../components/BaseSearchbar';

// import { useOtherRelatedKeywords } from '@/hooks/api/useOtherSearch'; (가정)

interface Props {
  keyword: string | null;
  onSearch: (value: string) => void;
}

export default function NotHomeSearchBar({ keyword, onSearch }: Props) {
  const [relatedKeywords, setRelatedKeywords] = useState<string[]>([]);

  const handleInputChange = (val: string) => {
    // [다른 페이지용 API 호출 로직]
    setRelatedKeywords([]);
  };

  return (
    <BaseSearchBar
      keyword={keyword}
      onSearch={onSearch}
      onInputChange={handleInputChange}
      displayMode='inline'
      renderEmptyState={undefined}
      // 검색어 있을 때: 다른 API 결과 리스트
      renderResultState={() => (
        <SearchResultList items={relatedKeywords} onSelect={onSearch} />
      )}
    />
  );
}
