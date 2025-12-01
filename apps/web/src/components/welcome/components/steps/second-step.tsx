'use client';

import { TextField } from '@muroom/components';

import VerifyPhone from './components/verify-phone';

interface Props {
  onValidChange: (isValid: boolean) => void;
}

export default function JoinSecondStep({ onValidChange }: Props) {
  const handleVerified = (phone: string) => {
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
