'use client';

import { usePathname, useRouter } from 'next/navigation';

import { TabItem } from '@muroom/components';

import PageWrapper from '@/components/common/page-wrapper';
import { useAuthCheck } from '@/hooks/auth/useAuthCheck';
import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';

interface Props {
  children: React.ReactNode;
}

const TABS: TabItem[] = [
  { id: '/mypage/profile', label: '프로필' },
  { id: '/mypage/cs', label: '고객센터' },
];

export default function Layout({ children }: Props) {
  const { isLoggedIn } = useAuthCheck();
  const { isMobile } = useResponsiveLayout();

  const router = useRouter();
  const pathname = usePathname();

  const isFullPage = pathname.includes('/cs/inquiry/new');

  const shouldSkipWrapper = isMobile || isFullPage || !isLoggedIn;

  if (shouldSkipWrapper) {
    return <>{children}</>;
  }

  const activeTabId =
    TABS.find((tab) => pathname.startsWith(tab.id))?.id || TABS[0]?.id;

  const handleTabChange = (id: string) => {
    router.push(id);
  };

  return (
    <PageWrapper
      title='내 정보'
      tabs={TABS}
      initialActiveTabId={activeTabId}
      activeTabId={activeTabId}
      onTabChange={handleTabChange}
    >
      {children}
    </PageWrapper>
  );
}
