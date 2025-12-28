import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { postInquiries, postInquiriesPresignedUrl } from '@/lib/inquiries';
import {
  CommonImageUploadRequestProps,
  CommonImageUploadResponseProps,
} from '@/types/api';
import { InquiriesRequestProps } from '@/types/inquiries';

const useInquiriesPresignedUrlMutation = (): UseMutationResult<
  CommonImageUploadResponseProps,
  Error,
  CommonImageUploadRequestProps
> => {
  return useMutation({
    mutationFn: postInquiriesPresignedUrl,
  });
};

const useInquiriesMutation = (): UseMutationResult<
  any,
  Error,
  InquiriesRequestProps
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postInquiries,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['inquiries'],
      });
    },
  });
};

export { useInquiriesPresignedUrlMutation, useInquiriesMutation };
