import GridRowItem from '../../components/grid-row-item';
import SectionWrapper from '../../components/section-wrapper';

import { Tag } from '@muroom/components';

interface Props {
  title: string;
}

export default function RoomInfoSection({ title }: Props) {
  return (
    <SectionWrapper title={title}>
      <>
        <GridRowItem
          title='방개수'
          sub1={
            <div className='flex items-center gap-x-1.5'>
              <span>15개</span>
              <Tag variant='blue'>3개 남음</Tag>
            </div>
          }
        />
        <div className='h-px bg-gray-200' />
      </>
    </SectionWrapper>
  );
}
