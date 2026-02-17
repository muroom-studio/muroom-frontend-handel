'use client';

import DesktopStudioBoastsPage from './desktop';
import MobileStudioBoastsPage from './mobile';

interface Props {
  isMobile?: boolean;
}

export default function StudioBoastsPage({ isMobile = false }: Props) {
  if (isMobile) {
    return <MobileStudioBoastsPage />;
  } else return <DesktopStudioBoastsPage />;
}
