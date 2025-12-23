import { createQueryString } from '@muroom/util';

import { PageRequestProps } from '@/types/api';
import {
  InquiriesMyResponseProps,
  InquiriesPresignedUrlRequestProps,
  InquiriesPresignedUrlResponseProps,
  InquiriesRequestProps,
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

export const postInquiriesPresignedUrl = async (
  dto: InquiriesPresignedUrlRequestProps,
) => {
  const responseData = await customFetch<InquiriesPresignedUrlResponseProps>(
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
