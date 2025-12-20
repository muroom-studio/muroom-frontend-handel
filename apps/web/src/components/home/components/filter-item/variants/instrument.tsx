'use client';

import { updateArrayByToggle } from '@muroom/util';

import OptionItem from '@/components/common/option-item';
import { FilterOptionItem } from '@/types/studios';

import { FilterWrapper } from '../components';

interface Props {
  forbiddenInstrumentCodes: string[] | null;
  onChange: (vals: { forbiddenInstrumentCodes: string[] | null }) => void;
  instrumentOptions?: FilterOptionItem[];
}

export default function InstrumentFilter({
  forbiddenInstrumentCodes,
  onChange,
  instrumentOptions = [],
}: Props) {
  const isSelected = (code: string | 'ALL') => {
    if (code === 'ALL') {
      return !forbiddenInstrumentCodes || forbiddenInstrumentCodes.length === 0;
    }
    return forbiddenInstrumentCodes?.includes(code) ?? false;
  };

  const handleToggle = (code: string | 'ALL') => {
    const currentList = forbiddenInstrumentCodes || [];
    let newList: string[] | null;

    if (code === 'ALL') {
      newList = null;
    } else {
      newList = updateArrayByToggle(currentList, code);
      if (newList.length === instrumentOptions.length || newList.length === 0) {
        newList = null;
      }
    }

    onChange({ forbiddenInstrumentCodes: newList });
  };

  return (
    <FilterWrapper
      title='악기'
      titleChildren={
        <span className='text-base-m-14-1 text-gray-500'>사용 가능 악기</span>
      }
      onReset={() => onChange({ forbiddenInstrumentCodes: null })}
    >
      <div className='flex flex-wrap gap-2'>
        <OptionItem
          item='전체'
          selected={isSelected('ALL')}
          onClick={() => handleToggle('ALL')}
        />

        {/* 서버 데이터 매핑 */}
        {instrumentOptions.map((opt) => (
          <OptionItem
            key={opt.code}
            item={opt.description} // 화면 표시 (예: 보컬)
            selected={isSelected(opt.code)} // 코드 확인
            onClick={() => handleToggle(opt.code)} // 코드 저장
          />
        ))}
      </div>
      {/* <div className='flex justify-end'>
        <Button variant='secondary'>추가요청</Button>
      </div> */}
    </FilterWrapper>
  );
}
