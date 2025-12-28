'use client';

import { useEffect, useRef, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { TabBar, TabItem } from '@muroom/components';
import { cn } from '@muroom/lib';

import { useAuthCheck } from '@/hooks/auth/useAuthCheck';
import { useSaveRedirectUrl } from '@/hooks/auth/useAuthRedirect';

const TABS: TabItem[] = [
  { id: 'all', label: '전체 글' },
  { id: 'my', label: '내가 쓴 글' },
];

export default function MobileStudioBoastsTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isLoggedIn } = useAuthCheck();
  const { saveCurrentUrl } = useSaveRedirectUrl();

  const currentTabId = searchParams.get('my') === 'true' ? 'my' : 'all';

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollTop = useRef(0);
  const tabBarRef = useRef<HTMLDivElement>(null);

  const getScrollParent = (node: HTMLElement): HTMLElement | Window => {
    let currentParent = node.parentElement;
    while (currentParent) {
      const style = window.getComputedStyle(currentParent);
      if (['auto', 'scroll'].includes(style.overflowY)) {
        return currentParent;
      }
      currentParent = currentParent.parentElement;
    }
    return window;
  };

  useEffect(() => {
    const tabBarElement = tabBarRef.current;
    if (!tabBarElement) return;

    const scrollTarget = getScrollParent(tabBarElement);

    const handleScroll = () => {
      const currentScrollTop =
        scrollTarget === window
          ? window.scrollY
          : (scrollTarget as HTMLElement).scrollTop;

      if (currentScrollTop <= 0) {
        setIsVisible(true);
        lastScrollTop.current = 0;
        return;
      }

      const diff = currentScrollTop - lastScrollTop.current;

      if (Math.abs(diff) < 5) return;

      if (diff > 0) {
        if (currentScrollTop > 50) {
          setIsVisible(false);
        }
      } else {
        setIsVisible(true);
      }

      lastScrollTop.current = currentScrollTop;
    };

    scrollTarget.addEventListener('scroll', handleScroll);
    return () => scrollTarget.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (targetId: string) => {
    if (targetId === 'my' && !isLoggedIn) {
      saveCurrentUrl();
      const queryString = searchParams.toString();
      const href = queryString ? `/welcome?${queryString}` : '/welcome';
      router.push(href);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete('my');

    if (targetId === 'my') {
      params.set('my', 'true');
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      ref={tabBarRef}
      className={cn(
        'sticky top-0 z-40 w-full bg-white transition-transform duration-300 ease-in-out',
        'shadow-level-0',
        {
          '-translate-y-full': !isVisible,
          'translate-y-0': isVisible,
        },
      )}
    >
      <TabBar
        level={3}
        tabs={TABS}
        initialActiveTabId={currentTabId}
        activeId={currentTabId}
        onTabChange={handleTabChange}
        className='flex w-full justify-start gap-x-6 px-5 pb-2 pt-2'
        btnClassName='flex-none'
      />
    </div>
  );
}
