'use client';

import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import {
  HelperMessage,
  Tag,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@muroom/components';
import { InfoIcon, ResetIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';
import { getFormattedDate } from '@muroom/util';

import { StudioRoomsInfo } from '@/types/studio';

import { useGalleryModal } from '../../components/gallery-modal';
import GridRowItem from '../../components/grid-row-item';
import SectionWrapper from '../../components/section-wrapper';
import RoomImage from './room-image';
import RoomImageGroup from './room-image-group';

interface Props {
  title: string;
  controller: ReturnType<typeof useGalleryModal>;
  roomData: StudioRoomsInfo;
  roomImgs: string[];
  blueprintImg?: string;
  instruments: string[];
}

export default function RoomInfoSection({
  title,
  controller,
  roomData,
  roomImgs,
  blueprintImg,
  instruments,
}: Props) {
  const [selectedRoomId, setSelectedRoomId] = useState(
    roomData.rooms?.[0]?.roomId || 0,
  );

  useEffect(() => {
    if (roomData.rooms && roomData.rooms.length > 0 && !selectedRoomId) {
      toast.error('최소한 하나의 방은 선택되어야 합니다.');

      setSelectedRoomId(roomData?.rooms?.[0]?.roomId || 0);
    }
  }, [selectedRoomId, roomData.rooms]);

  const [unit, setUnit] = useState<'cm' | 'mm'>('cm');

  const selectedRoom =
    roomData.rooms?.find((room) => room.roomId === selectedRoomId) ||
    roomData.rooms?.[0];

  const handleToggleUnit = () => {
    setUnit((prev) => (prev === 'cm' ? 'mm' : 'cm'));
  };

  return (
    <SectionWrapper title={title}>
      <>
        <GridRowItem
          title='방개수'
          sub1={
            <div className='flex items-center gap-x-1.5'>
              <span>{(roomData.rooms || []).length}개</span>
              <Tag variant='blue'>
                {roomData.rooms.filter((room) => room.isAvailable).length}개
                남음
              </Tag>
            </div>
          }
        />
        <div className='h-px bg-gray-200' />

        <GridRowItem
          title='금지악기'
          sub1={
            instruments.length > 0 ? (
              <div className='flex items-center gap-x-2'>
                {instruments.map((item) => (
                  <Tag key={item} variant='outline'>
                    {item}
                  </Tag>
                ))}
              </div>
            ) : (
              <Tag>없음</Tag>
            )
          }
        />
        <div className='h-px bg-gray-200' />

        {roomImgs.length > 0 && (
          <>
            <RoomImageGroup roomImgs={roomImgs} controller={controller} />
            <div className='h-px bg-gray-200' />
          </>
        )}

        <RoomImage
          selectedRoomId={selectedRoomId}
          setSelectedRoomId={setSelectedRoomId}
          roomsData={roomData.rooms}
          blueprintImg={blueprintImg}
        />

        <h3 className='text-base-exl-18-2 text-gray-900'>
          {selectedRoom?.roomName}
        </h3>

        <div className='h-px bg-gray-200' />
        <GridRowItem
          title='입주'
          sub1={
            selectedRoom?.availableAt ? (
              <span>
                {getFormattedDate(selectedRoom.availableAt, 'yy.MM.dd(E)') +
                  ' 입주가능'}
              </span>
            ) : (
              <span>문의필요</span>
            )
          }
        />

        <div className='h-px bg-gray-200' />

        <GridRowItem
          title='사이즈'
          sub1={
            selectedRoom?.widthMm && selectedRoom?.heightMm ? (
              <div className='flex-between'>
                <div className='flex items-center gap-x-1'>
                  <span>
                    {unit === 'cm'
                      ? selectedRoom.widthMm / 10
                      : selectedRoom.widthMm}{' '}
                    {unit} X{' '}
                    {unit === 'cm'
                      ? selectedRoom.heightMm / 10
                      : selectedRoom.heightMm}{' '}
                    {unit}
                  </span>
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
                  onClick={handleToggleUnit}
                  className={cn(
                    'flex-center rounded-4 text-base-m-14-1 inline-flex cursor-pointer gap-x-1 border border-gray-300 bg-white px-3 py-[5px]',
                    'hover:bg-gray-100 hover:opacity-80',
                  )}
                >
                  <ResetIcon className='size-4 rotate-90' />
                  <span>{unit === 'cm' ? 'mm' : 'cm'}</span>
                </div>
              </div>
            ) : (
              <HelperMessage variant='error'>도면확인이 필요해요</HelperMessage>
            )
          }
        />

        <div className='h-px bg-gray-200' />

        <GridRowItem
          title='가격'
          sub1={
            selectedRoom?.roomBasePrice
              ? `${selectedRoom.roomBasePrice / 10000}만원`
              : '문의 필요'
          }
        />
      </>
    </SectionWrapper>
  );
}
