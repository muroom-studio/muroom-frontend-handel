'use client';

import { Button } from '@muroom/components';
import { updateArrayByToggle } from '@muroom/util';

import OptionItem from '@/components/common/option-item';
import { FilterOptionItem } from '@/types/studios';

import { FilterWrapper } from '../components';

interface Props {
  commonOptionCodes: string[] | null;
  individualOptionCodes: string[] | null;
  onChange: (vals: {
    commonOptionCodes: string[] | null;
    individualOptionCodes: string[] | null;
  }) => void;
  publicOptions?: FilterOptionItem[];
  privateOptions?: FilterOptionItem[];
}

export default function OptionFilter({
  commonOptionCodes,
  individualOptionCodes,
  onChange,
  publicOptions = [],
  privateOptions = [],
}: Props) {
  const isSelected = (type: 'common' | 'individual', code: string | 'ALL') => {
    const targetList =
      type === 'common' ? commonOptionCodes : individualOptionCodes;

    if (code === 'ALL') {
      return !targetList || targetList.length === 0;
    }
    return targetList?.includes(code) ?? false;
  };

  const handleToggle = (
    type: 'common' | 'individual',
    code: string | 'ALL',
  ) => {
    const currentList =
      type === 'common' ? commonOptionCodes || [] : individualOptionCodes || [];
    const totalOptions = type === 'common' ? publicOptions : privateOptions;

    let newList: string[] | null;

    if (code === 'ALL') {
      newList = null;
    } else {
      newList = updateArrayByToggle(currentList, code);

      if (newList.length === totalOptions.length || newList.length === 0) {
        newList = null;
      }
    }

    if (type === 'common') {
      onChange({
        commonOptionCodes: newList,
        individualOptionCodes,
      });
    } else {
      onChange({
        commonOptionCodes,
        individualOptionCodes: newList,
      });
    }
  };

  return (
    <FilterWrapper
      title='옵션'
      onReset={() =>
        onChange({
          commonOptionCodes: null,
          individualOptionCodes: null,
        })
      }
    >
      <div className='flex flex-col gap-y-5'>
        <div className='flex flex-col'>
          <span className='text-base-l-16-2'>공용</span>

          <div className='mb-5 mt-4 flex flex-wrap gap-2'>
            {/* 전체 버튼 */}
            <OptionItem
              item='전체'
              selected={isSelected('common', 'ALL')}
              onClick={() => handleToggle('common', 'ALL')}
            />

            {/* 서버 데이터 매핑 */}
            {publicOptions.map((opt) => (
              <OptionItem
                key={opt.code}
                item={opt.description} // 화면엔 description (예: 정수기)
                selected={isSelected('common', opt.code)} // 확인은 code
                onClick={() => handleToggle('common', opt.code)} // 저장도 code
              />
            ))}
          </div>

          {/* <div className='flex justify-end'>
            <Button variant='secondary'>추가요청</Button>
          </div> */}
        </div>

        <div className='h-px bg-gray-300' />

        {/* --- 개인 옵션 섹션 --- */}
        <div className='flex flex-col'>
          <span className='text-base-l-16-2'>개인</span>

          <div className='mb-5 mr-2 mt-4 flex flex-wrap gap-2'>
            {/* 전체 버튼 */}
            <OptionItem
              item='전체'
              selected={isSelected('individual', 'ALL')}
              onClick={() => handleToggle('individual', 'ALL')}
            />

            {/* 서버 데이터 매핑 */}
            {privateOptions.map((opt) => (
              <OptionItem
                key={opt.code}
                item={opt.description}
                selected={isSelected('individual', opt.code)}
                onClick={() => handleToggle('individual', opt.code)}
              />
            ))}
          </div>

          {/* <div className='flex justify-end'>
            <Button variant='secondary'>추가요청</Button>
          </div> */}
        </div>
      </div>
    </FilterWrapper>
  );
}
