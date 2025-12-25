import { InfiniteData } from '@tanstack/react-query';

import { PaginationInfo } from '@/types/api';

export const extractInfiniteData = <T>(
  data: InfiniteData<any> | undefined,
  isMobile: boolean = false,
) => {
  if (!data || !data.pages || data.pages.length === 0) {
    return {
      content: [] as T[],
      pagination: undefined as PaginationInfo | undefined,
    };
  }

  const getPageData = (page: any) => {
    const content = (page.data?.content || page.content || []) as T[];
    const pagination = (page.data?.pagination || page.pagination) as
      | PaginationInfo
      | undefined;

    return { content, pagination };
  };

  if (isMobile) {
    const content = data.pages.flatMap((page) => getPageData(page).content);
    const lastPage = data.pages[data.pages.length - 1];
    const { pagination } = getPageData(lastPage);
    return { content, pagination };
  } else {
    const currentPage = data.pages[0];
    const { content, pagination } = getPageData(currentPage);
    return { content, pagination };
  }
};
