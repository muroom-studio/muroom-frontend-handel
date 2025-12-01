'use client';

import { useEffect, useState } from 'react';

import { Button } from '@muroom/components';
import { updateArrayByToggle } from '@muroom/util';

import OptionItem from '@/components/common/option-item';
import { FilterOptionItem } from '@/types/studios';

import { FilterWrapper } from '../components';

interface Props {
  value: string;
  onValueChange: (newValue: string) => void;
  publicOptions?: FilterOptionItem[];
  privateOptions?: FilterOptionItem[];
}

export default function OptionFilter({
  value,
  onValueChange,
  publicOptions = [],
  privateOptions = [],
}: Props) {
  const parseInitialValue = () => {
    try {
      if (!value) return { public: [], private: [] };
      return JSON.parse(value);
    } catch (e) {
      return { public: [], private: [] };
    }
  };

  const initialValues = parseInitialValue();

  const [publicCodes, setPublicCodes] = useState<string[]>(
    initialValues.public || [],
  );
  const [privateCodes, setPrivateCodes] = useState<string[]>(
    initialValues.private || [],
  );

  useEffect(() => {
    const newValue = JSON.stringify({
      public: publicCodes,
      private: privateCodes,
    });

    if (value !== newValue) {
      onValueChange(newValue);
    }
  }, [publicCodes, privateCodes, onValueChange, value]);

  const handleToggle = (type: 'public' | 'private', code: string | 'ALL') => {
    const setCodes = type === 'public' ? setPublicCodes : setPrivateCodes;

    if (code === 'ALL') {
      setCodes([]);
    } else {
      setCodes((prev) => updateArrayByToggle(prev, code));
    }
  };

  const isSelected = (type: 'public' | 'private', code: string | 'ALL') => {
    const targetCodes = type === 'public' ? publicCodes : privateCodes;
    if (code === 'ALL') return targetCodes.length === 0;
    return targetCodes.includes(code);
  };

  return (
    <FilterWrapper title='옵션'>
      <div className='flex flex-col gap-y-5'>
        {/* --- 공용 옵션 섹션 --- */}
        <div className='flex flex-col'>
          <span className='text-base-l-16-2'>공용</span>

          <div className='mb-5 mt-4 flex flex-wrap gap-2'>
            <OptionItem
              item='전체'
              selected={isSelected('public', 'ALL')}
              onClick={() => handleToggle('public', 'ALL')}
            />

            {publicOptions.map((opt) => (
              <OptionItem
                key={opt.code}
                item={opt.description}
                selected={isSelected('public', opt.code)}
                onClick={() => handleToggle('public', opt.code)}
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
            <OptionItem
              item='전체'
              selected={isSelected('private', 'ALL')}
              onClick={() => handleToggle('private', 'ALL')}
            />

            {privateOptions.map((opt) => (
              <OptionItem
                key={opt.code}
                item={opt.description}
                selected={isSelected('private', opt.code)}
                onClick={() => handleToggle('private', opt.code)}
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
