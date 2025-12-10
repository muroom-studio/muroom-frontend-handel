import { useQuery } from '@tanstack/react-query';

import { getTermsMusicianSignup, getTermsTermId } from '@/lib/term';
import { TermsTermIdRequestProps } from '@/types/term';

const useTermsMusicianSignupQuery = () => {
  return useQuery({
    queryKey: ['terms', 'musician', 'signup'],
    queryFn: getTermsMusicianSignup,
  });
};

const useTermsTermIdQuery = (params: TermsTermIdRequestProps) => {
  return useQuery({
    queryKey: ['terms', params.termId],
    queryFn: () => getTermsTermId(params),
    enabled: !!params,
  });
};

export { useTermsMusicianSignupQuery, useTermsTermIdQuery };
