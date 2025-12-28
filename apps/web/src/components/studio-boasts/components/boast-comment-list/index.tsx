import DesktopBoastCommentList from './desktop';
import MobileBoastCommentList from './mobile';

interface CommonProps {
  studioBoastId: string;
}

interface MobileProps extends CommonProps {
  isMobile: true;
  isOpen: boolean;
  onClose: () => void;
}

interface DesktopProps extends CommonProps {
  isMobile?: false;
}

type Props = MobileProps | DesktopProps;

export default function BoastCommentList(props: Props) {
  if (props.isMobile) {
    return <MobileBoastCommentList {...props} />;
  }

  return <DesktopBoastCommentList {...props} />;
}
