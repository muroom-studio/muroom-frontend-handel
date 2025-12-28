import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  deleteStudioBoastsComments,
  deleteStudioBoastsCommentsLikes,
  postStudioBoastsComments,
  postStudioBoastsCommentsLikes,
  putStudioBoastsComments,
} from '@/lib/studio-boasts/comments';
import {
  StudioBoastsCommentsLikesRequestProps,
  StudioBoastsCreateCommentsRequestProps,
  StudioBoastsDeleteCommentsRequestProps,
  StudioBoastsEditCommentsRequestProps,
} from '@/types/studio-boasts/comments';

// 댓글/대댓글 생성
const useCreateStudioBoastsCommentsMutation = (): UseMutationResult<
  any,
  Error,
  StudioBoastsCreateCommentsRequestProps
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postStudioBoastsComments,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['studio-boasts'],
      });

      queryClient.invalidateQueries({
        queryKey: ['studio-boasts-comments', variables.studioBoastId],
      });
    },
  });
};

// 댓글 수정
const useEditStudioBoastsCommentsMutation = (): UseMutationResult<
  any,
  Error,
  StudioBoastsEditCommentsRequestProps
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putStudioBoastsComments,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['studio-boasts'],
      });

      queryClient.invalidateQueries({
        queryKey: ['studio-boasts-comments', variables.studioBoastId],
      });
    },
  });
};

// 댓글 삭제
const useDeleteStudioBoastsCommentsMutation = (): UseMutationResult<
  any,
  Error,
  StudioBoastsDeleteCommentsRequestProps
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudioBoastsComments,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['studio-boasts'],
      });

      queryClient.invalidateQueries({
        queryKey: ['studio-boasts-comments', variables.studioBoastId],
      });
    },
  });
};

// 댓글 좋아요
const useStudioBoastsCommentsLikeMutation = (): UseMutationResult<
  any,
  Error,
  StudioBoastsCommentsLikesRequestProps
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postStudioBoastsCommentsLikes,
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['studio-boasts-comments', variables.studioBoastId],
      });
    },
  });
};

// 댓글 좋아요 취소
const useStudioBoastsCommentsUnlikeMutation = (): UseMutationResult<
  any,
  Error,
  StudioBoastsCommentsLikesRequestProps
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudioBoastsCommentsLikes,
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['studio-boasts-comments', variables.studioBoastId],
      });
    },
  });
};

export {
  useCreateStudioBoastsCommentsMutation,
  useEditStudioBoastsCommentsMutation,
  useDeleteStudioBoastsCommentsMutation,
  useStudioBoastsCommentsLikeMutation,
  useStudioBoastsCommentsUnlikeMutation,
};
