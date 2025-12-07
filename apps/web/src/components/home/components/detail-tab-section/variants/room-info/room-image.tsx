'use client';

import { useState } from 'react';

import Image from 'next/image';

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@muroom/components';
import { cn } from '@muroom/lib';
import VacantThumnail from '@muroom/ui/assets/vacant-thumnail.svg';
import { getFormattedDate } from '@muroom/util';

import OptionItem from '@/components/common/option-item';
import { StudioRoomItem } from '@/types/studio';

interface Props {
  selectedRoomId: number;
  setSelectedRoomId: React.Dispatch<React.SetStateAction<number>>;
  roomsData: StudioRoomItem[];
  blueprintImg?: string;
}

export default function RoomImage({
  selectedRoomId,
  setSelectedRoomId,
  roomsData,
  blueprintImg,
}: Props) {
  const [showRoom, setShowRoom] = useState('');

  return (
    <div className='flex flex-col gap-y-6'>
      <div className='scrollbar-hide flex flex-nowrap items-center gap-x-2 overflow-x-auto'>
        {roomsData
          ?.filter((r) => r.isAvailable === false)
          .map((room) => (
            <OptionItem
              key={room.roomId}
              item={room.roomName}
              selected={selectedRoomId === room.roomId}
              onClick={() => setSelectedRoomId(room.roomId)}
            />
          ))}

        <Dropdown
          value={showRoom}
          onValueChange={(val) => {
            setShowRoom(val);
            setSelectedRoomId(Number(val));
          }}
          placeholder='이미 계약됨'
          className='w-fit'
        >
          <DropdownTrigger variant='primary' size='m' className='h-9' />
          <DropdownContent className='max-h-[295px] overflow-y-auto'>
            {roomsData
              ?.filter((r) => r.isAvailable !== false)
              .map((room) => (
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
      </div>

      <div
        className={cn('rounded-4 size-full border border-gray-300', {
          'h-70 w-[335px]': !blueprintImg,
        })}
      >
        {blueprintImg ? (
          <Image
            src={blueprintImg}
            alt={'도면 이미지'}
            width={335}
            height={280}
            unoptimized
            className='object-cover'
          />
        ) : (
          <Image
            src={VacantThumnail}
            alt={'빈 이미지'}
            width={62}
            height={50}
            unoptimized
            className='rounded-4 object-cover'
          />
        )}
      </div>
    </div>
  );
}
