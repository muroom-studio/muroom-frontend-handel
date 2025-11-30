import { Button } from '@muroom/components';
import { ResetIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

const FilterWrapper = ({
  title,
  titleChildren,
  headerChildren,
  children,
  className,
}: {
  title: string;
  titleChildren?: React.ReactNode;
  headerChildren?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  const { isMobile } = useResponsiveLayout();

  return (
    <div className={cn('flex w-full flex-col gap-y-5', className)}>
      <div className='flex-between'>
        <div className='flex items-center gap-x-2'>
          <span className='text-base-exl-18-2'>{title}</span>
          {titleChildren}
        </div>

        {!isMobile && (
          <div className='flex items-stretch gap-x-2'>
            {headerChildren}
            <Button variant='outline_icon' size='l' className='size-6'>
              <ResetIcon className='size-4' />
            </Button>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default FilterWrapper;
