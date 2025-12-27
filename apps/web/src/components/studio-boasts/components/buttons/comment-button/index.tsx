import { CommentIcon } from '@muroom/icons';

import StudioBoastsButtonWrapper from '../button-wrapper';

interface Props {
  isMobile?: boolean;
  commentCount: number;
}
export default function StudioBoastsCommentButton({
  isMobile = false,
  commentCount,
}: Props) {
  return (
    <StudioBoastsButtonWrapper isMobile={isMobile}>
      <CommentIcon className='size-6' />
      <span className='text-base-m-14-1'>{commentCount}</span>
    </StudioBoastsButtonWrapper>
  );
}
