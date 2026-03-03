import Image from 'next/image';
import Link from 'next/link';

import BaseLogo from '@muroom/ui/assets/base-logo.svg';

export default function DesktopHeader() {
  return (
    <header className='h-[84px] border-b-[0.5px] border-b-gray-300'>
      <Link href='/' className='flex h-full items-center gap-2 px-5'>
        <Image
          src={BaseLogo}
          alt='로고'
          width={133}
          height={32}
          priority
          className='brightness-0'
        />

        <span className='text-[22px] font-semibold'>파트너스</span>
      </Link>
    </header>
  );
}
