'use client';

import { useState } from 'react';

import { Pagination } from '@muroom/components';

import { useCreateStudioBoastsCommentsMutation } from '@/hooks/api/studio-boasts/comments/useMutations';
import { useStudioBoastsCommentsQuery } from '@/hooks/api/studio-boasts/comments/useQueries';
import { useAuthCheck } from '@/hooks/auth/useAuthCheck';
import { LoginLink } from '@/hooks/auth/useAuthRedirect';
import { StudioBoastsCommentDto } from '@/types/studio-boasts/comments';
import { extractInfiniteData } from '@/utils/query';

import CommentTextBox from '../../comment-text-box';
import BoastCommentCard from '../comment-card';

interface Props {
  studioBoastId: string;
}

const PAGE_SIZE = 5;

export default function DesktopBoastCommentList({ studioBoastId }: Props) {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState('');
  const [isSecret, setIsSecret] = useState(false);

  const { data: studioBoastsCommentsData } = useStudioBoastsCommentsQuery(
    { studioBoastId },
    {
      page,
      size: PAGE_SIZE,
      isMobile: false,
    },
  );

  const { mutate: createComment, isPending: isCreating } =
    useCreateStudioBoastsCommentsMutation();

  const handleSubmit = () => {
    if (!content.trim()) return;

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
          setContent('');
          setIsSecret(false);
          setPage(1);
        },
      },
    );
  };

  const { content: commentList, pagination } =
    extractInfiniteData<StudioBoastsCommentDto>(
      studioBoastsCommentsData,
      false,
    );

  const { isLoggedIn } = useAuthCheck();

  return (
    <div className='flex flex-col gap-y-10'>
      <div className='flex flex-col gap-y-6'>
        <p className='text-base-l-16-2 flex items-center gap-x-1'>
          댓글
          <span className='text-primary-500'>
            {pagination?.totalElements ?? 0}
          </span>
        </p>
        {isLoggedIn ? (
          <CommentTextBox
            content={content}
            onContentChange={setContent}
            isSecret={isSecret}
            onSecretChange={setIsSecret}
            onSubmit={handleSubmit}
            isPending={isCreating}
          />
        ) : (
          <LoginLink>
            <CommentTextBox
              content={content}
              onContentChange={setContent}
              isSecret={isSecret}
              onSecretChange={setIsSecret}
              onSubmit={handleSubmit}
              isPending={isCreating}
            />
          </LoginLink>
        )}
      </div>

      <ul className='flex flex-col gap-y-10'>
        {commentList.length === 0 ? (
          <li className='py-10 text-center text-gray-400'>
            등록된 댓글이 없습니다.
          </li>
        ) : (
          commentList.map((comment) => (
            <li key={comment.id}>
              <BoastCommentCard
                studioBoastId={studioBoastId}
                commentData={comment}
              />
            </li>
          ))
        )}
      </ul>

      {pagination && pagination.totalElements > 5 && (
        <div className='mt-4'>
          <Pagination
            currentPage={page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
