'use client';

import { updateArrayByToggle } from '@muroom/util';

import OptionItem from '@/components/common/option-item';
import { FilterOptionItem } from '@/types/studios';

import { FilterWrapper } from '../components';

// 🔥 변경된 Props 구조: 5가지 필터 상태를 모두 받습니다.
interface Props {
  floorTypes: string[] | null;
  restroomTypes: string[] | null;
  isParkingAvailable: boolean | null;
  isLodgingAvailable: boolean | null;
  hasFireInsurance: boolean | null;

  // 변경 시 부모에게 알릴 함수 (모든 필드 포함)
  onChange: (vals: {
    floorTypes: string[] | null;
    restroomTypes: string[] | null;
    isParkingAvailable: boolean | null;
    isLodgingAvailable: boolean | null;
    hasFireInsurance: boolean | null;
  }) => void;

  // 서버 데이터 (지층, 화장실)
  floorOptionsData?: FilterOptionItem[];
  restroomOptionsData?: FilterOptionItem[];
}

export default function BuildingTypeFilter({
  floorTypes,
  restroomTypes,
  isParkingAvailable,
  isLodgingAvailable,
  hasFireInsurance,
  onChange,
  floorOptionsData = [],
  restroomOptionsData = [],
}: Props) {
  const handleArrayToggle = (
    key: 'floorTypes' | 'restroomTypes',
    code: string | 'ALL',
    totalOptions: FilterOptionItem[],
  ) => {
    const currentList =
      key === 'floorTypes' ? floorTypes || [] : restroomTypes || [];
    let newList: string[] | null;

    if (code === 'ALL') {
      newList = null;
    } else {
      newList = updateArrayByToggle(currentList, code);
      if (newList.length === totalOptions.length || newList.length === 0) {
        newList = null;
      }
    }

    onChange({
      floorTypes: key === 'floorTypes' ? newList : floorTypes,
      restroomTypes: key === 'restroomTypes' ? newList : restroomTypes,
      isParkingAvailable,
      isLodgingAvailable,
      hasFireInsurance,
    });
  };

  const handleBooleanChange = (
    key: 'isParkingAvailable' | 'isLodgingAvailable' | 'hasFireInsurance',
    value: boolean | null,
  ) => {
    onChange({
      floorTypes,
      restroomTypes,
      isParkingAvailable:
        key === 'isParkingAvailable' ? value : isParkingAvailable,
      isLodgingAvailable:
        key === 'isLodgingAvailable' ? value : isLodgingAvailable,
      hasFireInsurance: key === 'hasFireInsurance' ? value : hasFireInsurance,
    });
  };

  const isArraySelected = (list: string[] | null, code: string | 'ALL') => {
    if (code === 'ALL') return !list || list.length === 0;
    return list?.includes(code) ?? false;
  };

  return (
    <FilterWrapper
      title='건물 유형'
      onReset={() =>
        onChange({
          floorTypes: null,
          restroomTypes: null,
          isParkingAvailable: null,
          isLodgingAvailable: null,
          hasFireInsurance: null,
        })
      }
    >
      <div className='flex flex-col gap-y-5'>
        <div className='flex flex-col'>
          <span className='text-base-l-16-2'>지층</span>
          <div className='mt-2 flex flex-wrap gap-2'>
            <OptionItem
              item='전체'
              selected={isArraySelected(floorTypes, 'ALL')}
              onClick={() =>
                handleArrayToggle('floorTypes', 'ALL', floorOptionsData)
              }
            />
            {floorOptionsData.map((opt) => (
              <OptionItem
                key={opt.code}
                item={opt.description}
                selected={isArraySelected(floorTypes, opt.code)}
                onClick={() =>
                  handleArrayToggle('floorTypes', opt.code, floorOptionsData)
                }
              />
            ))}
          </div>
        </div>

        <div className='h-px bg-gray-300' />

        {/* 2. 숙식 (Boolean) */}
        <div className='flex flex-col'>
          <span className='text-base-l-16-2'>숙식</span>
          <div className='mt-2 flex flex-wrap gap-2'>
            <OptionItem
              item='전체'
              selected={isLodgingAvailable === null}
              onClick={() => handleBooleanChange('isLodgingAvailable', null)}
            />
            <OptionItem
              item='가능'
              selected={isLodgingAvailable === true}
              onClick={() => handleBooleanChange('isLodgingAvailable', true)}
            />
            <OptionItem
              item='불가능'
              selected={isLodgingAvailable === false}
              onClick={() => handleBooleanChange('isLodgingAvailable', false)}
            />
          </div>
        </div>

        <div className='h-px bg-gray-300' />

        {/* 3. 화장실 (배열) */}
        <div className='flex flex-col'>
          <span className='text-base-l-16-2'>화장실</span>
          <div className='mt-2 flex flex-wrap gap-2'>
            <OptionItem
              item='전체'
              selected={isArraySelected(restroomTypes, 'ALL')}
              onClick={() =>
                handleArrayToggle('restroomTypes', 'ALL', restroomOptionsData)
              }
            />
            {restroomOptionsData.map((opt) => (
              <OptionItem
                key={opt.code}
                item={opt.description}
                selected={isArraySelected(restroomTypes, opt.code)}
                onClick={() =>
                  handleArrayToggle(
                    'restroomTypes',
                    opt.code,
                    restroomOptionsData,
                  )
                }
              />
            ))}
          </div>
        </div>

        <div className='h-px bg-gray-300' />

        {/* 4. 주차 가능 (Boolean) */}
        <div className='flex flex-col'>
          <span className='text-base-l-16-2'>주차 가능</span>
          <div className='mt-2 flex flex-wrap gap-2'>
            <OptionItem
              item='전체'
              selected={isParkingAvailable === null}
              onClick={() => handleBooleanChange('isParkingAvailable', null)}
            />
            <OptionItem
              item='가능'
              selected={isParkingAvailable === true}
              onClick={() => handleBooleanChange('isParkingAvailable', true)}
            />
            <OptionItem
              item='불가능'
              selected={isParkingAvailable === false}
              onClick={() => handleBooleanChange('isParkingAvailable', false)}
            />
          </div>
        </div>

        <div className='h-px bg-gray-300' />

        {/* 5. 화재 보험 (Boolean) */}
        <div className='flex flex-col'>
          <span className='text-base-l-16-2'>화재 보험</span>
          <div className='mt-2 flex flex-wrap gap-2'>
            <OptionItem
              item='전체'
              selected={hasFireInsurance === null}
              onClick={() => handleBooleanChange('hasFireInsurance', null)}
            />
            <OptionItem
              item='가입'
              selected={hasFireInsurance === true}
              onClick={() => handleBooleanChange('hasFireInsurance', true)}
            />
            <OptionItem
              item='미가입'
              selected={hasFireInsurance === false}
              onClick={() => handleBooleanChange('hasFireInsurance', false)}
            />
          </div>
        </div>
      </div>
    </FilterWrapper>
  );
}
