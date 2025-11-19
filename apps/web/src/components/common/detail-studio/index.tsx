'use client';

import DetailTabSection from '@/components/home/components/detail-tab-section';
import { Studio } from '@/app/types/studio';

interface Props {
  detailStudio: Studio;
}

export default function CommonDetailStudio({ detailStudio }: Props) {
  return (
    <div className='shadow-detail flex h-full flex-col border-r border-r-gray-300'>
      <DetailTabSection detailStudio={detailStudio} />
    </div>
  );
}
