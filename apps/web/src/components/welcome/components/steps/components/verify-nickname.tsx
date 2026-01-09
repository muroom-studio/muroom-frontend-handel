'use client';

import { useState } from 'react';

import {
  Button,
  HelperMessage,
  RequiredText,
  Spinner,
  TextField,
} from '@muroom/components';

import { useMusiciansNicknameCheckQuery } from '@/hooks/api/musicians/useQueries';

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

type CheckStatus = 'idle' | 'success' | 'error';

export default function VerifyNickname({ value, setValue }: Props) {
  const [localValue, setLocalValue] = useState(value || '');

  const [checkStatus, setCheckStatus] = useState<CheckStatus>('idle');

  const { refetch, isLoading } = useMusiciansNicknameCheckQuery({
    nickname: localValue,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    const sanitizedValue = rawValue.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]/g, '');

    const finalValue = sanitizedValue.slice(0, 20);

    setLocalValue(finalValue);

    if (checkStatus !== 'idle') {
      setCheckStatus('idle');
      setValue('');
    }
  };

  const handleVerifyClick = async () => {
    if (!localValue) return;

    const { data: isAvailable } = await refetch();

    if (isAvailable) {
      setCheckStatus('success');
      setValue(localValue);
    } else {
      setCheckStatus('error');
      setValue('');
    }
  };

  const getHelperMessageInfo = () => {
    if (checkStatus === 'success') {
      return {
        text: '사용 가능한 닉네임입니다',
        variant: 'success' as const,
        showIcon: true,
      };
    }
    if (checkStatus === 'error') {
      return {
        text: '이미 사용 중인 닉네임입니다',
        variant: 'error' as const,
        showIcon: false,
      };
    }

    return null;
  };

  const helperInfo = getHelperMessageInfo();

  return (
    <div className='flex flex-col gap-y-[9px]'>
      <div className='flex-between'>
        <RequiredText htmlFor='nickname' required>
          닉네임
        </RequiredText>
        <div className='text-base-l-16-1 flex items-center'>
          <span className='text-gray-600'>{localValue.length}</span>
          <span className='text-gray-400'>/20</span>
        </div>
      </div>
      <div className='flex flex-col gap-y-2'>
        <div className='relative grid grid-cols-[244px_1fr] gap-x-3'>
          <TextField
            id='nickname'
            name='nickname'
            value={localValue}
            onChange={handleChange}
            onClear={() => {
              setLocalValue('');
              setValue('');
              setCheckStatus('idle');
            }}
            placeholder='닉네임을 입력해주세요'
            maxLength={20}
          />
          <Button
            type='button'
            variant='primary'
            size='l'
            disabled={localValue === '' || isLoading}
            onClick={handleVerifyClick}
          >
            {isLoading ? <Spinner variant='component' /> : '확인하기'}
          </Button>
        </div>

        {helperInfo && (
          <HelperMessage
            variant={helperInfo.variant}
            showIcon={helperInfo.showIcon}
          >
            {helperInfo.text}
          </HelperMessage>
        )}
      </div>
    </div>
  );
}
