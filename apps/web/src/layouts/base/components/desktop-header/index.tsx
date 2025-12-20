import Image from 'next/image';
import Link from 'next/link';

import BaseLogo from '@muroom/ui/assets/base-logo.svg';

import SearchBar from '@/components/common/search-bar';

import AuthSection from './auth-section';

export default function BaseDesktopHeader() {
  return (
    <header className='flex-between border-b-[0.5px] border-b-gray-300 p-5'>
      <div className='flex-center gap-x-4'>
        <Link href={'/home'} className='cursor-pointer'>
          <Image src={BaseLogo} alt='로고' width={133} height={32} priority />
        </Link>
        <div className='w-[404px]'>
          <SearchBar />
        </div>
      </div>
      <AuthSection />
    </header>
  );
}
