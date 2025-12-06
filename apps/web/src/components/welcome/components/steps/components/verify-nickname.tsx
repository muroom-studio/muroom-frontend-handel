'use client';

import { useState } from 'react';

import {
  Button,
  HelperMessage,
  RequiredText,
  Spinner,
  TextField,
} from '@muroom/components';

import { useUserNicknameCheckQuery } from '@/hooks/api/user/useQueries';

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

type CheckStatus = 'idle' | 'success' | 'error';

export default function VerifyNickname({ value, setValue }: Props) {
  const [localValue, setLocalValue] = useState(value || '');
  const [checkStatus, setCheckStatus] = useState<CheckStatus>('idle');

  const { refetch, isLoading } = useUserNicknameCheckQuery(localValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);

    if (checkStatus !== 'idle') {
      setCheckStatus('idle');
      setValue('');
    }
  };

  const handleVerifyClick = async () => {
    if (!localValue) return;

    const result = await refetch();

    if (result.isSuccess && result.data) {
      if (result.data.available) {
        setCheckStatus('success');
        setValue(localValue);
      } else {
        setCheckStatus('error');
        setValue('');
      }
    }
  };

  const messageMap = {
    idle: { text: null, variant: 'default' },
    success: { text: '사용 가능한 닉네임입니다', variant: 'success' },
    error: { text: '이미 사용 중인 닉네임입니다', variant: 'error' },
  } as const;

  const currentMessage = messageMap[checkStatus];

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
        <div className='grid grid-cols-[244px_1fr] gap-x-3'>
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

        {checkStatus !== 'idle' && (
          <HelperMessage variant={currentMessage.variant} showIcon={true}>
            {currentMessage.text}
          </HelperMessage>
        )}
      </div>
    </div>
  );
}
