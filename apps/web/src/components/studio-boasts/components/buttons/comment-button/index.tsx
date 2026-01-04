import { CommentIcon } from '@muroom/icons';

import StudioBoastsButtonWrapper from '../button-wrapper';

interface Props {
  isMobile?: boolean;
  isComment?: boolean;
  commentCount?: number;
  onClick?: () => void;
}

export default function StudioBoastsCommentButton({
  isMobile = false,
  isComment = false,
  commentCount,
  onClick,
}: Props) {
  return (
    <StudioBoastsButtonWrapper
      isMobile={isMobile}
      variant={isComment ? 'comment' : 'fill'}
      onClick={onClick}
    >
      <CommentIcon className='size-6' />
      {commentCount && <span className='text-base-m-14-1'>{commentCount}</span>}
    </StudioBoastsButtonWrapper>
  );
}
