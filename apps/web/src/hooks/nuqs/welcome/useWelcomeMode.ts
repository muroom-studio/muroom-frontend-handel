'use client';

import { parseAsBoolean, useQueryState } from 'nuqs';

export const useWelcomeMode = () => {
  const [isJoin, setJoin] = useQueryState(
    'join',
    parseAsBoolean.withDefault(false),
  );

  const toJoin = () => setJoin(true);
  const toLogin = () => setJoin(false);

  return {
    isJoin,
    setJoin,
    toJoin,
    toLogin,
  };
};
