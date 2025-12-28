import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { P } from 'node_modules/framer-motion/dist/types.d-BJcRxCew';

import { postStudioBoastsComments } from '@/lib/studio-boasts/comments';
import { StudioBoastsCreateCommentsRequestProps } from '@/types/studio-boasts/comments';

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
        queryKey: ['studio-boasts-comments', variables.studioBoastId],
      });
    },
  });
};
