import { Checkbox } from '@muroom/components';

interface Props {
  isMobile?: boolean;
  isAgreed: boolean;
  onToggleAgree: () => void;
}

export default function ReportCheckContent({
  isMobile = false,
  isAgreed,
  onToggleAgree,
}: Props) {
  return (
    <div className='flex flex-col gap-y-5'>
      {isMobile ? (
        <p className='text-base-l-16-1'>
          타당한 사유없이 허위 신고 시 신고자에 대한 활동 제한이 될 수 있으며,
          신고 전 신중하게 고려해주세요
        </p>
      ) : (
        <div className='text-base-l-16-1 flex flex-col gap-y-5'>
          <p>
            고객님의 소중한 후기는 뮤룸 이용자들에게 큰 도움이 됩니다. 다만,
            작성하신 내용이 실제 경험 및 객관적 사실에 기반하는지 다시 한번
            확인해 주세요.
          </p>
          <p>
            악의적인 허위 사실 유포 시 뮤룸 이용 정책에 따른 서비스 이용 제한은
            물론, 민·형사상 법적 책임이 부과될 수 있음을 알려드립니다.
          </p>
        </div>
      )}

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
