'use client';

import { useEffect, useRef, useState } from 'react';

import { toast } from 'sonner';

import { Spinner } from '@muroom/components';

import PageWrapper from '@/components/common/page-wrapper';
import {
  useCreateStudioBoastsCommentsMutation,
  useEditStudioBoastsCommentsMutation,
} from '@/hooks/api/studio-boasts/comments/useMutations';
import { useStudioBoastsCommentsQuery } from '@/hooks/api/studio-boasts/comments/useQueries';
import { StudioBoastsCommentDto } from '@/types/studio-boasts/comments';
import { extractInfiniteData } from '@/utils/query';

import CommentTextBox from '../../comment-text-box';
import BoastCommentCard from '../comment-card';

interface Props {
  studioBoastId: string;
  isOpen: boolean;
  onClose: () => void;
}

type InputMode = 'create' | 'reply' | 'edit';

interface TargetData {
  id: string;
  nickname?: string;
  content?: string;
  isSecret?: boolean;
}

const MOBILE_PAGE_SIZE = 5;

export default function MobileBoastCommentList({
  studioBoastId,
  isOpen,
  onClose,
}: Props) {
  const observerRef = useRef<HTMLDivElement>(null);

  // --- [State] ---
  const [mode, setMode] = useState<InputMode>('create');
  const [target, setTarget] = useState<TargetData | null>(null);

  const [content, setContent] = useState('');
  const [isSecret, setIsSecret] = useState(false);

  const [focusTrigger, setFocusTrigger] = useState(0);

  // --- [Queries] ---
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useStudioBoastsCommentsQuery(
      { studioBoastId },
      { page: 1, size: MOBILE_PAGE_SIZE, isMobile: true },
    );

  // --- [Mutations] ---
  const { mutate: createComment, isPending: isCreating } =
    useCreateStudioBoastsCommentsMutation();
  const { mutate: editComment, isPending: isEditing } =
    useEditStudioBoastsCommentsMutation();

  const { content: commentList, pagination } =
    extractInfiniteData<StudioBoastsCommentDto>(data, true);

  // --- [Scroll Helper] ---
  const scrollToTarget = (targetId?: string) => {
    setTimeout(() => {
      if (!targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const element = document.getElementById(`comment-${targetId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // --- [Handlers] ---
  const handleResetMode = () => {
    setMode('create');
    setTarget(null);
    setContent('');
    setIsSecret(false);

    // ✅ 모바일 키보드 닫기 (등록 완료 시 포커스 강제 해제)
    setTimeout(() => {
      if (
        typeof window !== 'undefined' &&
        document.activeElement instanceof HTMLElement
      ) {
        document.activeElement.blur();
      }
    }, 0);
  };

  const handleReplyClick = (commentId: string, nickname: string) => {
    setMode('reply');
    setTarget({ id: commentId, nickname });
    setContent('');
    setIsSecret(false);

    setFocusTrigger((prev) => prev + 1);
    scrollToTarget(commentId);
  };

  const handleEditClick = (
    commentId: string,
    prevContent: string,
    prevSecret: boolean,
  ) => {
    setMode('edit');
    setTarget({ id: commentId, content: prevContent, isSecret: prevSecret });
    setContent(prevContent);
    setIsSecret(prevSecret);

    setFocusTrigger((prev) => prev + 1);
    scrollToTarget(commentId);
  };

  // --- [Submit Handler] ---
  const handleSubmit = () => {
    if (!content.trim()) return;

    if (mode === 'create') {
      createComment(
        { studioBoastId, content, isSecret, parentId: '', taggedUserId: '' },
        {
          onSuccess: () => {
            handleResetMode();
            scrollToTarget();
            toast.success('댓글이 등록되었습니다.');
          },
          onError: (err) => console.error(err.message),
        },
      );
      return;
    }

    if (mode === 'reply' && target) {
      const parentId = target.id;
      createComment(
        { studioBoastId, content, isSecret, parentId, taggedUserId: '' },
        {
          onSuccess: () => {
            handleResetMode();
            scrollToTarget(parentId);
            toast.success('답글이 등록되었습니다.');
          },
          onError: (err) => console.error(err.message),
        },
      );
      return;
    }

    if (mode === 'edit' && target) {
      const targetId = target.id;
      editComment(
        { studioBoastId, commentId: targetId, content, isSecret },
        {
          onSuccess: () => {
            handleResetMode();
            scrollToTarget(targetId);
            toast.success('댓글이 수정되었습니다.');
          },
          onError: (err) => console.error(err.message),
        },
      );
      return;
    }
  };

  // --- [Observer] ---
  useEffect(() => {
    const element = observerRef.current;
    if (!element || !hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) fetchNextPage();
      },
      { threshold: 1.0 },
    );
    observer.observe(element);
    return () => element && observer.unobserve(element);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isOpen]);

  if (!isOpen) return null;

  return (
    <PageWrapper
      isMobile
      isHeader={{
        title: `댓글 ${pagination?.totalElements ?? 0}`,
        onBackClick: onClose,
      }}
      className='fixed inset-0 z-[9999] bg-white'
      contentClassName='py-6 px-5'
      isModal
      bottomFixedSlotClassName='p-0'
      bottomFixedSlot={
        <CommentTextBox
          isMobile
          content={content}
          onContentChange={setContent}
          isSecret={isSecret}
          onSecretChange={setIsSecret}
          onSubmit={handleSubmit}
          isPending={isCreating || isEditing}
          onCancel={handleResetMode}
          forceExpand={mode !== 'create'}
          focusTrigger={focusTrigger}
        />
      }
    >
      <ul className='flex flex-col gap-y-10'>
        {commentList.length === 0 ? (
          <li className='py-10 text-center text-gray-400'>
            등록된 댓글이 없습니다.
          </li>
        ) : (
          commentList.map((comment) => (
            <li key={comment.id} id={`comment-${comment.id}`}>
              <BoastCommentCard
                isMobile
                studioBoastId={studioBoastId}
                commentData={comment}
                onReplyClick={handleReplyClick}
                onEditClick={handleEditClick}
              />
            </li>
          ))
        )}
      </ul>

      {(isLoading || hasNextPage) && (
        <div ref={observerRef} className='flex-center w-full py-6'>
          {isFetchingNextPage && <Spinner variant='component' />}
        </div>
      )}
    </PageWrapper>
  );
}
