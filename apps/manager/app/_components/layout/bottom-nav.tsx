'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return <nav className='flex border-t-[0.5px] border-t-gray-300'></nav>;
}
