import OnSNBMobileFooter from '../components/mobile-footer';

interface Props {
  children: React.ReactNode;
}

export default function OnSNBMobileLayout({ children }: Props) {
  return (
    <div className='flex h-dvh w-full flex-col overflow-hidden'>
      <main className='relative w-full flex-1 overflow-hidden'>{children}</main>
      <footer className='z-50 w-full flex-none border-t border-t-gray-300 bg-white'>
        <OnSNBMobileFooter />
      </footer>
    </div>
  );
}
