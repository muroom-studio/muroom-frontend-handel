import Image from 'next/image';

import { TextField } from '@muroom/ui/components';

import BaseLogo from '@muroom/ui/assets/base-logo.svg';

export default function DesktopHeader() {
  return (
    <header className='p-5'>
      <Image src={BaseLogo} alt='로고' width={133} height={32} />
      <TextField
        id='id'
        name='id'
        label='아이디'
        placeholder='Helloworld@Hello.com'
        required
      />
    </header>
  );
}
