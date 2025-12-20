import BaseDesktopHeader from '../components/desktop-header';

interface Props {
  children: React.ReactNode;
}

export default function BaseDesktopLayout({ children }: Props) {
  return (
    <div className='fixed inset-0 z-0 flex w-full flex-col overflow-hidden bg-white'>
      <div className='z-50 flex-none'>
        <BaseDesktopHeader />
      </div>
      <main className='relative min-h-0 w-full flex-1'>{children}</main>
    </div>
  );
}
