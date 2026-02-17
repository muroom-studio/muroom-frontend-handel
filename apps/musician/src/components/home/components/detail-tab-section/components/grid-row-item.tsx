import { cn } from '@muroom/lib';

interface Props {
  title: string;
  sub1: React.ReactNode;
  sub2?: React.ReactNode;
  className?: string;
}

const GridRowItem = ({ title, sub1, sub2, className }: Props) => {
  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className='flex w-full items-center'>
        <div className='text-base-l-16-2 w-[80px] flex-none whitespace-nowrap text-black'>
          {title}
        </div>

        <div className='wrap-break-word text-base-l-16-1 min-w-0 grow'>
          {sub1}
        </div>
      </div>

      {sub2 && (
        <div className='flex w-full'>
          <div className='w-[80px] flex-none'></div>
          <div className='wrap-break-word text-base-l-16-1 min-w-0 grow'>
            {sub2}
          </div>
        </div>
      )}
    </div>
  );
};

export default GridRowItem;
