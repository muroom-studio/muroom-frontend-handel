import OnSNBDesktopSnb from '../components/desktop-snb';

interface Props {
  children: React.ReactNode;
}

export default function OnSNBDesktopLayout({ children }: Props) {
  return (
    <div className='grid h-full w-full grid-cols-[80px_1fr] overflow-hidden'>
      <OnSNBDesktopSnb />
      <main className='relative h-full w-full overflow-hidden'>{children}</main>
    </div>
  );
}
