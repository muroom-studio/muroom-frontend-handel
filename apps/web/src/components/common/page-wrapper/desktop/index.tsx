import { TabBar, TabItem } from '@muroom/components';
import { cn } from '@muroom/lib';

import Footer from '../../footer';

export interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
  tabs?: TabItem[];
  initialActiveTabId?: string;
  onTabChange?: (id: string) => void;
}

const DesktopPageWrapper = ({
  title,
  children,
  className,
  tabs,
  initialActiveTabId,
  onTabChange,
}: Props) => {
  const hasTabs = tabs && tabs.length > 0 && initialActiveTabId && onTabChange;

  return (
    <div className='flex h-full w-full flex-col overflow-y-auto bg-white'>
      <header
        className={cn(
          'sticky top-0 z-50 w-full border-b-[0.5px] border-gray-400 bg-white transition-all',
          !hasTabs && '',
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-[1080px] px-5',
            hasTabs ? 'flex-col gap-y-5 pt-10' : 'items-center py-10',
          )}
        >
          <h1 className='text-title-m-26-2'>{title}</h1>

          {hasTabs && (
            <TabBar
              level={3}
              tabs={tabs}
              initialActiveTabId={initialActiveTabId}
              onTabChange={onTabChange}
              className='flex w-full justify-start gap-x-6'
              btnClassName='flex-none'
            />
          )}
        </div>
      </header>

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
