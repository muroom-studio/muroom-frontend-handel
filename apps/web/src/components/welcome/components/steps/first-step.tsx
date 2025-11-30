'use client';

import { useEffect, useState } from 'react';

import { Checkbox } from '@muroom/components';
import { CheckSmallIcon, DownArrowIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

interface Props {
  onValidChange: (isValid: boolean) => void;
}

const TERMS = [
  {
    id: 'TERMS_OF_USE',
    label: '이용약관 동의',
    required: true,
  },
  {
    id: 'PRIVACY_COLLECTION',
    label: '개인정보 수집 및 이용동의',
    required: true,
  },
  {
    id: 'PRIVACY_PROCESSING',
    label: '개인정보 처리 위탁 동의',
    required: true,
  },
  {
    id: 'MARKETING_RECEIVE',
    label: '마케팅 수신 동의',
    required: false,
    subText: '이벤트 / 혜택 알림',
  },
] as const;

export default function JoinFirstStep({ onValidChange }: Props) {
  const [agreements, setAgreements] = useState<Record<string, boolean>>({
    TERMS_OF_USE: false,
    PRIVACY_COLLECTION: false,
    PRIVACY_PROCESSING: false,
    MARKETING_RECEIVE: false,
  });

  useEffect(() => {
    const requiredTerms = TERMS.filter((term) => term.required);

    const isAllRequiredChecked = requiredTerms.every(
      (term) => agreements[term.id],
    );

    onValidChange(isAllRequiredChecked);
  }, [agreements, onValidChange]);

  const handleToggle = (id: string) => {
    setAgreements((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isAllChecked = TERMS.every((term) => agreements[term.id]);

  const handleAllCheck = () => {
    const nextState = !isAllChecked;
    const nextAgreements = TERMS.reduce(
      (acc, term) => {
        acc[term.id] = nextState;
        return acc;
      },
      {} as Record<string, boolean>,
    );

    setAgreements(nextAgreements);
  };

  return (
    <div className='gap-y-15 flex h-full flex-col'>
      <div className='mb-10 flex flex-col gap-y-5'>
        <h1 className='text-title-m-26-2'>약관동의</h1>
        <h2 className='text-base-l-16-1 text-text1'>
          회원가입을 위한 서비스 이용약관에 동의해주세요
        </h2>
      </div>

      <div>
        <Checkbox
          checked={isAllChecked}
          onChange={handleAllCheck}
          label={<span className='text-base-l-16-2'>모두 동의합니다</span>}
        />
        <div className='my-6 h-px w-full bg-gray-200' />
        <div className='flex flex-col gap-y-6'>
          {TERMS.map((term) => (
            <div
              key={term.id}
              className='flex items-start justify-between gap-x-2'
            >
              <div className='flex w-full flex-col gap-y-1'>
                <Checkbox
                  checked={agreements[term.id]}
                  onChange={() => handleToggle(term.id)}
                  className='w-full'
                  label={
                    <div className='flex-between w-full'>
                      <span className='text-base-m-14-2 flex items-center'>
                        <span
                          className={cn(
                            'mr-1',
                            term.required
                              ? 'text-primary-400'
                              : 'text-gray-400',
                          )}
                        >
                          [{term.required ? '필수' : '선택'}]
                        </span>
                        <span>{term.label}</span>
                      </span>
                      <DownArrowIcon className='size-6 -rotate-90 text-gray-500' />
                    </div>
                  }
                />

                {'subText' in term && term.subText && (
                  <div className='flex items-center gap-x-1 pl-[34px]'>
                    <CheckSmallIcon className='size-2 text-gray-400' />
                    <p className='text-base-s-12-1'>{term.subText}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
