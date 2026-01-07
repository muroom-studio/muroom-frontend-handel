'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button, TabBar, TabItem } from '@muroom/components';

import PageWrapper from '@/components/common/page-wrapper';
import FaqBoard from '@/components/mypage/cs/components/faq';
import InquiriesBoard from '@/components/mypage/cs/components/inquiries';
import { useAuthCheck } from '@/hooks/auth/useAuthCheck';
import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';

const tabs: TabItem[] = [
  { id: 'faq', label: 'FAQ' },
  { id: 'inquiry', label: '1:1문의내역 ' },
];

export default function Page() {
  const { isLoggedIn } = useAuthCheck();
  const { isMobile } = useResponsiveLayout();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTabId =
    searchParams.get('inquiry') === 'true' ? 'inquiry' : 'faq';

  const handleTabChange = (currentId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('faq');
    params.delete('inquiry');

    params.set(currentId, 'true');

    router.replace(`${pathname}?${params.toString()}`);
  };

  const MainContent = (
    <div className='w-full'>
      <TabBar
        level={3}
        tabs={tabs}
        initialActiveTabId={activeTabId}
        onTabChange={handleTabChange}
      />
      <div className='px-5 pt-6'>
        {activeTabId === 'faq' && <FaqBoard isMobile={isMobile} />}

        {activeTabId === 'inquiry' && <InquiriesBoard isMobile={isMobile} />}
      </div>
    </div>
  );

  // ✅ 1. [순서 변경] 모바일 + 비로그인 (가장 먼저 체크해야 함)
  if (isMobile && !isLoggedIn) {
    return (
      <PageWrapper
        isMobile
        isHeader={{ title: 'FAQ', onBackClick: () => router.back() }}
        contentClassName='px-5 pt-6'
      >
        <FaqBoard isMobile={isMobile} />
      </PageWrapper>
    );
  }

  // ✅ 2. 데스크톱 + 비로그인 (위에서 모바일은 걸러졌으므로 여기는 데스크톱만 해당)
  if (!isLoggedIn) {
    return (
      <PageWrapper title='FAQ'>
        <FaqBoard />
      </PageWrapper>
    );
  }

  // ✅ 3. 모바일 + 로그인 (위의 !isLoggedIn을 통과했으므로 로그인 상태)
  if (isMobile) {
    return (
      <PageWrapper
        isMobile
        isHeader={{ title: '고객센터', onBackClick: () => router.back() }}
        contentClassName='px-0 pt-0'
        bottomFixedSlot={
          activeTabId === 'inquiry' ? (
            <Link href='/mypage/cs/inquiry/new'>
              <Button variant='outline' size='l' className='w-full'>
                1:1 문의하기
              </Button>
            </Link>
          ) : null
        }
      >
        {MainContent}
      </PageWrapper>
    );
  }

  // ✅ 4. 데스크톱 + 로그인
  return MainContent;
}
