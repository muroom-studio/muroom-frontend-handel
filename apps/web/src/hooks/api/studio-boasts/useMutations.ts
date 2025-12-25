import {
  QueryClient,
  UseMutationResult,
  useMutation,
} from '@tanstack/react-query';

import {
  postStudioBoasts,
  postStudioBoastsPresignedUrl,
} from '@/lib/studio-boasts';
import {
  CommonImageUploadRequestProps,
  CommonImageUploadResponseProps,
} from '@/types/api';
import { CreateStudioBoastsRequestProps } from '@/types/studio-boasts';

const useStudioBoastsPresignedUrlMutation = (): UseMutationResult<
  CommonImageUploadResponseProps,
  Error,
  CommonImageUploadRequestProps
> => {
  return useMutation({
    mutationFn: postStudioBoastsPresignedUrl,
  });
};

const useStudioBoastsMutation = (): UseMutationResult<
  any,
  Error,
  CreateStudioBoastsRequestProps
> => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: postStudioBoasts,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['studio-boasts'],
      });
    },
  });
};

export { useStudioBoastsPresignedUrlMutation, useStudioBoastsMutation };
