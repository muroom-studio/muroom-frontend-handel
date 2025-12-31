import Link from 'next/link';

import { QuestionFillIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

interface Props {
  className?: string;
}

export default function FaqButton({ className }: Props) {
  return (
    <Link
      href='/mypage/cs'
      className={cn('flex-center rounded-1000 size-14 bg-gray-600', className)}
    >
      <QuestionFillIcon className='size-11 text-white' />
    </Link>
  );
}
