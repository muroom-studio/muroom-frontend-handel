import { Button } from '@muroom/components';
import { cn } from '@muroom/lib';

const OptionItem = ({
  item,
  selected,
  onClick,
}: {
  item: string;
  selected: boolean;
  onClick?: () => void;
}) => {
  return (
    <Button
      variant='outline'
      className={cn('h-9 transition-colors', {
        'bg-primary-400 border-primary-400 hover:bg-primary-600 hover:border-primary-600':
          selected,
      })}
      onClick={onClick}
    >
      <div className='grid place-items-center'>
        <span className='text-base-m-14-2 pointer-events-none invisible col-start-1 row-start-1 select-none opacity-0'>
          {item}
        </span>

        <span
          className={cn(
            'text-base-m-14-1 col-start-1 row-start-1 transition-colors',
            {
              'text-base-m-14-2 text-white': selected,
            },
          )}
        >
          {item}
        </span>
      </div>
    </Button>
  );
};

export default OptionItem;
