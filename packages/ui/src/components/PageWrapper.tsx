/* 
  해당 컴포넌트는 home을 제외한 모든 페이지 단위 컴포넌트에서 사용됩니다. 
*/
import { cn } from '../lib/utils';

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const PageWrapper = ({ title, children, className }: Props) => {
  return (
    <div className='flex h-full w-full flex-col overflow-y-auto bg-white'>
      <header className='sticky top-0 z-50 w-full border-b-[0.5px] border-gray-400 bg-white'>
        <div className='mx-auto flex max-w-[1080px] items-center px-5 py-10'>
          <h1 className='text-title-m-26-2 text-black'>{title}</h1>
        </div>
      </header>

      <main
        className={cn(
          'mx-auto w-full max-w-[1080px] px-5 pb-20 pt-10',
          className,
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default PageWrapper;
