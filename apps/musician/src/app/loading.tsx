import { Spinner } from '@muroom/ui/components';

export default function Loading() {
  return (
    <div className='bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm'>
      <Spinner />
    </div>
  );
}
