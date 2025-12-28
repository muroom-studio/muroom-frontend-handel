'use client';

import HomeSearchBar from './home';
import NotHomeSearchBar from './not-home';

interface SearchBarProps {
  variant: 'home' | 'not-home';
  keyword: string | null;
  onSearch: (value: string) => void;
}

export default function SearchBar({
  variant,
  keyword,
  onSearch,
}: SearchBarProps) {
  if (variant === 'home') {
    return <HomeSearchBar keyword={keyword} onSearch={onSearch} />;
  }

  return <NotHomeSearchBar keyword={keyword} onSearch={onSearch} />;
}
