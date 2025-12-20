import { useState } from 'react';

import {
  Alert,
  Checkbox,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  RequiredText,
  TextBox,
} from '@muroom/components';

import ContentWrapper from '../edit-alert/components/content-wrapper';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuitAlert({ isOpen, onClose }: Props) {
  const [selectedReason, setSelectedReason] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleConfirm = () => {
    console.log('탈퇴 사유:', selectedReason);
  };

  const AlertContent = () => {
    return (
      <ContentWrapper description='서비스 탈퇴'>
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

            <Dropdown
              value={selectedReason}
              onValueChange={(val) => setSelectedReason(val)}
              placeholder='탈퇴유형을 선택해주세요'
              className='w-full'
            >
              <DropdownTrigger variant='primary' size='m' />

              <DropdownContent className='max-h-[295px] overflow-y-auto'>
                {WITHDRAWAL_REASONS.map((reason) => (
                  <DropdownItem key={reason} value={reason}>
                    {reason}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </div>

          <div className='flex flex-col gap-y-3'>
            <label htmlFor='EXTRA_TEXT' className='text-base-l-16-2'>
              추가의견
            </label>
            <TextBox
              id='EXTRA_TEXT'
              placeholder='추가적인 다른 사유가 있다면 입력해주세요'
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

  return (
    <Alert
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      variant='negative'
      title='서비스 탈퇴'
      content={AlertContent()}
      confirmLabel='탈퇴하기'
      confirmDisabled={selectedReason === ''}
    />
  );
}

// 안내 문구
const WITHDRAWAL_GUIDES = [
  '회원 탈퇴 시, 현재 로그인된 아이디는 즉시 탈퇴 처리됩니다.',
  '회원 정보 및 서비스 이용 기록(매물 정보, 찜, 리뷰, 톡톡, 활동 내역 등)은 모두 삭제되며, 삭제된 데이터는 복구되지 않습니다.',
  '보유하고 계신 [이용권 등]은 탈퇴와 동시에 모두 소멸되며 환불이 불가능할 수 있습니다.',
];

// 탈퇴 사유 목록 (사진 데이터 반영)
const WITHDRAWAL_REASONS = [
  '원하는 매물 정보가 부족함',
  '매물 정보의 신뢰가 부족함',
  '서비스 이용이 불편함',
  '작업실 탐색/계약을 완료함',
  '서비스 이용 목적이 사라짐',
  '다른 유사 서비스 이용',
  '개인 정보 삭제를 원함',
  '고객 응대/지원 불만',
  '유료 서비스/광고에 대한 불만',
  '기타 직접 입력',
];
