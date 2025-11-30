import { Checkbox } from '@muroom/components';

interface Props {
  onValidChange: (isValid: boolean) => void;
}

export default function JoinFirstStep({ onValidChange }: Props) {
  const TERMS = [
    { id: 'TERMS_OF_USE', label: '만 14세 이상입니다.', required: true },
    { id: 'PRIVACY_COLLECTION', label: '이용약관 동의', required: true },
    {
      id: 'PRIVACY_PROCESSING',
      label: '개인정보 수집 및 이용동의',
      required: true,
    },
    {
      id: 'MARKETING_RECEIVE',
      label: '개인정보 처리 위탁 동의',
      required: true,
    },
    {
      id: 'marketing',
      label: '마케팅 수신 동의',
      required: false,
      subText: '이벤트 / 혜택 알림',
    },
  ] as const;
  return (
    <div>
      <div className='flex flex-col gap-y-5'>
        <h1 className='text-title-m-26-2'>약관동의</h1>
        <h2 className='text-base-l-16-1 text-black'>
          회원가입을 위한 서비스 이용약관에 동의해주세요
        </h2>
      </div>
      <Checkbox />
    </div>
  );
}
