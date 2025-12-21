import { useState } from 'react';

import { toast } from 'sonner';

import { Alert, Button, ModalBottomSheet } from '@muroom/components';
import { PlusIcon } from '@muroom/icons';

import SearchBar from '@/components/common/search-bar';
import AddressForm from '@/components/welcome/components/steps/components/address-form';
import { StudioJuso } from '@/components/welcome/components/steps/third-step';
import { useMusicianMeDetailMutation } from '@/hooks/api/musician/useMutations';

import ContentWrapper from '../components/content-wrapper';

interface Props {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function StudioEditAlert({ isMobile, isOpen, onClose }: Props) {
  const [keyword, setKeyword] = useState('');

  const [studioJuso, setStudioJuso] = useState<StudioJuso>({
    juso: '',
    detailJuso: '',
    studioName: '',
  });

  const [isSelfSelect, setIsSelfSelct] = useState(false);

  const { mutate: musicianMeDetailMutate } = useMusicianMeDetailMutation();

  const handleConfirm = () => {
    musicianMeDetailMutate(
      {
        roadAddress: studioJuso.juso,
        detailAddress: studioJuso.detailJuso,
        studioName: studioJuso.studioName,
      },
      {
        onSuccess: () => {
          toast.success('작업실이 성공적으로 변경되었습니다.');
          onClose();
        },
        onError: () => {
          toast.error('작업실 변경이 실패했습니다.');
          setStudioJuso({
            juso: '',
            detailJuso: '',
            studioName: '',
          });
        },
      },
    );
  };

  const AlertContent = () => {
    return (
      <ContentWrapper
        isMobile
        title='내 작업실 변경'
        description='변경할 작업실을 추가해주세요'
      >
        {!isSelfSelect ? (
          <div className='flex flex-col gap-y-4'>
            <SearchBar
              variant='not-home'
              keyword={keyword}
              onSearch={setKeyword}
            />
            <div className='flex-center'>
              <Button
                variant='outline'
                size='s'
                className='w-fit px-3 py-[13px]'
                onClick={() => setIsSelfSelct(true)}
              >
                <PlusIcon className='size-4' />
                직접 작업실 추가하기
              </Button>
            </div>
          </div>
        ) : (
          <AddressForm
            // isMobile={isMobile}
            value={studioJuso}
            setValue={setStudioJuso}
            onMyPage
          />
        )}
      </ContentWrapper>
    );
  };

  if (isMobile) {
    return (
      <ModalBottomSheet
        isOpen={isOpen}
        onClose={onClose}
        footerBtns={
          <div className='grid grid-cols-2 gap-x-3'>
            <Button variant='outline' size='xl' onClick={onClose}>
              취소하기
            </Button>
            <Button
              onClick={handleConfirm}
              variant='primary'
              size='xl'
              disabled={Object.values(studioJuso).some(
                (item) => item.length === 0,
              )}
            >
              변경하기
            </Button>
          </div>
        }
      >
        {AlertContent()}
      </ModalBottomSheet>
    );
  }

  return (
    <Alert
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title='내 작업실 변경'
      content={AlertContent()}
      confirmLabel='변경하기'
      confirmDisabled={Object.values(studioJuso).some(
        (item) => item.length === 0,
      )}
    />
  );
}
