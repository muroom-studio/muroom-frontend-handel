import { HeartOutlineIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import {
  useStudioBoastsLikeMutation,
  useStudioBoastsUnlikeMutation,
} from '@/hooks/api/studio-boasts/useMutations';

import StudioBoastsButtonWrapper from '../button-wrapper';

interface Props {
  isMobile?: boolean;
  studioBoastId: string;
  likeCount: number;
  onLikeSelf: boolean;
}

export default function StudioBoastsLikeButton({
  isMobile = false,
  studioBoastId,
  likeCount,
  onLikeSelf,
}: Props) {
  const { mutate: likeBoast } = useStudioBoastsLikeMutation();
  const { mutate: unlikeBoast } = useStudioBoastsUnlikeMutation();

  const handleToggleLike = (newState: boolean) => {
    if (newState) {
      unlikeBoast({ studioBoastId });
    } else {
      likeBoast({ studioBoastId });
    }
  };

  return (
    <StudioBoastsButtonWrapper
      isMobile={isMobile}
      variant='outline'
      onClick={() => handleToggleLike(onLikeSelf)}
    >
      <HeartOutlineIcon
        className={cn('size-6 transition-all', {
          'fill-primary-400 text-transparent': onLikeSelf,
        })}
      />
      <span className='text-base-m-14-1'>{likeCount}</span>
    </StudioBoastsButtonWrapper>
  );
}
