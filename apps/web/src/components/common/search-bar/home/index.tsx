'use client';

import { useState } from 'react';

import { useRecentSearchStore } from '@/store/useRecentKeywordStore';

import BaseSearchBar, {
  RecentSearchList,
  SearchResultList,
} from '../components/BaseSearchbar';

// import { useHomeRelatedKeywords } from '@/hooks/api/useHomeSearch'; (가정)

interface Props {
  keyword: string | null;
  onSearch: (value: string) => void;
}

export default function HomeSearchBar({ keyword, onSearch }: Props) {
  const { recentSearches, addRecentSearch, removeRecentSearch } =
    useRecentSearchStore();

  // API 결과 상태 (예시)
  const [relatedKeywords, setRelatedKeywords] = useState<string[]>([]);

  const handleInputChange = (val: string) => {
    // [Home용 API 호출 로직]
    // ex: const data = await getHomeKeywords(val);
    if (val) {
      setRelatedKeywords([`${val} (홈 API)`, `${val} 역`]); // 더미 데이터
    } else {
      setRelatedKeywords([]);
    }
  };

  const handleSearchWrapper = (val: string) => {
    if (val.trim().length > 0) addRecentSearch(val);
    onSearch(val);
  };

  return (
    <BaseSearchBar
      keyword={keyword}
      onSearch={handleSearchWrapper}
      onInputChange={handleInputChange}
      displayMode='popover' // 기본값 (붕 떠있음)
      // 검색어 없을 때: 최근 검색어 리스트
      renderEmptyState={() => (
        <RecentSearchList
          items={recentSearches}
          onSelect={handleSearchWrapper}
          onDelete={removeRecentSearch}
        />
      )}
      // 검색어 있을 때: 홈 API 결과 리스트
      renderResultState={() => (
        <SearchResultList
          items={relatedKeywords}
          onSelect={handleSearchWrapper}
        />
      )}
    />
  );
}
