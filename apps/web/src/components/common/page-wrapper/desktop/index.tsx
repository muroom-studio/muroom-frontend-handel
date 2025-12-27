'use client';

import { TabBar, TabItem } from '@muroom/components';
// 경로 확인
import { cn } from '@muroom/lib';

import Footer from '../../footer';

export interface Props {
  title: string;
  thumbnail?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  tabs?: TabItem[];
  initialActiveTabId?: string;
  activeTabId?: string;
  onTabChange?: (id: string) => void;
  rightSlot?: React.ReactNode;
}

const DesktopPageWrapper = ({
  title,
  thumbnail,
  children,
  className,
  tabs,
  initialActiveTabId,
  activeTabId,
  onTabChange,
  rightSlot,
}: Props) => {
  const hasTabs = tabs && tabs.length > 0 && initialActiveTabId && onTabChange;

  return (
    <div
      id='page-scroll-container'
      className='flex h-full w-full flex-col overflow-y-auto bg-white'
    >
      <header
        className={cn(
          'sticky top-0 z-50 w-full border-b-[0.5px] border-gray-400 bg-white transition-all',
          !hasTabs && '',
        )}
      >
        <div
          className={cn(
            'relative mx-auto flex max-w-[1080px] px-5',
            hasTabs ? 'flex-col items-start pt-10' : 'py-10',
          )}
        >
          <div className={cn('flex flex-col', hasTabs && 'gap-y-5')}>
            <h1 className='text-title-m-26-2'>{title}</h1>

            {hasTabs && (
              <TabBar
                level={3}
                tabs={tabs}
                initialActiveTabId={initialActiveTabId}
                activeId={activeTabId}
                onTabChange={onTabChange}
                className='flex w-full justify-start gap-x-6'
                btnClassName='flex-none'
              />
            )}
          </div>

          {rightSlot && (
            <div className='absolute right-5 top-1/2 -translate-y-1/2'>
              {rightSlot}
            </div>
          )}
        </div>
      </header>

      {thumbnail}

      <main
        className={cn(
          'pb-30 mx-auto w-full max-w-[1080px] flex-1 px-5 pt-10',
          className,
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DesktopPageWrapper;
