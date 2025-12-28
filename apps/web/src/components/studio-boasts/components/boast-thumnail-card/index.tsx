'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ToggleButton } from '@muroom/components';
import { HeartIcon } from '@muroom/icons';

import {
  useStudioBoastsLikeMutation,
  useStudioBoastsUnlikeMutation,
} from '@/hooks/api/studio-boasts/useMutations';
import { useAuthCheck } from '@/hooks/auth/useAuthCheck';
import { LoginLink } from '@/hooks/auth/useAuthRedirect';

interface Props {
  targetedId: string;
  thumbnailSrcUrl: string;
  isLike?: boolean;
}

export default function BoastThumbnailCard({
  targetedId,
  thumbnailSrcUrl,
  isLike = false,
}: Props) {
  const router = useRouter();
  const { isLoggedIn } = useAuthCheck();

  const { mutate: likeBoast } = useStudioBoastsLikeMutation();
  const { mutate: unlikeBoast } = useStudioBoastsUnlikeMutation();

  const handleToggleLike = (newState: boolean) => {
    if (newState) {
      likeBoast({ studioBoastId: targetedId });
    } else {
      unlikeBoast({ studioBoastId: targetedId });
    }
  };

  return (
    <div
      onClick={() => router.push(`/studio-boasts/${targetedId}`)}
      className='relative aspect-square w-full cursor-pointer overflow-hidden transition-all hover:scale-105'
    >
      <Image
        src={thumbnailSrcUrl}
        alt={`${thumbnailSrcUrl}-썸네일`}
        fill
        className='object-cover'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />

      <div className='absolute right-4 top-4'>
        {!isLoggedIn ? (
          <LoginLink
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className='pointer-events-none'>
              <ToggleButton
                variant='outline_icon'
                selected={isLike}
                onSelectedChange={() => {}}
                className={`${isLike ? 'bg-primary-400' : 'bg-gray-300'} rounded-1000 size-6 border-none text-white`}
              >
                <HeartIcon />
              </ToggleButton>
            </div>
          </LoginLink>
        ) : (
          <div onClick={(e) => e.stopPropagation()}>
            <ToggleButton
              variant='outline_icon'
              selected={isLike}
              onSelectedChange={handleToggleLike}
              className={`${isLike ? 'bg-primary-400' : 'bg-gray-300'} rounded-1000 size-6 border-none text-white`}
            >
              <HeartIcon />
            </ToggleButton>
          </div>
        )}
      </div>
    </div>
  );
}
