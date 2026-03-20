'use client'

import { usePathname, useRouter } from 'next/navigation'

import { CloseIcon, LeftarrowIcon } from '@muroom/ui/icons'

const ENTRY_PATHS = ['/sign-in', '/sign-up/info', '/forgot-password']
const HOME_PATH = '/muroom/home'

export function AuthNavHeader() {
  const router = useRouter()
  const pathname = usePathname()

  const isEntryPath = ENTRY_PATHS.includes(pathname)

  const handleBack = () => {
    if (isEntryPath) {
      router.push(HOME_PATH)
    } else {
      router.back()
    }
  }

  return (
    <div className='border-0.5 border-stroke-header flex items-center justify-between border-b px-5 py-4'>
      <button
        type='button'
        onClick={handleBack}
        aria-label='뒤로가기'
        className='flex size-6 items-center justify-center text-gray-800'
      >
        <LeftarrowIcon className='size-full' />
      </button>
      <button
        type='button'
        onClick={() => router.push(HOME_PATH)}
        aria-label='닫기'
        className='desktop:flex hidden size-6 items-center justify-center text-gray-800'
      >
        <CloseIcon className='size-full' />
      </button>
    </div>
  )
}
