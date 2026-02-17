// 임시 방편 추후 구조 개편
import { VisitListIcon } from '@muroom/icons';

export default function CheckTabSection() {
  return (
    <div className='flex-center size-full'>
      <div className='flex-center-col flex gap-y-10'>
        <VisitListIcon className='size-11 text-gray-400' />
        <p className='text-base-exl-18-2 text-gray-500'>
          현재 서비스 준비 중이에요
        </p>
        <p className='text-base-l-16-1 text-center text-gray-400'>
          보다 나은 서비스를 위해 페이지 준비중에 있습니다
          <br />
          빠른 시일 내에 준비하여 찾아뵙도록 하겠습니다
        </p>
      </div>
    </div>
  );
}
