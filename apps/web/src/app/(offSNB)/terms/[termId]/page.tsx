// app/terms/[termId]/page.tsx (경로는 예시입니다)
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import TermsPage from '@/components/terms';
import { getTermsTermId } from '@/lib/term';

interface Props {
  params: Promise<{
    termId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { termId: idString } = await params;
  const termId = Number(idString);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['terms', termId],
    queryFn: () => getTermsTermId({ termId }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TermsPage termId={termId} />
    </HydrationBoundary>
  );
}
