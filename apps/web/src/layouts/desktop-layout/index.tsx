import DesktopBaseHeader from './base/header';
import DesktopBaseSnb from './base/snb';

interface Props {
  children: React.ReactNode;
}

export default function DesktopLayout({ children }: Props) {
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
