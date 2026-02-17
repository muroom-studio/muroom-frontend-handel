import {
  TermsMusicianSignupResponseProps,
  TermsTermIdRequestProps,
  TermsTermIdResponseProps,
} from '@/types/term';
import { customFetch } from '@/utils/customFetch';

// 회원가입 -> 약관 목록 불러오기
export const getTermsMusicianSignup = async () => {
  const responseData = await customFetch<TermsMusicianSignupResponseProps>(
    '/terms/musician/signup',
    {
      method: 'GET',
    },
  );

  return responseData;
};

// 약관 상세 불러오기
export const getTermsTermId = async (params: TermsTermIdRequestProps) => {
  const responseData = await customFetch<TermsTermIdResponseProps>(
    `/terms/${params.termId}`,
    {
      method: 'GET',
    },
  );

  return responseData;
};
