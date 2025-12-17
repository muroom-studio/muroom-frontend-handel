'use client';

import { useEffect, useState } from 'react';

import { HelperMessage, Tag } from '@muroom/components';
import { ResetIcon } from '@muroom/icons';
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
    roomData.rooms.find((room) => room.isAvailable === true)?.roomId,
  );

  const selectedRoom = roomData.rooms?.find(
    (room) => room.roomId === selectedRoomId,
  );

  const [unit, setUnit] = useState<'cm' | 'mm'>('mm');

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
              <div className='scrollbar-hide flex w-full items-center gap-x-2 overflow-x-auto'>
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

        {selectedRoom && (
          <>
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
                    <div
                      aria-label='toggle-btn'
                      onClick={handleToggleUnit}
                      className={cn(
                        'flex-center rounded-4 text-base-m-14-1 inline-flex shrink-0 cursor-pointer gap-x-1 border border-gray-300 bg-white px-3 py-[5px]',
                        'hover:bg-gray-100 hover:opacity-80',
                      )}
                    >
                      <ResetIcon className='size-4 rotate-90' />
                      <span className='w-6'>{unit === 'cm' ? 'mm' : 'cm'}</span>
                    </div>
                  </div>
                ) : (
                  <HelperMessage variant='error'>
                    도면확인이 필요해요
                  </HelperMessage>
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
        )}
      </>
    </SectionWrapper>
  );
}
