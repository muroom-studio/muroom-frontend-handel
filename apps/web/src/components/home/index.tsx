import DesktopHomePage from '@/components/home/desktop';
import MobileHomePage from '@/components/home/mobile';

interface Props {
  isMobile: boolean;
}

export default function HomePage({ isMobile }: Props) {
  let content;

  content = isMobile ? <MobileHomePage /> : <DesktopHomePage />;

  return <main className='h-full'>{content}</main>;
}
