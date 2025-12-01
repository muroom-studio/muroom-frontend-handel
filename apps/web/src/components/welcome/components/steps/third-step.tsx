import { useEffect, useState } from 'react';

import { RequiredText } from '@muroom/components';
import { updateArrayByToggle } from '@muroom/util';

import OptionItem from '@/components/common/option-item';
import { useInstrumentsQueries } from '@/hooks/api/instruments/useQueries';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

import AddressForm from './components/address-form';
import VerifyNickname from './components/verify-nickname';

interface Props {
  onValidChange: (isValid: boolean) => void;
}

export type StudioJuso = {
  juso: string;
  detailJuso: string;
  name: string;
};

export default function JoinThirdStep({ onValidChange }: Props) {
  const { isMobile } = useResponsiveLayout();

  const [nickname, setNickname] = useState('');
  const [instrumentOption, setInstrumentOption] = useState<number[]>([]);
  const [studioJuso, setStudioJuso] = useState<StudioJuso>({
    juso: '',
    detailJuso: '',
    name: '',
  });

  const { data: INSTRUMENTS } = useInstrumentsQueries().instrumentsQuery;

  useEffect(() => {
    const isValid = nickname !== '' && instrumentOption.length > 0;

    onValidChange(isValid);
  }, [nickname, instrumentOption, onValidChange]);

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
                selected={instrumentOption.includes(instrument.id)}
                onClick={() =>
                  setInstrumentOption((prev) =>
                    updateArrayByToggle(prev, instrument.id),
                  )
                }
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
