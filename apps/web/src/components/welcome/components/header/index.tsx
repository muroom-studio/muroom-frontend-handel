'use client';

import { useRouter } from 'next/navigation';

import { parseAsBoolean, useQueryState } from 'nuqs';

import { Header } from '@muroom/components';
import { CloseIcon } from '@muroom/icons';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

interface Props {
  backClickHandler?: () => void;
}

const WelcomeHeader = ({ backClickHandler }: Props) => {
  const router = useRouter();
  const { isMobile } = useResponsiveLayout();

  const [isJoin, setJoin] = useQueryState(
    'join',
    parseAsBoolean.withDefault(false),
  );

  const handleDefaultBack = () => {
    if (isJoin) {
      setJoin(false);
      return;
    }

    router.back();
  };

  const onBackClick = backClickHandler || handleDefaultBack;

  const onCloseClick = () => {
    router.back();
    setJoin(false);
  };

  if (isMobile) {
    return <Header onBackClick={onBackClick} />;
  }

  return (
    <Header
      onBackClick={onBackClick}
      rightSlot={
        <CloseIcon className='size-6 cursor-pointer' onClick={onCloseClick} />
      }
    />
  );
};

export default WelcomeHeader;
