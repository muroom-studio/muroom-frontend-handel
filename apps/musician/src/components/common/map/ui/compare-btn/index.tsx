import { PlusIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

interface Props {
  isMobile?: boolean;
  className?: string;
}
export default function CompareBtn({ isMobile = false, className }: Props) {
  if (isMobile) {
    return (
      <button className='flex-center rounded-4 shadow-level-1 size-9 cursor-pointer bg-gray-600 p-1.5'>
        <PlusIcon className='size-6 text-white' />
      </button>
    );
  }

  return (
    <div
      className={cn(
        'rounded-1000 flex cursor-pointer items-center gap-x-2.5 bg-gray-600 py-4 pl-6 pr-8 text-white',
        className,
      )}
    >
      <PlusIcon className='size-6' />
      <span className='text-base-l-16-2'>비교함 담기</span>
    </div>
  );
}
