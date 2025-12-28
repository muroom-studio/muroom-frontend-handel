'use client';

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  RequiredText,
  TextBox,
  UserBaseInfoLabel,
} from '@muroom/components';

import { ReportReasonItem } from '@/types/report';

interface Props {
  instrumentDescription: string;
  nickname: string;
  reasonData?: ReportReasonItem[];
  selectedReasonName: string;
  description: string;
  onReasonChange: (id: string, name: string) => void;
  onDescriptionChange: (val: string) => void;
}

export default function ReportFormContent({
  instrumentDescription,
  nickname,
  reasonData,
  selectedReasonName,
  description,
  onReasonChange,
  onDescriptionChange,
}: Props) {
  return (
    <div className='flex flex-col gap-y-5'>
      <div className='flex flex-col gap-y-3'>
        <span className='text-base-l-16-2'>신고대상</span>
        <UserBaseInfoLabel
          instrumentDescription={instrumentDescription}
          nickname={nickname}
        />
      </div>

      <div className='flex flex-col gap-y-3'>
        <RequiredText className='text-base-l-16-2'>신고유형</RequiredText>
        <Dropdown
          value={selectedReasonName || ''}
          onValueChange={(val) => {
            const target = reasonData?.find((r) => r.name === val);
            if (target) onReasonChange(String(target.id), target.name);
          }}
          placeholder='신고유형을 선택해주세요'
          className='w-full'
        >
          <DropdownTrigger variant='primary' size='m' />

          <DropdownContent>
            {reasonData?.map((reason) => (
              <DropdownItem key={reason.id} value={reason.name}>
                {reason.name}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
      </div>

      <div className='flex flex-col gap-y-3'>
        <RequiredText htmlFor='DESCRIPTION' className='text-base-l-16-2'>
          신고내용
        </RequiredText>
        <TextBox
          id='DESCRIPTION'
          placeholder='타당한 사유없이 허위 신고시 신고자에 대한 활동 제한이 될 수 있으며, 신고 전 신중하게 작성을 고려해주세요'
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>
    </div>
  );
}
