import DesktopBaseHeader from '@/layouts/desktop-layout/base/header';
import DesktopBaseSnb from '@/layouts/desktop-layout/base/snb';

interface Props {
  children: React.ReactNode;
}

export default function DesktopBaseLayout({ children }: Props) {
  return (
    <div>
      <DesktopBaseHeader />
      <div className='grid h-screen w-full grid-cols-[80px_1fr] overflow-hidden'>
        <DesktopBaseSnb />
        {children}
      </div>
    </div>
  );
}
