'use client';

import DesktopPageWrapper, {
  Props as DesktopPageWrapperProps,
} from './desktop';
import MobilePageWrapper, { Props as MobilePageWrapperProps } from './mobile';

type PageWrapperProps =
  | ({ isMobile: true } & MobilePageWrapperProps)
  | ({ isMobile?: false } & DesktopPageWrapperProps);

export default function PageWrapper(props: PageWrapperProps) {
  if (props.isMobile) {
    const { isMobile, ...mobileProps } = props;
    return <MobilePageWrapper {...mobileProps} />;
  }

  const { isMobile, ...desktopProps } = props;
  return <DesktopPageWrapper {...desktopProps} />;
}
