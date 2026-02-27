import Image from 'next/image';
import Link from 'next/link';

import BaseLogo from '@muroom/ui/assets/base-logo.svg';

export default function MobileHeader() {
  return (
    <header className='border-b-[0.5px] border-b-gray-300 p-4'>
      <Link href='/'>
        <Image src={BaseLogo} alt='로고' width={100} height={24} priority />
      </Link>
    </header>
  );
}
