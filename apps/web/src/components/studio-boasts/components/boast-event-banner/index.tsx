'use client';

import { useState } from 'react';

import { Button, Modal, ModalBottomSheet } from '@muroom/components';
import BoastBanner from '@muroom/ui/assets/boast-banner.svg';
import BoastMobileBanner from '@muroom/ui/assets/boast-mobile-banner.svg';

import CommonImage from '@/components/common/common-image';

interface Props {
  isMobile?: boolean;
  className?: string;
}

export default function BoastEventBanner({
  isMobile = false,
  className,
}: Props) {
  const [openEventModal, setOpenEventModal] = useState(false);

  const content = (
    <div className='text-base-m-14-1 flex flex-col'>
      {isMobile && <span className='text-base-exl-18-2 mb-5'>이벤트 안내</span>}
      <p>이벤트 참여기간 : 2025.12.29(월)~2026.01.12(화)</p>
      <p>당첨자 발표 : 2026.01.13.(수)</p>

      <br />

      <p>당첨자 발표 게시:</p>
      <p>- 뮤룸 홈페이지 작업실 자랑 배너</p>
      <p>- 뮤룸 인스타그램 게시글 내 업로드</p>

      <br />

      <p>이벤트 경품:</p>
      <p>우수상 (1명): 배달의 민족 상품권 5만원권</p>
      <p>공감상 (3명): 배달의 민족 상품권 3만원권</p>
      <p>참여상 (5명): 스타벅스 아메리카노 1잔 기프티콘</p>

      <br />

      <p>참여방법:</p>
      <p>
        1. 뮤룸 상단의 [작업실 자랑하기] 이벤트 탭에서 내 작업실 자랑하는 글
        쓰기
      </p>
      <p>2. 뮤룸 인스타그램(@muroom_official) 팔로우</p>

      <br />

      <p>※ 유의사항</p>
      <p>- 중복 참여 시 이벤트 당첨 대상에서 제외될 수 있습니다.</p>
      <p>- 비공개 계정은 확인이 어려워 참여가 불가합니다.</p>
      <p>
        - 이벤트 종료 직후 @muroom_official의 팔로우가 되어 있지 않을 시 당첨
        대상에서 제외될 수 있습니다.
      </p>
      <p>
        - 당첨자 발표 전까지 @muroom_official 팔로우가 되어 있지 않거나 게시글이
        삭제되어 있을 시 당첨 대상에서 제외될 수 있습니다.
      </p>
    </div>
  );

  const modalElement = isMobile ? (
    <ModalBottomSheet
      isOpen={openEventModal}
      onClose={() => setOpenEventModal(false)}
      footerBtns={
        <Button
          variant='outline'
          size='xl'
          className='w-full'
          onClick={() => setOpenEventModal(false)}
        >
          확인
        </Button>
      }
    >
      {content}
    </ModalBottomSheet>
  ) : (
    <Modal isOpen={openEventModal} onClose={() => setOpenEventModal(false)}>
      <Modal.Wrapper>
        <Modal.Header title='이벤트 안내' />
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button
            variant='outline'
            size='xl'
            onClick={() => setOpenEventModal(false)}
          >
            확인
          </Button>
        </Modal.Footer>
      </Modal.Wrapper>
    </Modal>
  );

  return (
    <div className={className}>
      <CommonImage
        src={isMobile ? BoastMobileBanner : BoastBanner}
        alt='매물자랑배너'
        className='h-auto w-full cursor-pointer object-cover'
        onClick={() => setOpenEventModal(true)}
        priority
      />
      {modalElement}
    </div>
  );
}
