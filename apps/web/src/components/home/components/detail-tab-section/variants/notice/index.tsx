import { Tag } from '@muroom/components';

import { StudioNotice } from '@/types/studio';

import GridRowItem from '../../components/grid-row-item';
import SectionWrapper from '../../components/section-wrapper';
import ExpandableText from './expanded-btn';

interface Props {
  title: string;
  data: StudioNotice;
}

export default function NoticeSection({ title, data }: Props) {
  return (
    <SectionWrapper title={title}>
      <>
        <div className='flex items-center gap-x-2'>
          <Tag variant='owner'>사장님</Tag>
          <span className='text-base-m-14-1 text-black'>
            {data.ownerNickname}
          </span>
        </div>
        <GridRowItem title='운영' sub1={`${data.experienceYears}년`} />
        <div className='h-px bg-gray-200' />
        <GridRowItem
          title='본인인증'
          sub1={
            data.isIdentityVerified ? (
              <Tag variant='blue'>인증완료</Tag>
            ) : (
              <Tag variant='neutral'>미완료</Tag>
            )
          }
        />
        <div className='h-px bg-gray-200' />
        <ExpandableText message={data.introduction} />
      </>
    </SectionWrapper>
  );
}
