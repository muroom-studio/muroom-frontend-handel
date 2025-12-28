'use client';

import { useParams } from 'next/navigation';

import StudioBoastsDetailPage from '@/components/studio-boasts/[id]';

export default function Page() {
  const studioBoastsId = useParams().id as string;

  return <StudioBoastsDetailPage targetedId={studioBoastsId} />;
}
