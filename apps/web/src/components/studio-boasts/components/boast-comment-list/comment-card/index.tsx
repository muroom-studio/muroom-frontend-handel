'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { Button, UserBaseInfoLabel } from '@muroom/components';
import { ReplyArrowIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';
import { getFormattedDate } from '@muroom/util';

import { useEditStudioBoastsCommentsMutation } from '@/hooks/api/studio-boasts/comments/useMutations';
import {
  StudioBoastsCommentDto,
  StudioBoastsReplyDto,
} from '@/types/studio-boasts/comments';
import BoastCommentsReplyForm from '@/types/studio-boasts/comments/reply-form';

import {
  StudioBoastsCommentButton,
  StudioBoastsLikeButton,
  StudioBoastsMoreButton,
} from '../../buttons';
import CommentTextBox from '../../comment-text-box';

interface Props {
  isMobile?: boolean;
  studioBoastId: string;
  commentData: StudioBoastsCommentDto | StudioBoastsReplyDto;
  isReply?: boolean;
  rootCommentId?: string;
  onReplyClick?: (id: string, nickname: string) => void;
  onEditClick?: (id: string, content: string, isSecret: boolean) => void;
}

export default function BoastCommentCard({
  isMobile = false,
  studioBoastId,
  commentData,
  isReply = false,
  rootCommentId,
  onReplyClick,
  onEditClick,
}: Props) {
  const replies = 'replies' in commentData ? commentData.replies : [];
  const { creatorUserInfo } = commentData;
  const currentRootId = isReply ? rootCommentId : commentData.id;

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(commentData.content);
  const [editIsSecret, setEditIsSecret] = useState(commentData.isSecret);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);

  const { mutate: updateComment, isPending: isUpdating } =
    useEditStudioBoastsCommentsMutation();

  // 수정 버튼 클릭 핸들러
  const handleStartEdit = () => {
    if (isMobile) {
      // ✅ 모바일이면 부모에게 요청 (여기서 onEditClick이 호출되어야 함)
      onEditClick?.(commentData.id, commentData.content, commentData.isSecret);
    } else {
      setEditContent(commentData.content);
      setEditIsSecret(commentData.isSecret);
      setIsEditing(true);
      setIsReplyFormOpen(false);
    }
  };

  const handleUpdateSubmit = () => {
    if (!editContent.trim()) return;
    updateComment(
      {
        studioBoastId,
        commentId: commentData.id,
        content: editContent,
        isSecret: editIsSecret,
      },
      {
        onSuccess: () => {
          toast.success('수정되었습니다.');
          setIsEditing(false);
        },
        onError: (err) => toast.error(err.message),
      },
    );
  };

  const handleReplyToggle = () => {
    if (isMobile) {
      const targetId =
        isReply && rootCommentId ? rootCommentId : commentData.id;
      onReplyClick?.(targetId, creatorUserInfo.nickname);
    } else {
      setIsReplyFormOpen((prev) => !prev);
    }
  };

  const renderCardContent = () => {
    if (!creatorUserInfo) {
      return (
        <div className='flex w-full flex-col gap-y-2 py-2'>
          <p className='text-base-l-16-1 text-gray-500'>비밀 댓글입니다.</p>
          {commentData.createdAt && (
            <span className='text-base-s-12-1 text-gray-400'>
              {getFormattedDate(commentData.createdAt, 'yy.MM.dd')}
            </span>
          )}
        </div>
      );
    }

    if (isEditing && !isMobile) {
      return (
        <CommentTextBox
          isMobile={isMobile}
          content={editContent}
          onContentChange={setEditContent}
          isSecret={editIsSecret}
          onSecretChange={setEditIsSecret}
          onSubmit={handleUpdateSubmit}
          isPending={isUpdating}
          submitLabel='수정완료'
          onCancel={() => setIsEditing(false)}
        />
      );
    }

    return (
      <div className='flex w-full flex-col gap-y-4'>
        <div className='flex-between'>
          <UserBaseInfoLabel
            instrumentDescription={
              creatorUserInfo.instrumentInfo?.description || ''
            }
            nickname={creatorUserInfo.nickname}
          />
          <StudioBoastsMoreButton
            isComment
            // ✅ [수정] isMobile prop을 더보기 버튼에도 전달 (혹시 모를 동작 차이 방지)
            isMobile={isMobile}
            onSelf={commentData.isWrittenByRequestUser}
            studioBoastId={studioBoastId}
            commentId={commentData.id}
            instrumentDescription={
              creatorUserInfo.instrumentInfo?.description || ''
            }
            nickname={creatorUserInfo.nickname}
            onEdit={handleStartEdit}
          />
        </div>

        <div className='flex flex-col gap-y-2'>
          <p className='text-base-l-16-1 whitespace-pre-wrap'>
            {commentData.content}
          </p>
          {commentData.createdAt && (
            <span className='text-base-s-12-1 text-gray-500'>
              {getFormattedDate(commentData.createdAt, 'yy.MM.dd')}
            </span>
          )}
        </div>

        <div className='flex items-center gap-x-3'>
          {isReply ? (
            <Button variant='outline' size='xs' onClick={handleReplyToggle}>
              답글쓰기
            </Button>
          ) : (
            <>
              <StudioBoastsLikeButton
                isComment
                commentId={commentData.id}
                studioBoastId={studioBoastId}
                likeCount={commentData.likeCount}
                onLikeSelf={commentData.isLikedByRequestUser}
              />
              <StudioBoastsCommentButton
                isComment
                commentCount={replies.length}
                onClick={handleReplyToggle}
              />
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='flex w-full flex-col gap-y-4'>
      <div className={cn('flex w-full items-start', isReply && 'gap-x-1')}>
        {isReply && (
          <div className='shrink-0'>
            <ReplyArrowIcon className='size-6 text-gray-400' />
          </div>
        )}
        <div className='min-w-0 flex-1'>{renderCardContent()}</div>
      </div>

      {!isMobile && isReplyFormOpen && currentRootId && creatorUserInfo && (
        <BoastCommentsReplyForm
          isMobile={isMobile}
          studioBoastId={studioBoastId}
          parentId={currentRootId}
          taggedUserId={creatorUserInfo.id}
          taggedUserNickname={creatorUserInfo.nickname}
          onCancel={() => setIsReplyFormOpen(false)}
          onSuccess={() => setIsReplyFormOpen(false)}
        />
      )}

      {/* ✅ [수정] 대댓글 리스트에도 ID wrapper 추가 (스크롤 타겟팅용) */}
      {!isReply && replies.length > 0 && (
        <div className='flex flex-col gap-y-6'>
          {replies.map((reply) => (
            <div key={reply.id} id={`comment-${reply.id}`} className='w-full'>
              <BoastCommentCard
                studioBoastId={studioBoastId}
                commentData={reply}
                isReply={true}
                rootCommentId={commentData.id}
                isMobile={isMobile}
                onReplyClick={onReplyClick}
                onEditClick={onEditClick}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
