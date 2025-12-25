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
} from '@/lib/studio-boasts';
import {
  CommonImageUploadRequestProps,
  CommonImageUploadResponseProps,
} from '@/types/api';
import {
  CreateStudioBoastsRequestProps,
  StudioBoastsLikesRequestProps,
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

// 3. 좋아요 등록 (POST)
const useStudioBoastsLikeMutation = (): UseMutationResult<
  any,
  Error,
  StudioBoastsLikesRequestProps
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postStudioBoastsLikes,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['studio-boasts'],
      });
    },
  });
};

// 4. 좋아요 취소 (DELETE)
const useStudioBoastsUnlikeMutation = (): UseMutationResult<
  any,
  Error,
  StudioBoastsLikesRequestProps
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudioBoastsLikes,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['studio-boasts'],
      });
    },
  });
};

export {
  useStudioBoastsPresignedUrlMutation,
  useStudioBoastsMutation,
  useStudioBoastsLikeMutation,
  useStudioBoastsUnlikeMutation,
};
