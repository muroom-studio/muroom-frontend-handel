import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  deleteStudioBoastsLikes,
  postStudioBoasts,
  postStudioBoastsLikes,
  postStudioBoastsPresignedUrl,
  postStudioBoastsReport,
} from '@/lib/studio-boasts';
import {
  CommonImageUploadRequestProps,
  CommonImageUploadResponseProps,
} from '@/types/api';
import {
  CreateStudioBoastsRequestProps,
  StudioBoastsLikesRequestProps,
  StudioBoastsReportRequestProps,
} from '@/types/studio-boasts';

// 1. Presigned URL 발급
const useStudioBoastsPresignedUrlMutation = (): UseMutationResult<
  CommonImageUploadResponseProps,
  Error,
  CommonImageUploadRequestProps
> => {
  return useMutation({
    mutationFn: postStudioBoastsPresignedUrl,
  });
};

// 2. 게시글 작성
const useStudioBoastsMutation = (): UseMutationResult<
  any,
  Error,
  CreateStudioBoastsRequestProps
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postStudioBoasts,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['studio-boasts'],
      });
    },
  });
};

const useStudioBoastsLikeMutation = (): UseMutationResult<
  any,
  Error,
  StudioBoastsLikesRequestProps
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postStudioBoastsLikes,
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['studio-boasts'],
      });
      queryClient.invalidateQueries({
        queryKey: ['studio-boasts', variables.studioBoastId],
      });
    },
  });
};

const useStudioBoastsUnlikeMutation = (): UseMutationResult<
  any,
  Error,
  StudioBoastsLikesRequestProps
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudioBoastsLikes,
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['studio-boasts'],
      });
      queryClient.invalidateQueries({
        queryKey: ['studio-boasts', variables.studioBoastId],
      });
    },
  });
};

const useStudioBoastsReportMutation = (): UseMutationResult<
  any,
  Error,
  StudioBoastsReportRequestProps
> => {
  return useMutation({
    mutationFn: postStudioBoastsReport,
  });
};

export {
  useStudioBoastsPresignedUrlMutation,
  useStudioBoastsMutation,
  useStudioBoastsLikeMutation,
  useStudioBoastsUnlikeMutation,
  useStudioBoastsReportMutation,
};
