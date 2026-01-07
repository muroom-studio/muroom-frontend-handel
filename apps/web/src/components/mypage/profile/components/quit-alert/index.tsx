import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import {
  Alert,
  Button,
  Checkbox,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  ModalBottomSheet,
  RequiredText,
  TextBox,
} from '@muroom/components';
import { DownArrowIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import PageWrapper from '@/components/common/page-wrapper';
import { useWithdrawalMusicianMutation } from '@/hooks/api/withdrawal/useMutations';
import { useWithdrawalReasonQuery } from '@/hooks/api/withdrawal/useQueries';

import ContentWrapper from '../edit-alert/components/content-wrapper';

interface Props {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuitAlert({ isMobile, isOpen, onClose }: Props) {
  const router = useRouter();

  const [isMobileModalSheetOpen, setIsMobileModalSheetOpen] = useState(false);

  const [selectedReason, setSelectedReason] = useState({
    withdrawalReasonId: 0,
    description: '',
  });

  const [opinion, setOpinion] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const { data: withdrawalResonsData } = useWithdrawalReasonQuery();

  const { mutate: withdrawalMusiciansMutate } = useWithdrawalMusicianMutation();

  const handleConfirm = () => {
    withdrawalMusiciansMutate(
      {
        withdrawalReasonId: selectedReason.withdrawalReasonId,
        opinion,
      },
      {
        onSuccess: () => {
          toast.success('탈퇴 처리가 성공적으로 완료되었습니다.');
          onClose();
          router.push('/logout');
        },
      },
    );
  };

  const AlertContent = () => {
    return (
      <ContentWrapper description='탈퇴하기 전에 아래 안내 사항을 확인해주세요'>
        <div className='flex flex-col gap-y-5'>
          {/* 안내 문구 리스트 */}
          <ol className='flex list-decimal flex-col pl-4'>
            {WITHDRAWAL_GUIDES.map((text, index) => (
              <li
                key={index}
                className='text-base-m-14-1 break-keep text-gray-600'
              >
                {text}
              </li>
            ))}
          </ol>

          <div className='flex flex-col gap-y-3'>
            <RequiredText>탈퇴사유</RequiredText>

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
                        selectedReason.withdrawalReasonId !== 0,
                    },
                  )}
                >
                  <span className='text-base-m-14-1 truncate'>
                    {selectedReason.withdrawalReasonId === 0
                      ? '탈퇴유형을 선택해주세요'
                      : selectedReason.description}
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
                    {withdrawalResonsData?.map((reason) => {
                      const isSelected =
                        selectedReason.withdrawalReasonId !== 0 &&
                        selectedReason.description === reason.description;

                      return (
                        <button
                          key={reason.id}
                          type='button'
                          onClick={() => {
                            if (isSelected) {
                              setSelectedReason({
                                withdrawalReasonId: 0,
                                description: '',
                              });
                            } else {
                              setSelectedReason({
                                withdrawalReasonId: reason.id,
                                description: reason.description,
                              });
                            }
                            setIsMobileModalSheetOpen(false);
                          }}
                          className={cn(
                            'flex w-full items-center justify-between border-b border-gray-100 py-4 text-left transition-colors last:border-none hover:bg-gray-50',
                            isSelected && 'text-primary-600 font-medium',
                          )}
                        >
                          <span className='text-base-l-16-1'>
                            {reason.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </ModalBottomSheet>
              </>
            ) : (
              <Dropdown
                value={
                  selectedReason.description === '선택'
                    ? ''
                    : selectedReason.description
                }
                onValueChange={(val) => {
                  const targetReason = withdrawalResonsData?.find(
                    (reason) => reason.description === val,
                  );
                  setSelectedReason({
                    withdrawalReasonId: targetReason?.id || 0,
                    description: targetReason?.description || '',
                  });
                }}
                placeholder='탈퇴유형을 선택해주세요'
                className='w-full'
              >
                <DropdownTrigger variant='primary' size='m' />

                <DropdownContent className='max-h-73.75 overflow-y-auto'>
                  {withdrawalResonsData?.map((reason) => (
                    <DropdownItem key={reason.id} value={reason.description}>
                      {reason.description}
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>
            )}
          </div>

          <div className='flex flex-col gap-y-3'>
            <label htmlFor='EXTRA_TEXT' className='text-base-l-16-2'>
              추가의견
            </label>
            <TextBox
              id='EXTRA_TEXT'
              placeholder='추가적인 다른 사유가 있다면 입력해주세요'
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
            />
          </div>

          <Checkbox
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            label='안내사항을 모두 확인하였으며, 이에 동의합니다.'
          />
        </div>
      </ContentWrapper>
    );
  };

  if (isMobile) {
    return (
      <PageWrapper
        isMobile
        isHeader={{ title: '서비스 탈퇴', onBackClick: onClose }}
        className='fixed inset-0 z-50 bg-white'
        isModal
        bottomSlot={
          <div className='grid grid-cols-2 gap-x-3'>
            <Button variant='outline' size='xl' onClick={onClose}>
              취소하기
            </Button>
            <Button
              onClick={handleConfirm}
              variant='danger'
              size='xl'
              disabled={selectedReason.withdrawalReasonId === 0 || !isChecked}
            >
              탈퇴하기
            </Button>
          </div>
        }
      >
        {AlertContent()}
      </PageWrapper>
    );
  }

  return (
    <Alert
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      variant='negative'
      title='서비스 탈퇴'
      content={AlertContent()}
      confirmLabel='탈퇴하기'
      confirmDisabled={selectedReason.withdrawalReasonId === 0 || !isChecked}
    />
  );
}

// 안내 문구
const WITHDRAWAL_GUIDES = [
  '회원 탈퇴 시, 현재 로그인된 아이디는 즉시 탈퇴 처리됩니다.',
  '회원 정보 및 서비스 이용 기록(매물 정보, 찜, 리뷰, 톡톡, 활동 내역 등)은 모두 삭제되며, 삭제된 데이터는 복구되지 않습니다.',
  '보유하고 계신 [이용권 등]은 탈퇴와 동시에 모두 소멸되며 환불이 불가능할 수 있습니다.',
];
