import { createQueryString } from '@muroom/util';

import { PageRequestProps } from '@/types/api';
import {
  FaqCategoriesResponseProps,
  FaqRequestProps,
  FaqResponseProps,
} from '@/types/faqs';
import { customFetch } from '@/utils/customFetch';

export const getFaqCategories = async () => {
  const responseData = await customFetch<FaqCategoriesResponseProps>(
    '/faq-categories',
    {
      method: 'GET',
    },
  );
  return responseData;
};

export const getFaqs = async (params: FaqRequestProps & PageRequestProps) => {
  const queryString = createQueryString(params);
  const responseData = await customFetch<FaqResponseProps>(
    `/faqs?${queryString}`,
    {
      method: 'GET',
    },
  );

  return responseData;
};
