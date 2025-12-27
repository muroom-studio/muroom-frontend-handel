import { useState } from 'react';

import { Popover } from '@muroom/components';
import { MoreDotIcon } from '@muroom/icons';

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
  const [isOpen, setIsOpen] = useState(false);

  const [openReportAlert, setOpenReportAlert] = useState(false);

  const selfOptions = [
    {
      id: 'o1',
      label: '수정하기',
      action: () => console.log('수정하기 붙이자'),
    },
    {
      id: 'o2',
      label: '삭제하기',
      action: () => console.log('삭제하기 붙이자'),
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
