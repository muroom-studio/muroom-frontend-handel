import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  deleteStudioBoasts,
  deleteStudioBoastsLikes,
  postStudioBoasts,
  postStudioBoastsLikes,
  postStudioBoastsPresignedUrl,
  postStudioBoastsReport,
  putStudioBoasts,
} from '@/lib/studio-boasts';
import {
  CommonImageUploadRequestProps,
  CommonImageUploadResponseProps,
} from '@/types/api';
import {
  CreateStudioBoastsRequestProps,
  DeleteStudioBoastsRequestProps,
  EditStudioBoastsRequestProps,
  StudioBoastsLikesRequestProps,
  StudioBoastsReportRequestProps,
} from '@/types/studio-boasts';

// Presigned URL 발급
const useStudioBoastsPresignedUrlMutation = (): UseMutationResult<
  CommonImageUploadResponseProps,
  Error,
  CommonImageUploadRequestProps
> => {
  return useMutation({
    mutationFn: postStudioBoastsPresignedUrl,
  });
};

// 매물 등록
const usePostStudioBoastsMutation = (): UseMutationResult<
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

// 매물 수정
const usePutStudioBoastsMutation = (): UseMutationResult<
  any,
  Error,
  EditStudioBoastsRequestProps
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putStudioBoasts,
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

// 매물 삭제
const useDeleteStudioBoastsMutation = (): UseMutationResult<
  any,
  Error,
  DeleteStudioBoastsRequestProps
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudioBoasts,
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
// 매물 좋아요
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

// 매물 좋아요 취소
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

// 매물 신고
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
  usePostStudioBoastsMutation,
  usePutStudioBoastsMutation,
  useDeleteStudioBoastsMutation,
  useStudioBoastsLikeMutation,
  useStudioBoastsUnlikeMutation,
  useStudioBoastsReportMutation,
};
