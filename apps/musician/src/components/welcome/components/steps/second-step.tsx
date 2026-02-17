'use client';

import { useState } from 'react';

import { TextField } from '@muroom/components';

import { useMusicianStore } from '@/store/useMusicianStore';

import VerifyPhone from './components/verify-phone';

interface Props {
  onValidChange: (isValid: boolean) => void;
}

export default function JoinSecondStep({ onValidChange }: Props) {
  const { setRegisterDTO } = useMusicianStore();

  const [name, setName] = useState('');

  const handleVerified = (token: string) => {
    setRegisterDTO({
      name: name,
      smsVerifyToken: token,
    });
    onValidChange(true);
  };

  return (
    <div className='gap-y-15 flex h-full flex-col'>
      <h1 className='text-title-m-26-2'>본인인증</h1>
      <div className='flex flex-col gap-y-8'>
        <TextField
          label='이름'
          id='name'
          name='name'
          placeholder='이름을 입력해주세요'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          onClear={() => setName('')}
        />
        <VerifyPhone
          id='phoneNumber'
          name='phoneNumber'
          onVerified={handleVerified}
        />
      </div>
    </div>
  );
}
