import DesktopHeader from '@/layouts/desktop-layout/header';
import DesktopSnb from '@/layouts/desktop-layout/snb';

interface Props {
  children: React.ReactNode;
}

export default function DesktopLayout({ children }: Props) {
  return (
    <>
      <DesktopHeader />
      <div className='grid h-screen w-full grid-cols-[80px_1fr] overflow-hidden'>
        <DesktopSnb />
        {children}
      </div>
    </>
  );
}
