'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button, TabItem } from '@muroom/components';
import { PlusIcon } from '@muroom/icons';
import BoastBanner from '@muroom/ui/assets/boast-banner.svg';

import PageWrapper from '@/components/common/page-wrapper';
import { useAuthCheck } from '@/hooks/auth/useAuthCheck';
import { useSaveRedirectUrl } from '@/hooks/auth/useAuthRedirect';
import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';

interface Props {
  children: React.ReactNode;
}

const TABS: TabItem[] = [
  { id: 'all', label: '전체 글' },
  { id: 'my', label: '내가 쓴 글' },
];

export default function Layout({ children }: Props) {
  const { isMobile } = useResponsiveLayout();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isLoggedIn } = useAuthCheck();
  const { saveCurrentUrl } = useSaveRedirectUrl();

  const isFullPage = pathname.includes('/studio-boasts/new');

  const currentTabId = searchParams.get('my') === 'true' ? 'my' : 'all';

  const handleTabChange = (targetId: string) => {
    if (targetId === 'my' && !isLoggedIn) {
      saveCurrentUrl();

      const queryString = searchParams.toString();
      const href = queryString ? `/welcome?${queryString}` : '/welcome';

      router.push(href);
      return;
    }

    // 2. 정상적인 탭 이동 로직
    const params = new URLSearchParams(searchParams.toString());
    params.delete('my');

    if (targetId === 'my') {
      params.set('my', 'true');
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  if (isMobile) {
    return <>{children}</>;
  }

  if (isFullPage) {
    return <>{children}</>;
  }

  return (
    <PageWrapper
      title='작업실 자랑하기'
      thumbnail={
        <Image
          src={BoastBanner}
          alt='매물자랑배너'
          className='h-auto w-full object-cover'
          priority
        />
      }
      tabs={TABS}
      initialActiveTabId={currentTabId}
      activeTabId={currentTabId}
      onTabChange={handleTabChange}
      rightSlot={
        <Button
          variant='primary'
          size='xl'
          onClick={() => router.push('/studio-boasts/new')}
        >
          <div className='flex-center gap-x-1'>
            <PlusIcon className='size-6 text-white' />
            글쓰기
          </div>
        </Button>
      }
    >
      {children}
    </PageWrapper>
  );
}
