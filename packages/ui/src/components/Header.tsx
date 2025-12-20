import { LeftarrowIcon } from '../icons-generated';
import { cn } from '../lib/utils';

interface HeaderProps {
  title?: React.ReactNode;
  onBackClick?: () => void;
  rightSlot?: React.ReactNode;
  className?: string;
}

const Header = ({ title, onBackClick, rightSlot, className }: HeaderProps) => {
  return (
    <header className={cn('flex-between w-full bg-white px-5 py-4', className)}>
      <div className='flex items-center gap-x-3'>
        <LeftarrowIcon
          className='size-6 cursor-pointer'
          onClick={onBackClick}
        />
        <h1 className='text-base-exl-18-2 max-w-[198px] truncate'>{title}</h1>
      </div>

      <div className='flex shrink-0 items-center gap-x-3'>{rightSlot}</div>
    </header>
  );
};

export default Header;
