'use client';

import { useState } from 'react';

import { Alert } from '@muroom/components';

import CheckContent from '../contents/check-content';
import FormContent from '../contents/form-content';

interface DesktopProps {
  isOpen: boolean;
  onClose: () => void;
  onFinalSubmit: () => void;
  isValid: boolean;
  formProps: any;
}

export default function DesktopReportAlert({
  isOpen,
  onClose,
  onFinalSubmit,
  isValid,
  formProps,
}: DesktopProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <>
      {/* 1단계 Alert */}
      <Alert
        // [핵심] 2단계가 열리면 1단계는 닫히도록 조건 추가
        isOpen={isOpen && !isConfirmOpen}
        onClose={onClose}
        onConfirm={() => {
          // 여기서 onClose()를 부르지 않습니다!
          // 상태만 변경하면 위의 isOpen 조건에 의해 1단계 창이 자연스럽게 닫힙니다.
          setIsConfirmOpen(true);
        }}
        variant='negative'
        title='신고하기'
        content={<FormContent {...formProps} />}
        confirmLabel='신고하기'
        confirmDisabled={!isValid}
      />

      {/* 2단계 Alert */}
      <Alert
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setIsAgreed(false);
        }}
        onConfirm={onFinalSubmit}
        variant='negative'
        title='신고하기'
        content={
          <CheckContent
            isAgreed={isAgreed}
            onToggleAgree={() => setIsAgreed(!isAgreed)}
          />
        }
        confirmLabel='신고하기'
        confirmDisabled={!isAgreed}
      />
    </>
  );
}
