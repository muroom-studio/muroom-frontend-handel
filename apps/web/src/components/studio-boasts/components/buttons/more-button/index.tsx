import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { Popover } from '@muroom/components';
import { MoreDotIcon } from '@muroom/icons';

import { useDeleteStudioBoastsMutation } from '@/hooks/api/studio-boasts/useMutations';

import ReportAlert from '../../report-alert';
import StudioBoastsButtonWrapper from '../button-wrapper';

interface Props {
  isMobile?: boolean;
  onSelf?: boolean;
  studioBoastId: string;
  instrumentDescription: string;
  nickname: string;
}

export default function StudioBoastsMoreButton({
  isMobile = false,
  onSelf = false,
  studioBoastId,
  instrumentDescription,
  nickname,
}: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: deleteMutateAsync } = useDeleteStudioBoastsMutation();

  const deleteHandler = async () => {
    deleteMutateAsync(
      { studioBoastId },
      {
        onSuccess: () => {
          toast.success('해당 글이 성공적으로 삭제되었습니다.');

          if (!isMobile) {
            router.replace('/studio-boasts');
          }
        },
        onError: () => toast.error('삭제가 실패했습니다.'),
      },
    );
  };

  const [openReportAlert, setOpenReportAlert] = useState(false);

  const selfOptions = [
    {
      id: 'o1',
      label: '수정하기',
      action: () => router.push(`/studio-boasts/edit/${studioBoastId}`),
    },
    {
      id: 'o2',
      label: '삭제하기',
      action: deleteHandler,
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
          <StudioBoastsButtonWrapper active={isOpen} isMobile={isMobile}>
            <MoreDotIcon className='size-6' />
          </StudioBoastsButtonWrapper>
        </Popover.Trigger>
        <Popover.Content align='start' className='w-23.5'>
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
      />
    </>
  );
}
