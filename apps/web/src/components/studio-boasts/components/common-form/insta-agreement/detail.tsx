interface Props {
  isMobile?: boolean;
}

export default function DetailInstaAgreement({ isMobile = false }: Props) {
  return (
    <div className='w-full'>
      {isMobile && (
        <h3 className='text-base-exl-18-2 mb-5'>
          [필수] 개인정보 수집 및 이용동의
        </h3>
      )}
      <div className='flex flex-col gap-y-8'>
        <p className='text-base-l-16-1'>
          수집하는 개인 정보의 항목, 개인 정보의 수집 및 이용목적, 개인 정보의
          보유 및 이용기간을 안내 드리오니 자세히 읽으신 후 동의 하여 주시기
          바랍니다.
        </p>
        <div className='flex flex-col gap-y-1'>
          <span className='text-base-l-16-2'>수집 및 이용 목적</span>
          <ul className='text-base-l-16-1 list-disc pl-4'>
            <li>이벤트 참여 명단 관리</li>
            <li>당첨자 추첨 및 연락을 위한 보관</li>
          </ul>
        </div>

        <div className='flex flex-col gap-y-1'>
          <span className='text-base-l-16-2'>수집 항목</span>
          <span>인스타그램 아이디</span>
        </div>

        <div className='flex flex-col gap-y-1'>
          <span className='text-base-l-16-2'>보유 및 이용기간</span>
          <span>해당 이벤트 종료시(~1/4(일))까지</span>
        </div>
      </div>
    </div>
  );
}
