import { createQueryString } from '@muroom/util';

import {
  CommonImageUploadRequestProps,
  CommonImageUploadResponseProps,
} from '@/types/api';
import {
  CreateStudioBoastsRequestProps,
  DeleteStudioBoastsRequestProps,
  EditStudioBoastsRequestProps,
  StudioBoastsDetailRequestProps,
  StudioBoastsDetailResponseProps,
  StudioBoastsLikesRequestProps,
  StudioBoastsMyRequestProps,
  StudioBoastsMyResponseProps,
  StudioBoastsReportRequestProps,
  StudioBoastsRequestProps,
  StudioBoastsResponseProps,
  StudioBoastsSimpleRequestProps,
  StudioBoastsSimpleResponseProps,
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

export const getStudioBoastsSimple = async (
  params: StudioBoastsSimpleRequestProps,
) => {
  const queryString = createQueryString(params);

  const responseData = await customFetch<StudioBoastsSimpleResponseProps>(
    `/studio-boasts/simple?${queryString}`,
    {
      method: 'GET',
    },
  );

  return responseData;
};

export const getStudioBoastsDetail = async (
  params: StudioBoastsDetailRequestProps,
) => {
  const responseData = await customFetch<StudioBoastsDetailResponseProps>(
    `/studio-boasts/${params.studioBoastId}`,
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

export const putStudioBoasts = async (params: EditStudioBoastsRequestProps) => {
  const { studioBoastId, ...dto } = params;

  const responseData = await customFetch(`/studio-boasts/${studioBoastId}`, {
    method: 'PUT',
    body: JSON.stringify(dto),
  });

  return responseData;
};

export const deleteStudioBoasts = async (
  dto: DeleteStudioBoastsRequestProps,
) => {
  const responseData = await customFetch(
    `/studio-boasts/${dto.studioBoastId}`,
    {
      method: 'DELETE',
    },
  );

  return responseData;
};

export const postStudioBoastsLikes = async (
  params: StudioBoastsLikesRequestProps,
) => {
  const responseData = await customFetch(
    `/studio-boasts/${params.studioBoastId}/likes`,
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
    `/studio-boasts/${params.studioBoastId}/likes`,
    {
      method: 'DELETE',
    },
  );

  return responseData;
};

export const postStudioBoastsReport = async (
  params: StudioBoastsReportRequestProps,
) => {
  const { studioBoastId, ...requestBody } = params;

  const responseData = await customFetch(
    `/studio-boasts/${studioBoastId}/report`,
    {
      method: 'POST',
      body: JSON.stringify(requestBody),
    },
  );

  return responseData;
};
