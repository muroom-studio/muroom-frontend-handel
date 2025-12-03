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

import OptionItem from '@/components/common/option-item';

interface Props {
  blueprintImg?: string;
}

export default function RoomImage({ blueprintImg }: Props) {
  const [showRoom, setShowRoom] = useState(''); // 드롭다운용 더미 room

  return (
    <div className='flex flex-col gap-y-6'>
      <div className='flex items-center gap-x-2'>
        <OptionItem item={'Room1'} selected={false} onClick={() => {}} />

        <OptionItem item={'Room2'} selected={false} onClick={() => {}} />

        <Dropdown
          value={showRoom}
          onValueChange={setShowRoom}
          placeholder='이미 계약됨'
          className='w-fit'
        >
          <DropdownTrigger variant='primary' size='m' className='h-9' />
          <DropdownContent className='max-h-[295px] overflow-y-auto'>
            {dummy_rooms.map((room) => (
              <DropdownItem key={room} value={room}>
                {room}
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

const dummy_rooms = [
  'Room3',
  'Room4',
  'Room5',
  'Room6',
  'Room7',
  'Room8',
  'Room9',
  'Room10',
  'Room11',
  'Room12',
  'Room13',
];
