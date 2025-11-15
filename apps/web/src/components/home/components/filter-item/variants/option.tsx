import { useState } from 'react';

import { Button } from '@muroom/components';

import { toggleItemInArray } from '@muroom/util';

import { FilterWrapper, OptionItem } from '../components';

const PUBLIC_OPTIONS = [
  '전체',
  '정수기',
  '전자레인지',
  '세탁기',
  '건조기',
  '냉장고',
  '샤워실',
  'CCTV',
  'WIFI',
  '간식',
  '신발장',
  '환기시설',
  '프린트',
  '커피머신',
];

const PRIVATE_OPTIONS = [
  '전체',
  '개인도어락',
  '창문',
  '공기청정기',
  '에어컨',
  '제습기',
  '조명시설',
  '바닥난방',
  '라디에이터',
  '전신거울',
  '앰프',
  '키보드',
  '드럼',
  '개인보관함',
  'LAN포트',
];

export default function OptionFilter() {
  const [publicOption, setPublicOption] = useState(['전체']);
  const [privateOption, setPrivateOption] = useState(['전체']);

  return (
    <FilterWrapper title='옵션'>
      <div className='flex flex-col gap-y-5'>
        <div className='flex flex-col'>
          <span className='text-base-l-16-2'>공용</span>

          <div className='mb-5 mt-4 flex flex-wrap gap-2'>
            {PUBLIC_OPTIONS.map((item) => (
              <OptionItem
                key={item}
                item={item}
                selected={publicOption.includes(item)}
                onClick={() =>
                  setPublicOption((prev) => toggleItemInArray(prev, item))
                }
              />
            ))}
          </div>

          <div className='flex justify-end'>
            <Button variant='secondary'>추가요청</Button>
          </div>
        </div>

        <div className='h-px bg-gray-300' />

        <div className='flex flex-col'>
          <span className='text-base-l-16-2'>개인</span>

          <div className='mb-5 mr-2 mt-4 flex flex-wrap gap-2'>
            {PRIVATE_OPTIONS.map((item) => (
              <OptionItem
                key={item}
                item={item}
                selected={privateOption.includes(item)}
                onClick={() =>
                  setPrivateOption((prev) => toggleItemInArray(prev, item))
                }
              />
            ))}
          </div>

          <div className='flex justify-end'>
            <Button variant='secondary'>추가요청</Button>
          </div>
        </div>
      </div>
    </FilterWrapper>
  );
}
