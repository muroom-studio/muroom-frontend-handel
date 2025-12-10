'use client';

import parse from 'html-react-parser';

import { PageWrapper } from '@muroom/components';

import { useTermsTermIdQuery } from '@/hooks/api/term/useQueries';

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
      <div className='terms-content'>{parse(data.content)}</div>
    </PageWrapper>
  );
}
