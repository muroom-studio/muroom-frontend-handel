import BottomNav from './bottom-nav'
import DesktopHeader from './desktop-header'

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex min-h-dvh flex-col'>
      <div className='desktop:block hidden'>
        <DesktopHeader />
      </div>

      <main className='flex flex-1 flex-col'>{children}</main>

      <div className='desktop:hidden'>
        <BottomNav />
      </div>
    </div>
  )
}
