'use client';

import { useEffect, useRef, useState } from 'react';

import { Button, OtpGroup, RequiredText, TextField } from '@muroom/components';
import { CheckSmallIcon } from '@muroom/icons';

import { useUserSmsAuthMutation } from '@/hooks/api/user/useMutation';

interface Props {
  id?: string;
  name?: string;
  onVerified: (phoneNumber: string) => void;
}

export default function VerifyPhone({
  id = 'phoneNumber',
  name = 'phoneNumber',
  onVerified,
}: Props) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isVerified, setIsVerified] = useState(false);

  const { mutateAsync: authMutateAsync } = useUserSmsAuthMutation();

  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isVerified) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    if (isSent && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSent, timeLeft, isVerified]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  const handleSend = () => {
    if (!phoneNumber) return;

    authMutateAsync(
      { phone: phoneNumber },
      {
        onSuccess: (data) => console.log(data),
      },
    );

    setIsSent(true);
    setIsVerified(false);
    setTimeLeft(180);
    setOtp(Array(6).fill(''));
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 6) return;

    // TODO: 서버 인증 API 호출
    console.log(`Verifying code: ${code}`);

    setIsVerified(true);
    onVerified(phoneNumber);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    let formattedValue = '';

    if (rawValue.length <= 3) formattedValue = rawValue;
    else if (rawValue.length <= 7)
      formattedValue = `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`;
    else
      formattedValue = `${rawValue.slice(0, 3)}-${rawValue.slice(3, 7)}-${rawValue.slice(7, 11)}`;

    setPhoneNumber(formattedValue);
  };

  return (
    <div className='flex flex-col gap-y-3'>
      <div className='flex flex-col gap-y-[9px]'>
        <RequiredText htmlFor={id}>전화번호</RequiredText>
        <div className='grid grid-cols-[244px_1fr] gap-x-3'>
          <TextField
            id={id}
            name={name}
            placeholder='번호를 입력해주세요'
            value={phoneNumber}
            onChange={handlePhoneChange}
            disabled={isSent}
            maxLength={13}
            inputMode='numeric'
          />
          <Button
            type='button'
            variant='outline'
            size='l'
            onClick={handleSend}
            disabled={!phoneNumber}
          >
            {isSent ? '재전송' : '인증요청'}
          </Button>
        </div>
      </div>

      {isSent && (
        <div className='flex flex-col gap-y-2'>
          <div className='grid grid-cols-[244px_1fr] gap-3'>
            <div className={isVerified ? 'pointer-events-none opacity-50' : ''}>
              <OtpGroup length={6} value={otp} onChange={setOtp} />
            </div>

            <Button
              type='button'
              variant={'outline'}
              size='l'
              onClick={handleVerify}
              disabled={otp.some((v) => !v) || isVerified} // 다 안 채웠거나 이미 인증했으면 비활성화
            >
              확인하기
            </Button>
          </div>

          <div className='flex justify-between px-1'>
            {isVerified ? (
              <div className='text-base-s-12-2 flex items-center gap-x-1 text-blue-500'>
                <CheckSmallIcon className='size-3' />
                <span>사용가능한 번호입니다</span>
              </div>
            ) : (
              <span className='text-base-s-12-2 text-blue-400'>
                인증번호를 발송했습니다
              </span>
            )}

            {!isVerified && (
              <div className='flex items-center gap-x-1'>
                <span className='text-base-s-12-1 text-gray-600'>남은시간</span>
                <span className='text-base-s-12-2 text-red-400'>
                  {formatTime(timeLeft)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
