import { parseAsString, useQueryState } from 'nuqs';

export const useSearch = () => {
  return useQueryState(
    'keyword',
    parseAsString.withDefault('').withOptions({
      throttleMs: 300,
      shallow: true,
    }),
  );
};
