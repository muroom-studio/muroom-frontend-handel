import { StudioDetailResponseProps } from '@/types/studio';
import {
  StudioFilterOptionsResponseProps,
  StudiosMapListRequestProps,
  StudiosMapListResponseProps,
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

// home -> 지도 내 스튜디오 목록 조회 (페이지네이션)
export const getStudiosMapList = async (params: StudiosMapListRequestProps) => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((item) => queryParams.append(key, item.toString()));
      } else {
        queryParams.append(key, value.toString());
      }
    }
  });

  const queryString = queryParams.toString();

  const responseData = await customFetch<StudiosMapListResponseProps>(
    `/studios/map-list?${queryString}`,
    {
      method: 'GET',
    },
  );

  return responseData;
};

// home -> 작업실 상세 조회
export const getStudioDetail = async (studioId: string) => {
  const responseData = await customFetch<StudioDetailResponseProps>(
    `/studios/${studioId}`,
    {
      method: 'GET',
    },
  );

  return responseData;
};
