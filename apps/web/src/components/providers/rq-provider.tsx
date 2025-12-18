'use client';

import { useState } from 'react';

import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast } from 'sonner';

import { ApiRequestError } from '@/types/api';

interface Props {
  children: React.ReactNode;
}

function RQProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60,
          gcTime: 1000 * 60 * 5,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          retry: false,
          retryOnMount: true,
        },
      },
      mutationCache: new MutationCache({
        onSuccess: (_data, _variables, _context, mutation) => {
          const meta = mutation.options.meta as
            | { successMessage?: string }
            | undefined;

          if (meta?.successMessage) {
            toast.success(meta.successMessage);
          }
        },
        onError: (error, _variables, _context, mutation) => {
          const meta = mutation.options.meta as
            | { ignoreErrorToast?: boolean }
            | undefined;

          if (meta?.ignoreErrorToast) {
            return;
          }

          if (error instanceof ApiRequestError) {
            toast.error(error.message);
            return;
          }

          const errorMessage =
            error instanceof Error
              ? error.message
              : '알 수 없는 오류가 발생했습니다.';
          toast.error(errorMessage);
        },
      }),
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'}
      />
    </QueryClientProvider>
  );
}

export default RQProvider;
