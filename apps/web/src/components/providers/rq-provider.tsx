'use client';

import { useState } from 'react';

import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast } from 'sonner';

import { Spinner } from '@muroom/ui/components';

import { ApiRequestError } from '@/types/api';

const MutatingIndicator = () => {
  const isMutating = useIsMutating();
  if (isMutating === 0) return null;
  return <Spinner variant='component' />;
};

const FetchingIndicator = () => {
  const isFetching = useIsFetching();
  if (isFetching === 0) return null;
  return <Spinner variant='component' />;
};

interface Props {
  children: React.ReactNode;
}

function RQProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retryOnMount: true,
          refetchOnReconnect: false,
          retry: false,
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
        onError: (error, _variables, _context, _mutation) => {
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

      <MutatingIndicator />
      <FetchingIndicator />
    </QueryClientProvider>
  );
}

export default RQProvider;
