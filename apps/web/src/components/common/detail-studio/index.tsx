'use client';

import { useEffect, useRef, useState } from 'react';

import { Button, Header, Snackbar, TabBar } from '@muroom/components';
import {
  CallIcon,
  ChatIcon,
  HeartOutlineIcon,
  MailIcon,
  VisitListOutlineIcon,
} from '@muroom/icons';
import { formatPhoneNumber } from '@muroom/util';

import CheckTabSection from '@/components/home/components/check-tab-section';
import DetailTabSection from '@/components/home/components/detail-tab-section';
import { useAuthCheck } from '@/hooks/auth/useAuthCheck';
import { LoginLink } from '@/hooks/auth/useAuthRedirect';
import { StudioDetailResponseProps } from '@/types/studio';

interface Props {
  detailStudio: StudioDetailResponseProps;
  setStudioId: (id: string) => void;
}

const TOP_HEADER_HEIGHT = 100;
const BOTTOM_FOOTER_HEIGHT = 96;

const HEADER_TABS_DATA = [
  { id: 'detail', label: '상세 정보' },
  { id: 'check', label: '방문확인' },
];

export default function CommonDetailStudio({
  detailStudio,
  setStudioId,
}: Props) {
  const [activeTab, setActiveTab] = useState('detail');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [detailStudio]);

  const handleHeaderTabChange = (selectedTabId: string) => {
    setActiveTab(selectedTabId);
  };

  const activeSection = () => {
    return activeTab === 'detail' ? (
      <DetailTabSection
        detailStudio={detailStudio}
        containerRef={scrollContainerRef}
      />
    ) : (
      <CheckTabSection />
    );
  };

  return (
    <div className='shadow-detail flex h-full flex-col border-r border-r-gray-300 bg-white'>
      <div
        id='detail-scroll-container'
        ref={scrollContainerRef}
        className='relative flex flex-1 flex-col overflow-y-auto bg-gray-100'
      >
        <div
          className='sticky top-0 z-50 border-b border-gray-300 bg-white'
          style={{ height: TOP_HEADER_HEIGHT }}
        >
          <Header
            title={detailStudio.studioBaseInfo.studioName}
            onBackClick={() => setStudioId('')}
            rightSlot={
              <>
                <VisitListOutlineIcon className='size-6' />
                <HeartOutlineIcon className='size-6' />
              </>
            }
          />
          <TabBar
            level={2}
            tabs={HEADER_TABS_DATA}
            initialActiveTabId={activeTab}
            onTabChange={handleHeaderTabChange}
            className='border-y border-y-gray-300'
          />
        </div>
        {activeSection()}
      </div>

      <div
        className='flex-none border-t border-t-gray-200 bg-white p-5'
        style={{ height: BOTTOM_FOOTER_HEIGHT }}
      >
        <DetailFooter
          phoneNum={
            detailStudio.studioNotice.ownerPhoneNumber || '010-1234-1234'
          }
        />
      </div>
    </div>
  );
}

const DetailFooter = ({ phoneNum }: { phoneNum: string }) => {
  const { isLoggedIn } = useAuthCheck();
  const [isSnackOpen, setIsSnackOpen] = useState<'mail' | 'call' | null>(null);

  const ContactButton = ({
    name,
    type,
    icon,
  }: {
    name: string;
    type: 'mail' | 'call';
    icon: React.ReactNode;
  }) => {
    const ButtonUI = (
      <Button
        variant='outline'
        size='xl'
        className='flex-center flex-1 gap-x-2'
        onClick={isLoggedIn ? () => setIsSnackOpen(type) : undefined}
      >
        {icon}
        <span className='text-base-m-14-2'>{name}</span>
      </Button>
    );

    if (!isLoggedIn) {
      return <LoginLink className='flex w-full'>{ButtonUI}</LoginLink>;
    }

    return ButtonUI;
  };

  return (
    <div className='relative grid grid-cols-2 gap-x-1'>
      {/* <Button variant='primary_icon'>
        <ChatIcon className='size-6 text-white' />
      </Button> */}
      <ContactButton
        type='call'
        name='전화문의'
        icon={<CallIcon className='text-primary-400 size-6' />}
      />

      <ContactButton
        type='mail'
        name='문자문의'
        icon={<MailIcon className='text-primary-400 size-6' />}
      />

      <Snackbar
        isOpen={!!isSnackOpen}
        onClose={() => setIsSnackOpen(null)}
        showCloseButton
      >
        <span className='underline underline-offset-4'>
          {formatPhoneNumber(phoneNum)}
        </span>
      </Snackbar>

      {/* <Button variant='outline' size='xl' className='flex-1'>
        비교함 담기
      </Button> */}
    </div>
  );
};
