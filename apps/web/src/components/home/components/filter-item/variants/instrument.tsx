import { useState } from 'react';

import { Button } from '@muroom/components';

import { FilterWrapper, OptionItem } from '../components';

const INSTRUMENT_OPTIONS = [
  '전체',
  '보컬',
  '기타',
  '베이스',
  '키보드',
  '드럼',
  '관악',
  '목관',
  '현악',
  '성악',
  '국악',
];

export default function InstrumentFilter() {
  const [instrumentOption, setInstrumentOption] = useState('전체');

  return (
    <FilterWrapper
      title='악기'
      titleChildren={
        <span className='text-base-m-14-1 text-gray-500'>높은 이용빈도</span>
      }
    >
      <div className='flex flex-wrap gap-2'>
        {INSTRUMENT_OPTIONS.map((item) => (
          <OptionItem
            key={item}
            item={item}
            selected={instrumentOption === item}
            onClick={() => setInstrumentOption(item)}
          />
        ))}
      </div>
      <div className='flex justify-end'>
        <Button variant='secondary'>추가요청</Button>
      </div>
    </FilterWrapper>
  );
}
