import DesktopBaseHeader from '../components/header';

interface Props {
  children: React.ReactNode;
}

export default function DesktopBaseLayout({ children }: Props) {
  return (
    <div className='flex h-screen w-full flex-col overflow-hidden'>
      <div className='z-50 flex-none'>
        <DesktopBaseHeader />
      </div>
      <main className='relative flex-1 overflow-y-auto'>{children}</main>
    </div>
  );
}
