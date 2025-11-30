import DesktopBaseHeader from '../components/header';
import DesktopBaseSnb from '../components/snb';

interface Props {
  children: React.ReactNode;
}

export default function DesktopBaseLayout({ children }: Props) {
  return (
    <div className='grid h-screen w-full overflow-hidden'>
      <DesktopBaseHeader />

      <div className='grid grid-cols-[80px_1fr] overflow-hidden'>
        <DesktopBaseSnb />
        {children}
      </div>
    </div>
  );
}
