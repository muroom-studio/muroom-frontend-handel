'use client';

import { useEffect, useRef, useState } from 'react';

import { RequiredText } from '@muroom/components';

import OptionItem from '@/components/common/option-item';
import { useInstrumentsQuery } from '@/hooks/api/instruments/useQueries';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { useMusicianStore } from '@/store/useMusicianStore';

import AddressForm from './components/address-form';
import VerifyNickname from './components/verify-nickname';

interface Props {
  onValidChange: (isValid: boolean) => void;
}

export type StudioJuso = {
  juso: string;
  detailJuso: string;
  studioName: string;
};

const studioJusoEqual = (a: StudioJuso, b: StudioJuso) => {
  return (
    a.juso === b.juso &&
    a.detailJuso === b.detailJuso &&
    a.studioName === b.studioName
  );
};

export default function JoinThirdStep({ onValidChange }: Props) {
  const { isMobile } = useResponsiveLayout();
  const { setRegisterDTO } = useMusicianStore();

  const [nickname, setNickname] = useState('');
  const [instrumentId, setInstrumentId] = useState<number>(0);
  const [studioJuso, setStudioJuso] = useState<StudioJuso>({
    juso: '',
    detailJuso: '',
    studioName: '',
  });

  const { data: INSTRUMENTS } = useInstrumentsQuery();

  const prevStudioJusoRef = useRef<StudioJuso>(studioJuso);

  useEffect(() => {
    const isValid = nickname !== '' && !!instrumentId;
    onValidChange(isValid);
  }, [nickname, instrumentId, onValidChange]);

  useEffect(() => {
    setRegisterDTO({
      nickname: nickname,
      instrumentId: instrumentId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickname, instrumentId]);

  useEffect(() => {
    const currentJuso = studioJuso;
    const prevJuso = prevStudioJusoRef.current;

    if (!studioJusoEqual(prevJuso, currentJuso)) {
      setRegisterDTO({
        juso: currentJuso.juso,
        detailJuso: currentJuso.detailJuso,
        studioName: currentJuso.studioName,
      });
      prevStudioJusoRef.current = currentJuso;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studioJuso]);
  return (
    <div className='flex h-full flex-col'>
      <h1 className='text-title-m-26-2'>내 정보 설정</h1>
      <div className='h-15' />
      <div className='flex flex-col gap-y-8'>
        <VerifyNickname value={nickname} setValue={setNickname} />

        <div className='flex flex-col gap-y-2'>
          <RequiredText>악기</RequiredText>
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
        </div>

        <AddressForm
          isMobile={isMobile}
          value={studioJuso}
          setValue={setStudioJuso}
        />
      </div>
    </div>
  );
}
