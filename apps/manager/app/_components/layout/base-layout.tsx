import BottomNav from './bottom-nav';
import DesktopHeader from './desktop-header';
import MobileHeader from './mobile-header';

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-dvh flex-col'>
      <div className='hidden md:block'>
        <DesktopHeader />
      </div>

      <div className='md:hidden'>
        <MobileHeader />
      </div>

      <main className='flex flex-1 flex-col'>{children}</main>

      <div className='md:hidden'>
        <BottomNav />
      </div>
    </div>
  );
}
