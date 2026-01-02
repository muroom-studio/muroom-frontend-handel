import { useState } from 'react';

import { toast } from 'sonner';

import { Alert, Button, ModalBottomSheet } from '@muroom/components';

import OptionItem from '@/components/common/option-item';
import { useInstrumentsQuery } from '@/hooks/api/instruments/useQueries';
import { useMusicianMeDetailMutation } from '@/hooks/api/musician/useMutations';

import ContentWrapper from '../components/content-wrapper';

interface Props {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function InstrumentEditAlert({
  isMobile,
  isOpen,
  onClose,
}: Props) {
  const [instrumentId, setInstrumentId] = useState(0);

  const { data: INSTRUMENTS } = useInstrumentsQuery();

  const { mutate: musicianMeDetailMutate } = useMusicianMeDetailMutation();

  const handleConfirm = () => {
    musicianMeDetailMutate(
      { instrumentId },
      {
        onSuccess: () => {
          toast.success('악기가 성공적으로 변경되었습니다.');
          onClose();
        },
        onError: () => {
          setInstrumentId(0);
        },
      },
    );
  };

  const AlertContent = () => {
    return (
      <ContentWrapper
        isMobile
        title={isMobile ? '악기 변경' : ''}
        description='변경할 악기를 선택해주세요'
      >
        <div className='flex flex-wrap gap-2'>
          {INSTRUMENTS?.map((instrument) => (
            <OptionItem
              key={instrument.id}
              item={instrument.description}
              selected={instrumentId === instrument.id}
              onClick={() => setInstrumentId(instrument.id)}
            />
          ))}
        </div>
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
              disabled={!instrumentId}
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
      title='악기 변경'
      content={AlertContent()}
      confirmLabel='변경하기'
      confirmDisabled={!instrumentId}
    />
  );
}
