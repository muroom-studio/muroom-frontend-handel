'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { Popover } from '@muroom/components';
import { MoreDotIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import { useDeleteStudioBoastsCommentsMutation } from '@/hooks/api/studio-boasts/comments/useMutations';
import { useDeleteStudioBoastsMutation } from '@/hooks/api/studio-boasts/useMutations';

import ReportAlert from '../../report-alert';
import StudioBoastsButtonWrapper from '../button-wrapper';

interface Props {
  isMobile?: boolean;
  isComment?: boolean;
  onSelf?: boolean;
  studioBoastId: string;
  instrumentDescription?: string;
  nickname?: string;
  commentId?: string;
  onEdit?: () => void;
}

export default function StudioBoastsMoreButton({
  isMobile = false,
  isComment = false,
  onSelf = false,
  studioBoastId,
  instrumentDescription = '',
  nickname = '',
  commentId,
  onEdit,
}: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [openReportAlert, setOpenReportAlert] = useState(false);

  const { mutateAsync: deletePostMutate } = useDeleteStudioBoastsMutation();
  const { mutateAsync: deleteCommentMutate } =
    useDeleteStudioBoastsCommentsMutation();

  const handleDelete = async () => {
    if (isComment) {
      if (!commentId) return toast.error('댓글 ID가 없습니다.');

      await deleteCommentMutate(
        { studioBoastId, commentId },
        {
          onSuccess: () => toast.success('댓글이 삭제되었습니다.'),
          onError: () => toast.error('댓글 삭제 실패'),
        },
      );
      return;
    }

    await deletePostMutate(
      { studioBoastId },
      {
        onSuccess: () => {
          toast.success('게시글이 삭제되었습니다.');
          if (!isMobile) {
            router.replace('/studio-boasts');
          }
        },
        onError: () => toast.error('삭제 실패'),
      },
    );
  };

  // 3. 옵션 메뉴 설정
  const selfOptions = [
    {
      id: 'o1',
      label: '수정하기',
      action: () => {
        if (isComment) {
          onEdit?.();
          setIsOpen(false);
        } else {
          router.push(`/studio-boasts/edit/${studioBoastId}`);
        }
      },
    },
    {
      id: 'o2',
      label: '삭제하기',
      action: handleDelete,
    },
  ];

  const otherOptions = [
    {
      id: 'o3',
      label: '신고하기',
      action: () => setOpenReportAlert(true),
    },
  ];

  const options = onSelf ? selfOptions : otherOptions;

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger>
          <StudioBoastsButtonWrapper
            active={isOpen}
            isMobile={isMobile}
            variant={isComment ? 'comment' : 'fill'}
          >
            <MoreDotIcon
              className={cn('size-6', {
                'size-5 text-gray-400': isMobile || isComment,
              })}
            />
          </StudioBoastsButtonWrapper>
        </Popover.Trigger>
        <Popover.Content align='end' className='w-23.5'>
          <Popover.MenuContainer>
            {options.map((option) => (
              <Popover.MenuItem key={option.id} onClick={option.action}>
                {option.label}
              </Popover.MenuItem>
            ))}
          </Popover.MenuContainer>
        </Popover.Content>
      </Popover>

      <ReportAlert
        isMobile={isMobile}
        isOpen={openReportAlert}
        onClose={() => setOpenReportAlert(false)}
        studioBoastId={studioBoastId}
        instrumentDescription={instrumentDescription}
        nickname={nickname}
        isComment={isComment}
        commentId={commentId}
      />
    </>
  );
}
