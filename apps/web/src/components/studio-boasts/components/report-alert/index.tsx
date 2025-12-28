'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { useReportReasonQuery } from '@/hooks/api/report/useQueries';
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
}

export default function ReportAlert({
  isMobile = false,
  isOpen,
  onClose,
  studioBoastId,
  instrumentDescription,
  nickname,
}: Props) {
  const router = useRouter();
  const [selectedReason, setSelectedReason] = useState({ id: '', name: '' });
  const [description, setDescription] = useState('');

  const { data: reportReasonData } = useReportReasonQuery();
  const { mutate: studioBoastsReportMutate } = useStudioBoastsReportMutation();

  const handleResetAndClose = () => {
    setSelectedReason({ id: '', name: '' });
    setDescription('');
    onClose();
  };

  const handleFinalSubmit = () => {
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
          toast.error('신고처리가 실패했습니다.');
          handleResetAndClose();
        },
      },
    );
  };

  const isValid =
    studioBoastId !== '' && selectedReason.id !== '' && description !== '';

  const commonProps = {
    isOpen,
    onClose: handleResetAndClose,
    onFinalSubmit: handleFinalSubmit,
    isValid,
    formProps: {
      instrumentDescription,
      nickname,
      reasonData: reportReasonData,
      selectedReasonName: selectedReason.name,
      description,
      onReasonChange: (id: string, name: string) =>
        setSelectedReason({ id, name }),
      onDescriptionChange: setDescription,
    },
  };
  console.log(selectedReason.name);

  // 6. 렌더링 분기
  if (isMobile) {
    return <MobileReportAlert {...commonProps} />;
  }

  return <DesktopReportAlert {...commonProps} />;
}
