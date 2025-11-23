import { DownArrowIcon } from '../icons-generated';

interface HeaderProps {
  title: React.ReactNode;
  onBackClick: () => void;
  rightSlot?: React.ReactNode;
}

const Header = ({ title, onBackClick, rightSlot }: HeaderProps) => {
  return (
    <header className='flex-between w-full bg-white px-5 py-4'>
      <div className='flex items-center gap-x-3'>
        <DownArrowIcon
          className='size-6 rotate-90 cursor-pointer'
          onClick={onBackClick}
        />
        <h1 className='text-base-exl-18-2 max-w-[198px] truncate'>{title}</h1>
      </div>

      <div className='flex shrink-0 items-center gap-x-3'>{rightSlot}</div>
    </header>
  );
};

export default Header;
