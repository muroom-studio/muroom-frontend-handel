'use client';

import { useState } from 'react';

import Image from 'next/image';

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  ModalBottomSheet,
} from '@muroom/components';
import { DownArrowIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';
import VacantThumnail from '@muroom/ui/assets/vacant-thumnail.svg';
import { getFormattedDate } from '@muroom/util';

import OptionItem from '@/components/common/option-item';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { StudioRoomItem } from '@/types/studio';

interface Props {
  selectedRoomId?: number;
  setSelectedRoomId: React.Dispatch<React.SetStateAction<number | undefined>>;
  roomsData: StudioRoomItem[];
  blueprintImg?: string;
}

export default function RoomImage({
  selectedRoomId,
  setSelectedRoomId,
  roomsData,
  blueprintImg,
}: Props) {
  const { isMobile } = useResponsiveLayout();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const availableRooms = roomsData?.filter((r) => r.isAvailable === true) || [];

  const unAvailableRooms =
    roomsData?.filter((r) => r.isAvailable !== true) || [];

  const isUnAvailableSelected = unAvailableRooms.some(
    (r) => r.roomId === selectedRoomId,
  );

  const selectedRoom = unAvailableRooms.find(
    (room) => String(room.roomId) === String(selectedRoomId),
  );

  // 라벨 텍스트 결정
  const currentLabel = selectedRoom ? selectedRoom.roomName : '이미 계약됨';

  return (
    <div className='flex flex-col gap-y-6'>
      <div className='scrollbar-hide flex flex-nowrap items-center gap-x-2 overflow-x-auto'>
        {/* 계약 완료된 방 리스트 (변동 없음) */}
        {availableRooms.map((room) => (
          <OptionItem
            key={room.roomId}
            item={room.roomName}
            selected={selectedRoomId === room.roomId}
            onClick={() => setSelectedRoomId(room.roomId)}
          />
        ))}

        {/* 입실 완료된 방 리스트 (데스크탑/모바일 분기) */}
        {unAvailableRooms.length > 0 && (
          <>
            {isMobile ? (
              <>
                <button
                  type='button'
                  onClick={() => setIsSheetOpen(true)}
                  className={cn(
                    'flex-center rounded-4 group h-9 max-w-[202px] shrink-0 cursor-pointer gap-x-1 truncate border border-gray-300 bg-white px-3 py-[9px] transition-all',
                    'hover:bg-gray-50',
                    {
                      'border-primary-400 bg-primary-50 !text-primary-600':
                        isUnAvailableSelected, // 선택되었을 때 스타일
                    },
                  )}
                >
                  <span className='text-base-m-14-1'>{currentLabel}</span>
                  <DownArrowIcon
                    className={cn(
                      'size-5 transition-transform duration-200',
                      isSheetOpen && 'rotate-180',
                    )}
                  />
                </button>

                <ModalBottomSheet
                  isOpen={isSheetOpen}
                  onClose={() => setIsSheetOpen(false)}
                  className='pb-safe' // 하단 안전 영역 확보
                >
                  <div className='flex flex-col'>
                    {unAvailableRooms.map((room) => {
                      const isSelected = selectedRoomId === room.roomId;
                      return (
                        <button
                          key={room.roomId}
                          type='button'
                          onClick={() => {
                            setSelectedRoomId(room.roomId);
                            setIsSheetOpen(false);
                          }}
                          className={cn(
                            'flex w-full items-center justify-between border-b border-gray-100 py-4 text-left transition-colors last:border-none hover:bg-gray-50',
                            isSelected && 'text-primary-600 font-medium',
                          )}
                        >
                          <span className='text-base-l-16-1'>
                            {room.roomName}
                          </span>
                          {room.availableAt && (
                            <span
                              className={cn(
                                'text-base-s-12-1 text-gray-500',
                                isSelected && 'text-primary-600',
                              )}
                            >
                              {getFormattedDate(
                                room.availableAt,
                                'yy.MM.dd(E)',
                              )}{' '}
                              입주가능
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </ModalBottomSheet>
              </>
            ) : (
              <Dropdown
                value={isUnAvailableSelected ? String(selectedRoomId) : ''}
                label={currentLabel}
                onValueChange={(val) => {
                  setSelectedRoomId(Number(val));
                }}
                placeholder='이미 계약됨'
                className='w-fit'
              >
                <DropdownTrigger variant='primary' size='m' className='h-9' />
                <DropdownContent className='max-h-[295px] overflow-y-auto'>
                  {unAvailableRooms.map((room) => (
                    <DropdownItem
                      key={room.roomId}
                      value={`${room.roomId}`}
                      className='flex items-center gap-x-2'
                    >
                      <span>{room.roomName}</span>
                      {room.availableAt && (
                        <span className='text-base-s-12-1 text-primary-600'>
                          {`${getFormattedDate(room.availableAt, 'yy.MM.dd(E)')} 입주가능`}
                        </span>
                      )}
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>
            )}
          </>
        )}
      </div>
      <div
        className={cn(
          'rounded-4 relative overflow-hidden border border-gray-300',
          'aspect-335/280 w-full',
          'min-[1080px]:aspect-auto min-[1080px]:h-[280px] min-[1080px]:w-[335px]',
        )}
      >
        {blueprintImg ? (
          <Image
            src={blueprintImg}
            alt={'도면 이미지'}
            fill
            className='object-cover'
            sizes='(max-width: 1079px) 100vw, 335px'
          />
        ) : (
          <div className='flex size-full items-center justify-center bg-gray-100'>
            <Image
              src={VacantThumnail}
              alt={'빈 이미지'}
              width={62}
              height={50}
              className='object-contain'
            />
          </div>
        )}
      </div>
    </div>
  );
}
