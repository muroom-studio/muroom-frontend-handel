'use client';

import parse from 'html-react-parser';

import { useTermsTermIdQuery } from '@/hooks/api/term/useQueries';

import PageWrapper from '../common/page-wrapper';

interface Props {
  termId: number;
}

export default function TermsPage({ termId }: Props) {
  const { data } = useTermsTermIdQuery({ termId });

  if (!data) {
    return <p>대충 약관 없다는 내용</p>;
  }

  return (
    <PageWrapper title={data.title}>
      <div className='w-full overflow-x-auto'>
        <div className='terms-content prose prose-sm prose-th:text-center prose-td:break-keep prose-img:m-0 max-w-none'>
          {parse(data.content)}
        </div>
      </div>
    </PageWrapper>
  );
}
