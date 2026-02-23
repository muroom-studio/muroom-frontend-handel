'use client';

import { useEffect, useRef, useState } from 'react';

import { ReplyArrowIcon } from '@muroom/icons';

import CommentTextBox from '@/components/studio-boasts/components/comment-text-box';
import { useCreateStudioBoastsCommentsMutation } from '@/hooks/api/studio-boasts/comments/useMutations';

interface Props {
  isMobile?: boolean;
  studioBoastId: string;
  parentId: string;
  taggedUserId: string;
  taggedUserNickname: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function BoastCommentsReplyForm({
  isMobile = false,
  studioBoastId,
  parentId,
  taggedUserId,
  taggedUserNickname,
  onCancel,
  onSuccess,
}: Props) {
  const [content, setContent] = useState('');
  const [isSecret, setIsSecret] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const { mutate: createReply, isPending } =
    useCreateStudioBoastsCommentsMutation();

  useEffect(() => {
    if (!isMobile) {
      setTimeout(() => {
        const realTextarea = containerRef.current?.querySelector('textarea');

        realTextarea?.focus();
      }, 50); // 50ms 정도 여유를 줌
    }
  }, [isMobile]);

  const handleSubmit = () => {
    if (!content.trim()) return;

    createReply(
      {
        studioBoastId,
        content,
        isSecret,
        parentId,
        taggedUserId,
      },
      {
        onSuccess: () => {
          setContent('');
          setIsSecret(false);
          onSuccess();
        },
      },
    );
  };

  return (
    <div ref={containerRef} className='flex w-full items-start gap-x-1'>
      <div className='shrink-0'>
        <ReplyArrowIcon className='size-6 text-gray-400' />
      </div>

      <div className='flex-1'>
        <CommentTextBox
          isMobile={isMobile}
          taggedUserNickname={taggedUserNickname}
          content={content}
          onContentChange={setContent}
          isSecret={isSecret}
          onSecretChange={setIsSecret}
          onSubmit={handleSubmit}
          isPending={isPending}
          submitLabel='답글달기'
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}
