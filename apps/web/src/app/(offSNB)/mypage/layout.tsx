'use client';

import { usePathname, useRouter } from 'next/navigation';

import { TabItem } from '@muroom/components';

import PageWrapper from '@/components/common/page-wrapper';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

interface Props {
  children: React.ReactNode;
}

const TABS: TabItem[] = [
  { id: '/mypage/profile', label: '프로필' },
  { id: '/mypage/cs', label: '고객센터' },
  { id: '/mypage/reports', label: '신고내역' },
];

export default function Layout({ children }: Props) {
  const { isMobile } = useResponsiveLayout();

  const router = useRouter();
  const pathname = usePathname();

  const isFullPage = pathname.includes('/cs/inquiry/new');

  // 데스크톱 Tab 표출용
  const activeTabId =
    TABS.find((tab) => pathname.startsWith(tab.id))?.id || TABS[0]?.id;

  const handleTabChange = (id: string) => {
    router.push(id);
  };

  if (isMobile) {
    return <>{children}</>;
  }

  if (isFullPage) {
    return <>{children}</>;
  }

  return (
    <PageWrapper
      title='내 정보'
      tabs={TABS}
      initialActiveTabId={activeTabId}
      onTabChange={handleTabChange}
    >
      {children}
    </PageWrapper>
  );
}
