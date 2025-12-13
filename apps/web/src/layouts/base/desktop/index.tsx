import BaseDesktopHeader from '../components/desktop-header';

interface Props {
  children: React.ReactNode;
}

export default function BaseDesktopLayout({ children }: Props) {
  return (
    <div className='flex h-screen w-full flex-col overflow-hidden'>
      <div className='z-50 flex-none'>
        <BaseDesktopHeader />
      </div>
      <main className='relative min-h-0 flex-1'>{children}</main>
    </div>
  );
}
