'use client';

import { useWelcomeMode } from '@/hooks/nuqs/welcome/useWelcomeMode';

import JoinPage from './join';
import LoginPage from './login';

interface Props {
  isMobile: boolean;
}

export default function WelcomePage({ isMobile }: Props) {
  const { isJoin } = useWelcomeMode();

  if (isJoin) {
    return <JoinPage isMobile={isMobile} />;
  }

  return <LoginPage isMobile={isMobile} />;
}
