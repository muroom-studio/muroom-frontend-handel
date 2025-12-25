import { createQueryString } from '@muroom/util';

import {
  CommonImageUploadRequestProps,
  CommonImageUploadResponseProps,
} from '@/types/api';
import {
  CreateStudioBoastsRequestProps,
  StudioBoastsLikesRequestProps,
  StudioBoastsMyRequestProps,
  StudioBoastsMyResponseProps,
  StudioBoastsRequestProps,
  StudioBoastsResponseProps,
} from '@/types/studio-boasts';
import { customFetch } from '@/utils/customFetch';

export const getStudioBoasts = async (params: StudioBoastsRequestProps) => {
  const queryString = createQueryString(params);

  const responseData = await customFetch<StudioBoastsResponseProps>(
    `/studio-boasts?${queryString}`,
    {
      method: 'GET',
    },
  );

  return responseData;
};

export const getStudioBoastsMy = async (params: StudioBoastsMyRequestProps) => {
  const queryString = createQueryString(params);

  const responseData = await customFetch<StudioBoastsMyResponseProps>(
    `/studio-boasts/my?${queryString}`,
    {
      method: 'GET',
    },
  );

  return responseData;
};

export const postStudioBoastsPresignedUrl = async (
  dto: CommonImageUploadRequestProps,
) => {
  const responseData = await customFetch<CommonImageUploadResponseProps>(
    '/studio-boasts/presigned-url',
    {
      method: 'POST',
      body: JSON.stringify(dto),
    },
  );

  return responseData;
};

export const postStudioBoasts = async (dto: CreateStudioBoastsRequestProps) => {
  const responseData = await customFetch('/studio-boasts', {
    method: 'POST',
    body: JSON.stringify(dto),
  });

  return responseData;
};

export const postStudioBoastsLikes = async (
  params: StudioBoastsLikesRequestProps,
) => {
  const responseData = await customFetch(
    `/studio-studio-boasts/${params.studioBoastId}/likes`,
    {
      method: 'POST',
    },
  );

  return responseData;
};

export const deleteStudioBoastsLikes = async (
  params: StudioBoastsLikesRequestProps,
) => {
  const responseData = await customFetch(
    `/studio-studio-boasts/${params.studioBoastId}/likes`,
    {
      method: 'DELETE',
    },
  );

  return responseData;
};
