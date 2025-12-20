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
  const termId = params.termId;
  return useQuery({
    queryKey: ['terms', termId],
    queryFn: () => getTermsTermId({ termId }),
  });
};

export { useTermsMusicianSignupQuery, useTermsTermIdQuery };
