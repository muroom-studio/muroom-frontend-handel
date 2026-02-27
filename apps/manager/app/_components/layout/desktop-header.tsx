import Image from 'next/image';
import Link from 'next/link';

import BaseLogo from '@muroom/ui/assets/base-logo.svg';

export default function DesktopHeader() {
  return (
    <header className='border-b-[0.5px] border-b-gray-300 p-5'>
      <Link href='/'>
        <Image src={BaseLogo} alt='로고' width={133} height={32} priority />
      </Link>
    </header>
  );
}
