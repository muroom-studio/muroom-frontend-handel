'use client';

import { useEffect, useRef, useState } from 'react';

import {
  Button,
  HelperMessage,
  OtpGroup,
  RequiredText,
  Spinner,
  TextField,
} from '@muroom/components';
import { cn } from '@muroom/lib';

import { useMusiciansPhoneCheckQuery } from '@/hooks/api/musicians/useQueries';
import {
  useSmsSendVerificationMutation,
  useSmsVerifyMutation,
} from '@/hooks/api/sms/useMutation';

interface Props {
  id?: string;
  name?: string;
  onVerified: (phoneNumber: string) => void;
  onMyPage?: boolean;
}

export default function VerifyPhone({
  id = 'phoneNumber',
  name = 'phoneNumber',
  onVerified,
  onMyPage = false,
}: Props) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const [isSent, setIsSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { mutateAsync: authMutateAsync, isPending: isAuthPending } =
    useSmsSendVerificationMutation();
  const { mutateAsync: verifyMutateAsync, isPending: isVerifyPending } =
    useSmsVerifyMutation();

  const { refetch: checkPhoneDuplicate, isFetching: isCheckingPending } =
    useMusiciansPhoneCheckQuery({ phone: phoneNumber });

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

    setErrorMessage('');

    try {
      const available = await checkPhoneDuplicate();

      if (available) {
        await authMutateAsync({ phone: phoneNumber });

        setIsSent(true);
        setIsVerified(false);
        setTimeLeft(180);
        setOtp(Array(6).fill(''));
      } else {
        setErrorMessage('인증 번호 전송에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      if (!errorMessage) {
        setErrorMessage('인증 번호 전송에 실패했습니다.');
      }
    }
  };

  const handleVerify = async () => {
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

    if (isSent) {
      setIsSent(false);
      setIsVerified(false);
      setErrorMessage('');
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  return (
    <div className='flex flex-col gap-y-3'>
      <div className='gap-y-2.25 flex flex-col'>
        {!onMyPage && <RequiredText htmlFor={id}>전화번호</RequiredText>}
        <div className={cn('grid w-full grid-cols-[1fr_auto] gap-x-3')}>
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
            disabled={
              !phoneNumber || isVerified || isAuthPending || isCheckingPending
            }
          >
            {isAuthPending || isCheckingPending ? (
              <Spinner variant='component' />
            ) : isSent ? (
              '재전송'
            ) : (
              '인증요청'
            )}
          </Button>
        </div>
      </div>

      {/* 에러 메시지가 있고, 아직 인증번호가 전송되지 않은 상태라면(즉, 중복체크 에러라면) 여기에 표시 */}
      {!isSent && errorMessage && (
        <HelperMessage variant='error'>{errorMessage}</HelperMessage>
      )}

      {isSent && (
        <div className='flex flex-col gap-y-2'>
          <div className='grid grid-cols-[1fr_auto] gap-3'>
            <div className={isVerified ? 'pointer-events-none opacity-50' : ''}>
              <OtpGroup length={6} value={otp} onChange={setOtp} />
            </div>

            <Button
              type='button'
              variant={'outline'}
              size='l'
              onClick={handleVerify}
              disabled={timeLeft === 0 || otp.some((v) => !v) || isVerified}
            >
              {isVerifyPending ? <Spinner variant='component' /> : '확인하기'}
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
