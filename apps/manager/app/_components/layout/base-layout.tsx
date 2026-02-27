import BottomNav from './bottom-nav';
import DesktopHeader from './desktop-header';
import MobileHeader from './mobile-header';

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-dvh flex-col'>
      {/* 데스크탑 헤더: md 이상에서만 표시 */}
      <div className='hidden md:block'>
        <DesktopHeader />
      </div>

      {/* 모바일 헤더: md 미만에서만 표시 */}
      <div className='md:hidden'>
        <MobileHeader />
      </div>

      <main className='flex-1'>{children}</main>

      {/* 하단 탭바: md 미만에서만 표시 */}
      <div className='md:hidden'>
        <BottomNav />
      </div>
    </div>
  );
}
