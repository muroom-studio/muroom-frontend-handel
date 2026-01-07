'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { useReportReasonsQuery } from '@/hooks/api/report/useQueries';
import { useStudioBoastsCommentsReportMutation } from '@/hooks/api/studio-boasts/comments/useMutations';
import { useStudioBoastsReportMutation } from '@/hooks/api/studio-boasts/useMutations';

import DesktopReportAlert from './desktop';
import MobileReportAlert from './mobile';

interface Props {
  isMobile?: boolean;
  isOpen: boolean;
  onClose: () => void;
  studioBoastId: string;
  instrumentDescription: string;
  nickname: string;
  isComment?: boolean;
  commentId?: string;
}

export default function ReportAlert({
  isMobile = false,
  isOpen,
  onClose,
  studioBoastId,
  instrumentDescription,
  nickname,
  isComment = false,
  commentId,
}: Props) {
  const router = useRouter();
  const [selectedReason, setSelectedReason] = useState({ id: '', name: '' });
  const [description, setDescription] = useState('');

  const { data: reportReasonData } = useReportReasonsQuery();

  const {
    mutate: studioBoastsReportMutate,
    isPending: isStudioBoastsReportPending,
  } = useStudioBoastsReportMutation();
  const {
    mutate: studioBoastsCommentsReportMutate,
    isPending: isStudioBoastsCommentsReportPending,
  } = useStudioBoastsCommentsReportMutation();

  const handleResetAndClose = () => {
    setSelectedReason({ id: '', name: '' });
    setDescription('');
    onClose();
  };

  const handleFinalSubmit = () => {
    if (isComment && commentId) {
      studioBoastsCommentsReportMutate(
        {
          studioBoastId,
          commentId,
          reportReasonId: selectedReason.id,
          description,
        },
        {
          onSuccess: () => {
            toast.success('해당 댓글이 신고처리되었습니다.');
            handleResetAndClose();
          },
          onError: () => {
            handleResetAndClose();
          },
        },
      );
      return;
    }

    studioBoastsReportMutate(
      {
        studioBoastId,
        reportReasonId: Number(selectedReason.id),
        description,
      },
      {
        onSuccess: () => {
          toast.success('해당 글이 신고처리되었습니다.');
          handleResetAndClose();

          if (!isMobile) {
            router.back();
          }
        },
        onError: () => {
          handleResetAndClose();
        },
      },
    );
  };

  const isValid =
    studioBoastId !== '' &&
    selectedReason.id !== '' &&
    description !== '' &&
    (!isComment || (isComment && !!commentId));

  const commonProps = {
    isOpen,
    onClose: handleResetAndClose,
    onFinalSubmit: handleFinalSubmit,
    isValid,
    formProps: {
      isMobile,
      instrumentDescription,
      nickname,
      reasonData: reportReasonData,
      selectedReasonName: selectedReason.name,
      description,
      onReasonChange: (id: string, name: string) =>
        setSelectedReason({ id, name }),
      onDescriptionChange: setDescription,
    },
    isLoading:
      isStudioBoastsCommentsReportPending || isStudioBoastsReportPending,
  };

  if (isMobile) {
    return <MobileReportAlert {...commonProps} />;
  }

  return <DesktopReportAlert {...commonProps} />;
}
