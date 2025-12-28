import { createQueryString } from '@muroom/util';

import {
  StudioBoastsCommentsLikesRequestProps,
  StudioBoastsCommentsRequestProps,
  StudioBoastsCommentsResponseProps,
  StudioBoastsCreateCommentsRequestProps,
  StudioBoastsDeleteCommentsRequestProps,
  StudioBoastsEditCommentsRequestProps,
} from '@/types/studio-boasts/comments';
import { customFetch } from '@/utils/customFetch';

export const getStudioBoastsComments = async (
  params: StudioBoastsCommentsRequestProps,
) => {
  const { studioBoastId, ...pageParams } = params;
  const queryString = createQueryString(pageParams);

  const responseData = await customFetch<StudioBoastsCommentsResponseProps>(
    `/studio-boasts/${studioBoastId}/comments?${queryString}`,
    {
      method: 'GET',
    },
  );

  return responseData;
};

export const postStudioBoastsComments = async (
  params: StudioBoastsCreateCommentsRequestProps,
) => {
  const { studioBoastId, ...dto } = params;

  const responseData = await customFetch(
    `/studio-boasts/${studioBoastId}/comments`,
    {
      method: 'POST',
      body: JSON.stringify(dto),
    },
  );

  return responseData;
};

export const putStudioBoastsComments = async (
  params: StudioBoastsEditCommentsRequestProps,
) => {
  const { studioBoastId, commentId, ...dto } = params;

  const responseData = await customFetch(
    `/studio-boasts/${studioBoastId}/comments/${commentId}`,
    {
      method: 'PUT',
      body: JSON.stringify(dto),
    },
  );

  return responseData;
};

export const deleteStudioBoastsComments = async (
  params: StudioBoastsDeleteCommentsRequestProps,
) => {
  const { studioBoastId, commentId } = params;

  const responseData = await customFetch(
    `/studio-boasts/${studioBoastId}/comments/${commentId}`,
    {
      method: 'DELETE',
    },
  );

  return responseData;
};

export const postStudioBoastsCommentsLikes = async (
  params: StudioBoastsCommentsLikesRequestProps,
) => {
  const { studioBoastId, commentId } = params;

  const responseData = await customFetch(
    `/studio-boasts/${studioBoastId}/comments/${commentId}/likes`,
    {
      method: 'POST',
    },
  );

  return responseData;
};

export const deleteStudioBoastsCommentsLikes = async (
  params: StudioBoastsCommentsLikesRequestProps,
) => {
  const { studioBoastId, commentId } = params;

  const responseData = await customFetch(
    `/studio-boasts/${studioBoastId}/comments/${commentId}/likes`,
    {
      method: 'DELETE',
    },
  );

  return responseData;
};
