import {
  StudioFilterOptionsResponseProps,
  StudiosMapSearchRequestProps,
  StudiosMapSearchResponseProps,
} from '@/types/studios';
import { customFetch } from '@/utils/customFetch';

// home -> 필터링옵션들 아이템 불러오기
export const getStudioFilterOptions = async () => {
  const responseData = await customFetch<StudioFilterOptionsResponseProps>(
    '/studios/filter-options',
    {
      method: 'GET',
    },
  );

  return responseData;
};

// home -> dynamic map 위에 마커 띄우기용
export const getStudiosMapSearch = async (
  params: StudiosMapSearchRequestProps,
) => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString());
    }
  });

  const queryString = queryParams.toString();

  const responseData = await customFetch<StudiosMapSearchResponseProps>(
    `/studios/map-search?${queryString}`,
    {
      method: 'GET',
    },
  );

  return responseData;
};
