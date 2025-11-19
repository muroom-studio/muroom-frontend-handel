'use client';

import { useState } from 'react';

import {
  Button,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@muroom/components';
import Image from 'next/image';

export default function RoomImage() {
  const [showRoom, setShowRoom] = useState(''); // 드롭다운용 더미 room

  return (
    <div className='flex flex-col gap-y-6'>
      <div className='flex items-center gap-x-2'>
        <Button variant='outline' size='m'>
          Room1
        </Button>
        <Button variant='outline' size='m'>
          Room2
        </Button>
        <Dropdown
          value={showRoom}
          onValueChange={setShowRoom}
          placeholder='이미 계약됨'
          className='w-fit'
        >
          <DropdownTrigger variant='primary' size='m' />
          <DropdownContent className='max-h-[295px] overflow-y-auto'>
            {dummy_rooms.map((room) => (
              <DropdownItem key={room} value={room}>
                {room}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
      </div>
      <div className='rounded-4 border border-gray-300 px-[22px] py-[9px]'>
        <Image
          src={'https://placehold.co/292x262/555/fff?text=ROOM'}
          alt={'더미 이미지'}
          width={292}
          height={262}
          unoptimized
          className='object-cover'
        />
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
