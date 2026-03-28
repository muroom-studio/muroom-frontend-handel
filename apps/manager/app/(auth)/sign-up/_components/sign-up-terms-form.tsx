'use client'

import { AuthFormContainer } from '../../_components'

export default function SignUpTermsForm() {
  return (
    <AuthFormContainer>
      <div className='flex flex-col gap-4'>
        <p className='text-title-m-26-2 font-semibold'>약관동의</p>
        <p className='text-base-l-16-1'>
          회원가입을 위한 서비스 이용약관에 동의해주세요
        </p>
      </div>
    </AuthFormContainer>
  )
}
