'use client';

import { useState } from 'react';

export const useThrowError = () => {
  const [_, setError] = useState();

  return (e: unknown) => {
    setError(() => {
      throw e;
    });
  };
};
