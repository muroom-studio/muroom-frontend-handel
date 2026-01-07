'use client';

import { useEffect, useState } from 'react';

import { Alert } from '@muroom/components';

import CheckContent from '../contents/check-content';
import FormContent from '../contents/form-content';

interface DesktopProps {
  isOpen: boolean;
  onClose: () => void;
  onFinalSubmit: () => void;
  isLoading: boolean;
  isValid: boolean;
  formProps: any;
}

export default function DesktopReportAlert({
  isOpen,
  onClose,
  onFinalSubmit,
  isLoading,
  isValid,
  formProps,
}: DesktopProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  // ✅ [수정 1] 부모 컴포넌트에서 창이 닫히면(isOpen === false),
  // 내부 상태(2단계 모달 상태, 동의 여부)를 초기화합니다.
  useEffect(() => {
    if (!isOpen) {
      setIsConfirmOpen(false);
      setIsAgreed(false);
    }
  }, [isOpen]);

  return (
    <>
      {/* 1단계 Alert */}
      <Alert
        // 1단계는 '전체 열림 상태'이면서 '2단계가 아닐 때' 보여줌
        isOpen={isOpen && !isConfirmOpen}
        onClose={onClose}
        onConfirm={() => {
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
        // ✅ [수정 2] 부모(isOpen)가 닫히면 얘도 같이 닫혀야 함 (&& 조건 추가)
        isOpen={isOpen && isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setIsAgreed(false);
        }}
        onConfirm={onFinalSubmit}
        isLoading={isLoading}
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
