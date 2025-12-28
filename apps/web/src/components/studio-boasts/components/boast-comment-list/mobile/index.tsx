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
        // 타겟이 없으면(새 댓글 작성 후) 맨 위로
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const element = document.getElementById(`comment-${targetId}`);
      if (element) {
        // 해당 댓글이 화면 중앙에 오도록 스크롤
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
  };

  const handleReplyClick = (commentId: string, nickname: string) => {
    setMode('reply');
    setTarget({ id: commentId, nickname });
    setContent('');
    setIsSecret(false);
    // 버튼 누르자마자 해당 댓글 위치로 스크롤
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
    // 버튼 누르자마자 해당 댓글 위치로 스크롤
    scrollToTarget(commentId);
  };

  // --- [Submit Handler] ---
  const handleSubmit = () => {
    if (!content.trim()) return;

    // 1. [Create] 새 댓글 -> 맨 위로
    if (mode === 'create') {
      createComment(
        {
          studioBoastId,
          content,
          isSecret,
          parentId: '',
          taggedUserId: '',
        },
        {
          onSuccess: () => {
            handleResetMode();
            scrollToTarget();
            toast.success('댓글이 등록되었습니다.');
          },
          onError: (err) => toast.error(err.message),
        },
      );
      return;
    }

    // 2. [Reply] 답글 -> 부모 댓글 위치로
    if (mode === 'reply' && target) {
      const parentId = target.id;
      createComment(
        {
          studioBoastId,
          content,
          isSecret,
          parentId,
          taggedUserId: '',
        },
        {
          onSuccess: () => {
            handleResetMode();
            scrollToTarget(parentId);
            toast.success('답글이 등록되었습니다.');
          },
          onError: (err) => toast.error(err.message),
        },
      );
      return;
    }

    // 3. [Edit] 수정 -> 수정된 댓글 위치로
    if (mode === 'edit' && target) {
      const targetId = target.id;
      editComment(
        {
          studioBoastId,
          commentId: targetId,
          content,
          isSecret,
        },
        {
          onSuccess: () => {
            handleResetMode();
            scrollToTarget(targetId);
            toast.success('댓글이 수정되었습니다.');
          },
          onError: (err) => toast.error(err.message),
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
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isOpen]);

  const getPlaceholder = () => {
    if (mode === 'reply') return `@${target?.nickname} 님에게 답글 남기기`;
    if (mode === 'edit') return '댓글 수정하기...';
    return '공감이 된다면 같이 이야기 해볼까요?';
  };

  if (!isOpen) return null;

  return (
    <PageWrapper
      isMobile
      isHeader={{
        title: `댓글 ${pagination?.totalElements ?? 0}`,
        onBackClick: onClose,
      }}
      className='fixed inset-0 z-[9999] bg-white'
      contentClassName='pt-6'
      isModal
      bottomSlotClassName='p-0'
      bottomSlot={
        <div className='bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]'>
          {mode !== 'create' && (
            <div className='flex items-center justify-between border-t border-gray-100 bg-gray-50 px-5 py-2 text-xs text-gray-500'>
              <span>
                {mode === 'reply'
                  ? `'${target?.nickname}'님께 답글 작성 중`
                  : '댓글 수정 중'}
              </span>
              <button
                onClick={handleResetMode}
                className='font-medium text-gray-800 underline'
              >
                취소
              </button>
            </div>
          )}

          <CommentTextBox
            isMobile
            content={content}
            onContentChange={setContent}
            isSecret={isSecret}
            onSecretChange={setIsSecret}
            onSubmit={handleSubmit}
            isPending={isCreating || isEditing}
            placeholder={getPlaceholder()}
            onCancel={handleResetMode}
            // ✅ 답글/수정 모드일 때 강제 확장 & 포커스
            forceExpand={mode !== 'create'}
          />
        </div>
      }
    >
      <ul className='flex flex-col gap-y-10'>
        {commentList.length === 0 ? (
          <li className='py-10 text-center text-gray-400'>
            등록된 댓글이 없습니다.
          </li>
        ) : (
          commentList.map((comment) => (
            // ✅ 스크롤 이동을 위한 ID 부여
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
