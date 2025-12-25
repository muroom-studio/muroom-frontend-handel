'use client';

import { useRouter } from 'next/navigation';

import { parseAsBoolean, useQueryState } from 'nuqs';

import { Header } from '@muroom/components';
import { CloseIcon } from '@muroom/icons';

import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';
import { useAuthRedirectStore } from '@/store/useAuthRedirectStore';

interface Props {
  backClickHandler?: () => void;
}

const WelcomeHeader = ({ backClickHandler }: Props) => {
  const router = useRouter();
  const { performRedirect } = useAuthRedirectStore();
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
    if (isJoin) {
      performRedirect();
      return;
    }
    setJoin(false);
    router.back();
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
