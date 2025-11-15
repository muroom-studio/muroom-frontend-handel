import { Button } from '@muroom/components';
import { cn } from '@muroom/lib';

const OptionItem = ({
  item,
  selected,
  onClick,
}: {
  item: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <Button
      variant='outline'
      className={cn('h-9', { 'bg-primary-400 hover:bg-primary-600': selected })}
      onClick={onClick}
    >
      <p
        className={cn('text-base-m-14-1', {
          'text-base-m-14-2 text-white': selected,
        })}
      >
        {item}
      </p>
    </Button>
  );
};

export default OptionItem;
