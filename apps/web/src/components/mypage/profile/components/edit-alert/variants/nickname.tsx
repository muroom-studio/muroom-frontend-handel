import { useState } from 'react';

import { toast } from 'sonner';

import {
  Alert,
  Button,
  HelperMessage,
  Spinner,
  TextField,
} from '@muroom/components';

import { useMusicianMeDetailMutation } from '@/hooks/api/musician/useMutations';
import { useUserNicknameCheckQuery } from '@/hooks/api/user/useQueries';

import ContentWrapper from '../components/content-wrapper';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type CheckStatus = 'idle' | 'success' | 'error';

export default function NicknameEditAlert({ isOpen, onClose }: Props) {
  const [nickname, setNickname] = useState('');
  const [confirmDisabled, setConfirmDisabled] = useState(true);

  const [checkStatus, setCheckStatus] = useState<CheckStatus>('idle');

  const {
    refetch: userNicknameCheckRefetch,
    isLoading: isUserNicknameCheckLoading,
  } = useUserNicknameCheckQuery({
    nickname,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    const sanitizedValue = rawValue.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]/g, '');

    const finalValue = sanitizedValue.slice(0, 20);

    setNickname(finalValue);

    if (checkStatus !== 'idle') {
      setCheckStatus('idle');
      setNickname('');
    }
  };

  const handleVerifyClick = async () => {
    if (!nickname) return;

    const result = await userNicknameCheckRefetch();

    if (result.isSuccess && result.data) {
      if (result.data.available) {
        setCheckStatus('success');
        setNickname(nickname);
        setConfirmDisabled(false);
      } else {
        setCheckStatus('error');
        setNickname('');
        setConfirmDisabled(true);
      }
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

  const { mutate: musicianMeDetailMutate } = useMusicianMeDetailMutation();

  const handleConfirm = () => {
    musicianMeDetailMutate(
      { nickname },
      {
        onSuccess: () => {
          toast.success('닉네임이 성공적으로 변경되었습니다.');
          onClose();
        },
        onError: () => {
          toast.error('닉네임 변경이 실패했습니다.');
          setNickname('');
        },
      },
    );
  };

  const AlertContent = () => {
    return (
      <ContentWrapper description='변경할 닉네임을 입력해주세요'>
        <div className='flex flex-col gap-y-2'>
          <div className='relative grid grid-cols-[293px_1fr] gap-x-3'>
            <TextField
              value={nickname}
              onChange={handleChange}
              onClear={() => {
                setNickname('');
                setCheckStatus('idle');
              }}
              placeholder='닉네임을 입력해주세요'
              maxLength={20}
            />
            <Button
              type='button'
              variant='outline'
              size='l'
              disabled={nickname === '' || isUserNicknameCheckLoading}
              onClick={handleVerifyClick}
            >
              {isUserNicknameCheckLoading ? (
                <Spinner variant='component' />
              ) : (
                '확인하기'
              )}
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
      </ContentWrapper>
    );
  };

  return (
    <Alert
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title='닉네임 변경'
      content={AlertContent()}
      confirmLabel='변경하기'
      confirmDisabled={confirmDisabled}
    />
  );
}
