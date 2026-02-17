import { Checkbox } from '@muroom/components';

interface Props {
  isAgreed: boolean;
  onToggleAgree: () => void;
}

export default function ReportCheckContent({ isAgreed, onToggleAgree }: Props) {
  return (
    <div className='flex flex-col gap-y-5'>
      <p className='text-base-l-16-1'>
        타당한 사유없이 허위 신고 시 신고자에 대한 활동 제한이 될 수 있으며,
        신고 전 신중하게 고려해주세요
      </p>

      <Checkbox
        checked={isAgreed}
        onChange={onToggleAgree}
        label={
          <span className='text-base-m-14-1 text-gray-500'>
            안내사항을 모두 확인하였으며, 이에 동의합니다.
          </span>
        }
      />
    </div>
  );
}
