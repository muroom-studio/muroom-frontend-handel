'use client';

import { useState } from 'react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

import { Spinner } from '@muroom/ui/components';

const MutatingIndicator = () => {
  const isMutating = useIsMutating();

  if (isMutating === 0) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20'>
      <Spinner />
    </div>
  );
};

const FetchingIndicator = () => {
  const isFetching = useIsFetching();

  if (isFetching === 0) return null;

  return (
    <div className='fixed left-0 top-0 z-50 h-1 w-full'>
      <Spinner />
    </div>
  );
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
