import { createQueryString } from '@muroom/util';

import {
  CommonImageUploadRequestProps,
  CommonImageUploadResponseProps,
  PageRequestProps,
} from '@/types/api';
import {
  InquiriesDetailRequestProps,
  InquiriesDetailResponseProps,
  InquiriesMyResponseProps,
  InquiriesRequestProps,
  InquiriesSearchRequestProps,
  InquiriesSearchResponseProps,
  InquiryCategoryResponseProps,
} from '@/types/inquiries';
import { customFetch } from '@/utils/customFetch';

export const getInquiryCategories = async () => {
  const responseData = await customFetch<InquiryCategoryResponseProps>(
    '/inquiry-categories',
    {
      method: 'GET',
    },
  );

  return responseData;
};

export const getInquiriesMy = async (params: PageRequestProps) => {
  const queryString = createQueryString(params);

  const responseData = await customFetch<InquiriesMyResponseProps>(
    `/inquiries/my?${queryString}`,
    {
      method: 'GET',
    },
  );

  return responseData;
};

export const getInquiriesSearch = async (
  params: InquiriesSearchRequestProps & PageRequestProps,
) => {
  const queryString = createQueryString(params);

  const responseData = await customFetch<InquiriesSearchResponseProps>(
    `/inquiries/search?${queryString}`,
    {
      method: 'GET',
    },
  );

  return responseData;
};

export const getInquiriesDetail = async (
  params: InquiriesDetailRequestProps,
) => {
  const responseData = await customFetch<InquiriesDetailResponseProps>(
    `/inquiries/${params.inquiryId}`,
    {
      method: 'GET',
    },
  );

  return responseData;
};

export const postInquiriesPresignedUrl = async (
  dto: CommonImageUploadRequestProps,
) => {
  const responseData = await customFetch<CommonImageUploadResponseProps>(
    '/inquiries/presigned-url',
    {
      method: 'POST',
      body: JSON.stringify(dto),
    },
  );

  return responseData;
};

export const postInquiries = async (dto: InquiriesRequestProps) => {
  const responseData = await customFetch('/inquiries', {
    method: 'POST',
    body: JSON.stringify(dto),
  });

  return responseData;
};
