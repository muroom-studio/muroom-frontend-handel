import {
  Tag,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@muroom/components';
import { InfoIcon, ResetIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import { StudioRoomsInfo } from '@/types/studio';

import GridRowItem from '../../components/grid-row-item';
import SectionWrapper from '../../components/section-wrapper';
import RoomImage from './room-image';
import RoomImageGroup from './room-image-group';

interface Props {
  title: string;
  data: StudioRoomsInfo;
}

export default function RoomInfoSection({ title, data }: Props) {
  console.log(data);

  return (
    <SectionWrapper title={title}>
      <>
        <GridRowItem
          title='방개수'
          sub1={
            <div className='flex items-center gap-x-1.5'>
              <span>{(data.rooms || []).length}개</span>
              <Tag variant='blue'>
                {data.rooms.filter((room) => room.isAvailable).length}개 남음
              </Tag>
            </div>
          }
        />
        <div className='h-px bg-gray-200' />

        <div className='flex flex-col gap-y-6'>
          <div className='text-base-l-16-2 w-[80px] flex-none whitespace-nowrap text-black'>
            금지악기
          </div>
          <div className='flex items-center gap-x-2'>
            {data.forbiddenInstruments.map((item) => (
              <Tag key={item} variant='outline'>
                {item}
              </Tag>
            ))}
          </div>
        </div>
        <div className='h-px bg-gray-200' />

        <RoomImageGroup />
        <div className='h-px bg-gray-200' />

        <RoomImage />

        <h3 className='text-base-exl-18-2 text-gray-900'>Room 1</h3>

        <div className='h-px bg-gray-200' />

        <GridRowItem
          title='사이즈'
          sub1={
            <div className='flex-between'>
              <div className='flex items-center gap-x-1'>
                <span>305 cm X 294 cm</span>
                <Tooltip side='top'>
                  <TooltipTrigger asChild>
                    <InfoIcon className='size-5 cursor-pointer text-gray-400' />
                  </TooltipTrigger>
                  <TooltipContent>
                    {`최대길이 X 최대폭으로\n 실제사이즈와 오차가 있을 수 있습니다.`}
                  </TooltipContent>
                </Tooltip>
              </div>
              <div
                aria-label='toggle-btn'
                className={cn(
                  'flex-center rounded-4 text-base-m-14-1 inline-flex cursor-pointer gap-x-1 border border-gray-300 bg-white px-3 py-[5px]',
                  'hover:bg-gray-100 hover:opacity-80',
                )}
              >
                <ResetIcon className='size-4 rotate-90' />
                <span>cm</span>
              </div>
            </div>
          }
        />

        <div className='h-px bg-gray-200' />

        <GridRowItem title='가격' sub1='15~20만원' />
      </>
    </SectionWrapper>
  );
}
