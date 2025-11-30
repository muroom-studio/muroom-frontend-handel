'use client';

import { useWelcomeMode } from '@/hooks/nuqs/welcome/useWelcomeMode';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

import JoinPage from './join';
import LoginPage from './login';

export default function WelcomePage() {
  const { isJoin } = useWelcomeMode();
  const { isMobile } = useResponsiveLayout();

  if (isJoin) {
    return <JoinPage isMobile={isMobile} />;
  }

  return <LoginPage isMobile={isMobile} />;
}
