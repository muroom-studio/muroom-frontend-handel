'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { Checkbox, Spinner } from '@muroom/components';
import { CheckSmallIcon, DownArrowIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import { useTermsMusicianSignupQuery } from '@/hooks/api/term/useQueries';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { useMusicianStore } from '@/store/useMusicianStore';

interface Props {
  onValidChange: (isValid: boolean) => void;
}

const AGE_CONSENT_ID = 0;

const arraysEqual = (a: number[], b: number[]) => {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((n1, n2) => n1 - n2);
  const sortedB = [...b].sort((n1, n2) => n1 - n2);
  return sortedA.every((val, idx) => val === sortedB[idx]);
};

export default function JoinFirstStep({ onValidChange }: Props) {
  const { isMobile } = useResponsiveLayout();
  const { data: termsData = [] } = useTermsMusicianSignupQuery();

  const { setRegisterDTO } = useMusicianStore();
  const prevTermIdsRef = useRef<number[]>([]);

  const terms = useMemo(() => {
    if (!termsData || termsData.length === 0) return [];

    const ageConsentTerm = {
      id: AGE_CONSENT_ID,
      label: '만 14세 이상입니다.',
      required: true,
      termCode: 'AGE_CONSENT',
      subText: undefined,
      url: '',
    };

    const mappedTerms = termsData.map((item) => ({
      id: item.termId,
      label: item.code.description,
      required: item.isMandatory,
      termCode: item.code.code,
      subText:
        item.code.code === 'MARKETING_RECEIVE'
          ? '이벤트 / 혜택 알림'
          : undefined,
      url: `/terms/${item.termId}`,
    }));

    return [ageConsentTerm, ...mappedTerms];
  }, [termsData]);

  const [agreements, setAgreements] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (terms.length === 0) return;

    const requiredTerms = terms.filter((term) => term.required);
    const isAllRequiredChecked = requiredTerms.every(
      (term) => agreements[term.id],
    );

    const agreedTermIds = Object.keys(agreements)
      .map(Number)
      .filter((id) => agreements[id])
      .filter((id) => id !== AGE_CONSENT_ID);

    const prevTermIds = prevTermIdsRef.current;

    if (!arraysEqual(prevTermIds, agreedTermIds)) {
      setRegisterDTO({
        termIds: agreedTermIds,
      });
      prevTermIdsRef.current = agreedTermIds;
    }

    onValidChange(isAllRequiredChecked);
  }, [agreements, onValidChange, terms, setRegisterDTO]);

  const handleToggle = (id: number) => {
    setAgreements((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isAllChecked =
    terms.length > 0 && terms.every((term) => agreements[term.id]);

  const handleAllCheck = () => {
    const nextState = !isAllChecked;
    const nextAgreements = terms.reduce(
      (acc, term) => {
        acc[term.id] = nextState;
        return acc;
      },
      {} as Record<number, boolean>,
    );
    setAgreements(nextAgreements);
  };

  // 상세 보기
  const detailTermHandler = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    if (!isMobile) {
      if (!url) return; // URL 없으면 동작 안 함
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    return console.log('상세약관 열기');
  };

  return (
    <div className='gap-y-15 flex h-full flex-col'>
      <div className='mb-10 flex flex-col gap-y-5'>
        <h1 className='text-title-m-26-2'>약관동의</h1>
        <h2 className='text-base-l-16-1 text-text1'>
          회원가입을 위한 서비스 이용약관에 동의해주세요
        </h2>
      </div>

      {terms.length > 0 ? (
        <div>
          <Checkbox
            checked={isAllChecked}
            onChange={handleAllCheck}
            label={<span className='text-base-l-16-2'>모두 동의합니다</span>}
          />
          <div className='my-6 h-px w-full bg-gray-200' />
          <div className='flex flex-col gap-y-6'>
            {terms.map((term) => (
              <div
                key={term.id}
                className='flex items-start justify-between gap-x-2'
              >
                <div className='flex w-full flex-col gap-y-1'>
                  <div className='flex-between w-full'>
                    <Checkbox
                      checked={!!agreements[term.id]}
                      onChange={() => handleToggle(term.id)}
                      className='w-full'
                      label={
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
                          <span>
                            {term.label} {term.url && '동의'}
                          </span>
                        </span>
                      }
                    />
                    {term.url && (
                      <DownArrowIcon
                        onClick={(e) => detailTermHandler(e, term.url!)}
                        className='size-6 -rotate-90 cursor-pointer text-gray-500'
                      />
                    )}
                  </div>
                  {term.subText && (
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
      ) : (
        <div className='flex-center h-32 w-full'>
          <Spinner variant='component' />
        </div>
      )}
    </div>
  );
}
