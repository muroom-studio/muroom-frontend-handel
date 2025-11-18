import { useState } from 'react';

import { toggleItemInArray } from '@muroom/util';

import { FilterWrapper, OptionItem } from '../components';

const FLOOR_OPTIONS = ['전체', '지상', '지하'];
const ACCOMMODATION_OPTIONS = ['전체', '가능', '불가능'];
const RESTROOM_OPTIONS = ['전체', '내부', '외부', '공용', '단독'];
const PARKING_OPTIONS = ['전체', '가능', '불가능'];
const INSURANCE_OPTIONS = ['전체', '가입', '미가입'];

export default function BuildingTypeFilter() {
  const [floorOption, setFloorOption] = useState('전체');
  const [accommodationOption, setAccommodationOption] = useState('전체');
  const [restroomOption, setRestroomOption] = useState(['전체']);
  const [parkingOption, setParkingOption] = useState('전체');
  const [insuranceOption, setInsuranceOption] = useState('전체');

  return (
    <FilterWrapper title='건물 유형'>
      <div className='flex flex-col gap-y-5'>
        <div className='flex flex-col'>
          <span className='text-base-l-16-2'>지층</span>

          <div className='mt-2 flex flex-wrap gap-2'>
            {FLOOR_OPTIONS.map((item) => (
              <OptionItem
                key={item}
                item={item}
                selected={floorOption === item}
                onClick={() => setFloorOption(item)}
              />
            ))}
          </div>
        </div>

        <div className='h-px bg-gray-300' />

        <div className='flex flex-col'>
          <span className='text-base-l-16-2'>숙식</span>

          <div className='mt-2 flex flex-wrap gap-2'>
            {ACCOMMODATION_OPTIONS.map((item) => (
              <OptionItem
                key={item}
                item={item}
                selected={accommodationOption === item}
                onClick={() => setAccommodationOption(item)}
              />
            ))}
          </div>
        </div>

        <div className='h-px bg-gray-300' />

        <div className='flex flex-col'>
          <span className='text-base-l-16-2'>화장실</span>

          <div className='mt-2 flex flex-wrap gap-2'>
            {RESTROOM_OPTIONS.map((item) => (
              <OptionItem
                key={item}
                item={item}
                selected={restroomOption.includes(item)}
                onClick={() =>
                  setRestroomOption((prev) => toggleItemInArray(prev, item))
                }
              />
            ))}
          </div>
        </div>

        <div className='h-px bg-gray-300' />

        <div className='flex flex-col'>
          <span className='text-base-l-16-2'>주차 가능</span>

          <div className='mt-2 flex flex-wrap gap-2'>
            {PARKING_OPTIONS.map((item) => (
              <OptionItem
                key={item}
                item={item}
                selected={parkingOption === item}
                onClick={() => setParkingOption(item)}
              />
            ))}
          </div>
        </div>

        <div className='h-px bg-gray-300' />

        <div className='flex flex-col'>
          <span className='text-base-l-16-2'>화재 보험</span>

          <div className='mt-2 flex flex-wrap gap-2'>
            {INSURANCE_OPTIONS.map((item) => (
              <OptionItem
                key={item}
                item={item}
                selected={insuranceOption === item}
                onClick={() => setInsuranceOption(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </FilterWrapper>
  );
}
