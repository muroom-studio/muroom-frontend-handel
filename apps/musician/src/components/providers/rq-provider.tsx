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
          retry: 1,
          retryDelay: 1000,

          retryOnMount: true,
          throwOnError: (error) => {
            if (error.message?.includes('초과')) return false;

            if (error instanceof ApiRequestError) {
              return error.status >= 500;
            }
            return false;
          },
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
        onError: (error) => {
          if (error.message?.includes('초과')) {
            toast.error('연결이 지연되어 다시 시도 중입니다...');
            return;
          }

          if (error instanceof ApiRequestError) {
            toast.error(error.message);
          }
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
