import {
  HeartOutlineIcon,
  ThumbsupOffIcon,
  ThumbsupOnIcon,
} from '@muroom/icons';
// [수정] 아이콘 import
import { cn } from '@muroom/lib';

import {
  useStudioBoastsCommentsLikeMutation,
  useStudioBoastsCommentsUnlikeMutation,
} from '@/hooks/api/studio-boasts/comments/useMutations';
import {
  useStudioBoastsLikeMutation,
  useStudioBoastsUnlikeMutation,
} from '@/hooks/api/studio-boasts/useMutations';

import StudioBoastsButtonWrapper from '../button-wrapper';

interface Props {
  isMobile?: boolean;
  isComment?: boolean;
  studioBoastId: string;
  commentId?: string;
  likeCount: number;
  onLikeSelf: boolean;
}

export default function StudioBoastsLikeButton({
  isMobile = false,
  isComment = false,
  studioBoastId,
  commentId,
  likeCount,
  onLikeSelf,
}: Props) {
  // 1. 게시글 좋아요 훅
  const { mutate: likePost } = useStudioBoastsLikeMutation();
  const { mutate: unlikePost } = useStudioBoastsUnlikeMutation();

  // 2. 댓글 좋아요 훅
  const { mutate: likeComment } = useStudioBoastsCommentsLikeMutation();
  const { mutate: unlikeComment } = useStudioBoastsCommentsUnlikeMutation();

  const handleToggleLike = () => {
    // A. 댓글 모드
    if (isComment) {
      if (!commentId) {
        console.error('Comment ID is missing for comment like action');
        return;
      }

      if (onLikeSelf) {
        unlikeComment({ studioBoastId, commentId });
      } else {
        likeComment({ studioBoastId, commentId });
      }
      return;
    }

    // B. 게시글 모드
    if (onLikeSelf) {
      unlikePost({ studioBoastId });
    } else {
      likePost({ studioBoastId });
    }
  };

  return (
    <StudioBoastsButtonWrapper
      isMobile={isMobile}
      variant={isComment ? 'comment' : 'outline'}
      onClick={handleToggleLike}
    >
      {/* ✅ 아이콘 분기 처리 */}
      {isComment ? (
        // [수정] 댓글 모드: On/Off 아이콘 스위칭
        onLikeSelf ? (
          <ThumbsupOnIcon className='size-5' />
        ) : (
          <ThumbsupOffIcon className='size-5' />
        )
      ) : (
        // 게시글 모드: 하트 아이콘
        <HeartOutlineIcon
          className={cn('size-6 transition-all', {
            'fill-primary-400 text-transparent': onLikeSelf,
          })}
        />
      )}

      <span className='text-base-m-14-1'>{likeCount}</span>
    </StudioBoastsButtonWrapper>
  );
}
