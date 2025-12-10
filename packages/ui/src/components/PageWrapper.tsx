import { cn } from '../lib/utils';

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const PageWrapper = ({ title, children, className }: Props) => {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <header className='sticky top-0 z-50 w-full border-b-[0.5px] border-gray-400 bg-white'>
        <div className='mx-auto flex max-w-[1080px] items-center py-10'>
          <h1 className='text-title-m-26-2 text-black'>{title}</h1>
        </div>
      </header>

      <main className={cn('mx-auto w-full max-w-[1080px] pt-10', className)}>
        {children}
      </main>
    </div>
  );
};

export default PageWrapper;
