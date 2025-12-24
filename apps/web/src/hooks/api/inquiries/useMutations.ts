import {
  QueryClient,
  UseMutationResult,
  useMutation,
} from '@tanstack/react-query';

import { postInquiries, postInquiriesPresignedUrl } from '@/lib/inquiries';
import {
  InquiriesPresignedUrlRequestProps,
  InquiriesPresignedUrlResponseProps,
  InquiriesRequestProps,
} from '@/types/inquiries';

const useInquiriesPresignedUrlMutation = (): UseMutationResult<
  InquiriesPresignedUrlResponseProps,
  Error,
  InquiriesPresignedUrlRequestProps
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
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: postInquiries,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['inquiries', 'my'],
      });
    },
  });
};

export { useInquiriesPresignedUrlMutation, useInquiriesMutation };
