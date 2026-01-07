'use client';

import { useState } from 'react';

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  ModalBottomSheet,
  RequiredText,
  TextBox,
  UserBaseInfoLabel,
} from '@muroom/components';
import { DownArrowIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import { ReportReasonItem } from '@/types/report';

interface Props {
  isMobile?: boolean;
  instrumentDescription: string;
  nickname: string;
  reasonData?: ReportReasonItem[];
  selectedReasonName: string;
  description: string;
  onReasonChange: (id: string, name: string) => void;
  onDescriptionChange: (val: string) => void;
}

export default function ReportFormContent({
  isMobile,
  instrumentDescription,
  nickname,
  reasonData,
  selectedReasonName,
  description,
  onReasonChange,
  onDescriptionChange,
}: Props) {
  const [isMobileModalSheetOpen, setIsMobileModalSheetOpen] = useState(false);

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
        {isMobile ? (
          <>
            <button
              type='button'
              onClick={() => setIsMobileModalSheetOpen(true)}
              className={cn(
                'rounded-4 group flex h-9 w-fit shrink-0 cursor-pointer items-center gap-x-1 truncate border border-gray-300 bg-white px-3 py-[9px] text-start transition-all',
                'hover:bg-gray-50',
                {
                  'border-primary-400 bg-primary-50 !text-primary-600':
                    selectedReasonName,
                },
              )}
            >
              <span className='text-base-m-14-1 truncate'>
                {selectedReasonName || '신고유형을 선택해주세요'}
              </span>
              <DownArrowIcon
                className={cn(
                  'size-5 transition-transform duration-200',
                  isMobileModalSheetOpen && 'rotate-180',
                )}
              />
            </button>
            <ModalBottomSheet
              isOpen={isMobileModalSheetOpen}
              onClose={() => setIsMobileModalSheetOpen(false)}
              className='pb-safe'
            >
              <div className='flex flex-col'>
                {reasonData?.map((reason) => {
                  const isSelected = selectedReasonName === reason.name;

                  return (
                    <button
                      key={reason.id}
                      type='button'
                      onClick={() => {
                        if (isSelected) {
                          onReasonChange('', '');
                        } else {
                          onReasonChange(reason.id, reason.name);
                        }
                        setIsMobileModalSheetOpen(false);
                      }}
                      className={cn(
                        'flex w-full items-center justify-between border-b border-gray-100 py-4 text-left transition-colors last:border-none hover:bg-gray-50',
                        isSelected && 'text-primary-600 font-medium',
                      )}
                    >
                      <span className='text-base-l-16-1'>{reason.name}</span>
                    </button>
                  );
                })}
              </div>
            </ModalBottomSheet>
          </>
        ) : (
          <Dropdown
            label={selectedReasonName || '신고유형을 선택해주세요'}
            value={selectedReasonName || ''}
            onValueChange={(val) => {
              if (val === '') {
                onReasonChange('', '');
                return;
              }
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
        )}
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
