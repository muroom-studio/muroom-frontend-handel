import MobileBaseFooter from '../components/footer';

interface Props {
  children: React.ReactNode;
}

export default function MobileBaseLayout({ children }: Props) {
  return (
    <div className='flex h-dvh w-full flex-col overflow-hidden'>
      <main className='relative w-full flex-1 overflow-hidden'>{children}</main>
      <footer className='z-50 w-full flex-none border-t border-t-gray-300 bg-white pb-[env(safe-area-inset-bottom)]'>
        <MobileBaseFooter />
      </footer>
    </div>
  );
}
