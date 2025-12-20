'use client';

import { usePathname, useRouter } from 'next/navigation';

import { PageWrapper, TabItem } from '@muroom/components';

interface Props {
  children: React.ReactNode;
}

const TABS: TabItem[] = [
  { id: '/mypage/profile', label: '프로필' },
  { id: '/mypage/cs', label: '고객센터' },
  { id: '/mypage/reports', label: '신고내역' },
];

export default function Layout({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

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
      onTabChange={handleTabChange}
    >
      {children}
    </PageWrapper>
  );
}
