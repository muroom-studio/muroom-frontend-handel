'use client';

import { useEffect } from 'react';

import { sendGAEvent } from '@next/third-parties/google';

import ErrorTemplate from '@/components/common/error-template';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);

    sendGAEvent('event', 'exception', {
      description: error.message,
      fatal: true,
      error_digest: error.digest,
    });
  }, [error]);
  return <ErrorTemplate status={500} />;
}
