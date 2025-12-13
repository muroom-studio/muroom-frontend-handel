'use client';

import Image from 'next/image';

// 경로에 맞게 수정해주세요
import VacantThumnail from '@muroom/ui/assets/vacant-thumnail.svg';

import { useGalleryModal } from '../gallery-modal';

interface Props {
  roomImgs: string[];
  controller: ReturnType<typeof useGalleryModal>;
}

export default function MainImageSection({ roomImgs, controller }: Props) {
  // 이미지가 없을 때
  if (!roomImgs || roomImgs.length === 0) {
    return (
      // ⭐️ 수정: w-[376px] -> w-full
      <div className='flex-center rounded-4 h-[250px] w-full border border-gray-300 bg-gray-50'>
        <Image src={VacantThumnail} alt='빈 이미지' width={62} height={50} />
      </div>
    );
  }

  const totalCount = roomImgs.length;
  const extraCount = totalCount > 3 ? totalCount - 3 : 0;

  return (
    <>
      {/* CASE 1: 이미지 1개 -> 클릭 시 0번 인덱스 */}
      {totalCount === 1 && (
        <div
          // ⭐️ 수정: w-[376px] -> w-full
          className='rounded-4 relative h-[250px] w-full cursor-pointer overflow-hidden'
          onClick={() => controller.openSingle('main', 0)}
        >
          <Image
            src={roomImgs[0] as string}
            alt='room-img-0'
            fill
            className='object-cover transition-opacity hover:opacity-90'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </div>
      )}

      {/* CASE 2: 이미지 2개 -> 클릭한 idx로 이동 */}
      {totalCount === 2 && (
        // ⭐️ 수정: w-[376px] -> w-full
        <div className='rounded-4 grid h-[250px] w-full grid-cols-2 overflow-hidden'>
          {roomImgs.map((img, idx) => (
            <div
              key={idx}
              className='relative h-full w-full cursor-pointer'
              onClick={() => controller.openSingle('main', idx)}
            >
              <Image
                src={img}
                alt={`room-img-${idx}`}
                fill
                className='object-cover transition-opacity hover:opacity-90'
                sizes='50vw'
              />
            </div>
          ))}
        </div>
      )}

      {/* CASE 3: 이미지 3개 이상 */}
      {totalCount >= 3 && (
        // ⭐️ 수정: w-[376px] -> w-full
        <div className='rounded-4 grid h-[250px] w-full grid-cols-3 grid-rows-2 overflow-hidden'>
          <div
            className='relative col-span-2 row-span-2 cursor-pointer'
            onClick={() => controller.openSingle('main', 0)}
          >
            <Image
              src={roomImgs[0] as string}
              alt='room-main'
              fill
              className='object-cover transition-opacity hover:opacity-90'
              sizes='66vw'
            />
          </div>

          {/* 2. 두 번째 (우측 상단) -> index 1 */}
          <div
            className='relative col-span-1 row-span-1 cursor-pointer'
            onClick={() => controller.openSingle('main', 1)}
          >
            <Image
              src={roomImgs[1] as string}
              alt='room-sub-1'
              fill
              className='object-cover transition-opacity hover:opacity-90'
              sizes='33vw'
            />
          </div>

          {/* 3. 세 번째 (우측 하단) -> index 2 */}
          <div
            className='relative col-span-1 row-span-1 cursor-pointer'
            onClick={() => controller.openSingle('main', 2)}
          >
            <Image
              src={roomImgs[2] as string}
              alt='room-sub-2'
              fill
              className='object-cover transition-opacity hover:opacity-90'
              sizes='33vw'
            />

            {/* +N 오버레이: 클릭 시 그룹 뷰(전체보기) */}
            {extraCount > 0 && (
              <div
                className='absolute inset-0 flex items-center justify-center bg-black/50 transition-colors hover:bg-black/60'
                onClick={(e) => {
                  e.stopPropagation();
                  controller.openGroup();
                }}
              >
                <span className='text-lg font-medium text-white'>
                  +{extraCount}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
