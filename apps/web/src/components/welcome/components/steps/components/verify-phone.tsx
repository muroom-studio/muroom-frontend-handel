'use client';

import { useEffect, useRef, useState } from 'react';

import {
  Button,
  HelperMessage,
  OtpGroup,
  RequiredText,
  TextField,
} from '@muroom/components';

import {
  useUserSmsAuthMutation,
  useUserSmsVerifyMutation,
} from '@/hooks/api/user/useMutation';

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
  const [errorMessage, setErrorMessage] = useState('');

  const { mutateAsync: authMutateAsync } = useUserSmsAuthMutation();
  const { mutateAsync: verifyMutateAsync } = useUserSmsVerifyMutation();

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
    } else if (timeLeft === 0 && isSent) {
      if (timerRef.current) clearInterval(timerRef.current);
      setErrorMessage('시간이 초과되었습니다');
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

  const handleSend = async () => {
    if (!phoneNumber) return;

    try {
      await authMutateAsync({ phone: phoneNumber });

      setIsSent(true);
      setIsVerified(false);
      setTimeLeft(180);
      setOtp(Array(6).fill(''));
      setErrorMessage(''); // 재전송 시 에러 메시지 초기화

      console.log(`인증번호 전송 성공: ${phoneNumber}`);
    } catch (error) {
      console.error(error);
      alert('인증번호 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleVerify = async () => {
    // 시간이 초과되었으면 함수 종료 (혹은 버튼 disabled로 막힘)
    if (timeLeft === 0) return;

    const code = otp.join('');
    if (code.length < 6) return;

    try {
      await verifyMutateAsync({
        phone: phoneNumber,
        code: code,
      });

      setIsVerified(true);
      setErrorMessage('');
      if (timerRef.current) clearInterval(timerRef.current);

      onVerified(phoneNumber);
    } catch (error) {
      console.error(error);
      setErrorMessage('인증번호가 일치하지 않습니다.');
    }
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
            disabled={isSent && isVerified}
            maxLength={13}
            inputMode='numeric'
          />
          <Button
            type='button'
            variant='outline'
            size='l'
            onClick={handleSend}
            disabled={!phoneNumber || isVerified}
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
              // ⭐️ 2. 시간이 초과되었거나(timeLeft === 0), 입력이 덜 됐거나, 이미 인증됐으면 비활성화
              disabled={timeLeft === 0 || otp.some((v) => !v) || isVerified}
            >
              확인하기
            </Button>
          </div>

          <div className='flex justify-between px-1'>
            {isVerified ? (
              <HelperMessage variant='success' showIcon>
                인증 완료되었습니다
              </HelperMessage>
            ) : errorMessage ? (
              <HelperMessage variant='error'>{errorMessage}</HelperMessage>
            ) : (
              <HelperMessage variant='success'>
                인증번호를 전송했습니다
              </HelperMessage>
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
