'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button, Tag } from '@muroom/components';
import { maskPhoneNumberAll } from '@muroom/util';

import Loading from '@/app/loading';
import PageWrapper from '@/components/common/page-wrapper';
import {
  InstrumentEditAlert,
  NicknameEditAlert,
  PhoneEditAlert,
  StudioEditAlert,
} from '@/components/mypage/profile/components/edit-alert/variants';
import EditableField from '@/components/mypage/profile/components/editable-field';
import QuitAlert from '@/components/mypage/profile/components/quit-alert';
import { useMusiciansMeDetailQuery } from '@/hooks/api/musicians/useQueries';
import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';

type AlertKey = 'NICKNAME' | 'INSTRUMENT' | 'PHONE' | 'STUDIO' | 'QUIT';

const ALERT_COMPONENTS = {
  NICKNAME: NicknameEditAlert,
  INSTRUMENT: InstrumentEditAlert,
  PHONE: PhoneEditAlert,
  STUDIO: StudioEditAlert,
  QUIT: QuitAlert,
};

export default function Page() {
  const { isMobile } = useResponsiveLayout();
  const router = useRouter();

  const { data: detailData, isLoading: isDetailLoading } =
    useMusiciansMeDetailQuery();

  const [activeAlert, setActiveAlert] = useState<AlertKey | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenAlert = (key: AlertKey) => {
    setActiveAlert(key);
    setIsOpen(true);
  };

  const handleCloseAlert = () => {
    setIsOpen(false);
    setTimeout(() => {
      setActiveAlert(null);
    }, 300);
  };

  const fieldItems = useMemo(() => {
    if (!detailData) return [];
    return [
      {
        id: 'NICKNAME',
        label: '닉네임',
        content: detailData.nickname,
        isEditable: true,
      },
      {
        id: 'INSTRUMENT',
        label: '악기',
        content: (
          <Tag variant='primary' size='l'>
            {detailData.musicianInstrument?.description}
          </Tag>
        ),
        isEditable: true,
      },
      {
        id: 'PHONE',
        label: '휴대폰 번호',
        content: detailData.phone ? maskPhoneNumberAll(detailData.phone) : '',
        isEditable: true,
      },
      {
        id: 'STUDIO',
        label: '내 스튜디오',
        content: (
          <div className='flex flex-col gap-y-2'>
            <span>
              {detailData.myStudio?.roadAddress}{' '}
              {detailData.myStudio?.detailAddress}
            </span>
            <span className='text-base-m-14-1 text-gray-600'>
              {detailData.myStudio?.name}
            </span>
          </div>
        ),
        isEditable: true,
      },
      {
        id: 'SNS',
        label: 'SNS 계정',
        content: detailData.snsAccount?.description,
        isEditable: false,
      },
    ];
  }, [detailData]);

  if (isDetailLoading) return <Loading />;

  const ActiveAlertComponent = activeAlert
    ? ALERT_COMPONENTS[activeAlert]
    : null;

  const MainContent = (
    <div className='flex flex-col'>
      {fieldItems.map((item) => (
        <EditableField
          key={item.id}
          name={item.label}
          isEditable={item.isEditable}
          onEdit={
            item.isEditable && item.id !== 'SNS'
              ? () => handleOpenAlert(item.id as AlertKey)
              : undefined
          }
        >
          {item.content}
        </EditableField>
      ))}

      {!isMobile && (
        <div className='flex-between pt-6'>
          <Link href='/logout'>
            <Button variant='outline' size='xl'>
              로그아웃
            </Button>
          </Link>
          <p
            aria-label='서비스 탈퇴 버튼'
            className='text-base-l-16-1 cursor-pointer text-gray-400 underline underline-offset-1'
            onClick={() => handleOpenAlert('QUIT')}
          >
            서비스 탈퇴
          </p>
        </div>
      )}

      {ActiveAlertComponent && (
        <ActiveAlertComponent
          isMobile={isMobile}
          isOpen={isOpen}
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );

  if (isMobile) {
    return (
      <PageWrapper
        isMobile
        isHeader={{
          title: '프로필',
          onBackClick: () => router.back(),
        }}
        bottomSlot={
          <div className='flex-between pt-6'>
            <Link href='/logout'>
              <Button variant='outline' size='xl'>
                로그아웃
              </Button>
            </Link>
            <p
              aria-label='서비스 탈퇴 버튼'
              className='text-base-l-16-1 cursor-pointer text-gray-400 underline underline-offset-1'
              onClick={() => handleOpenAlert('QUIT')}
            >
              서비스 탈퇴
            </p>
          </div>
        }
      >
        {MainContent}
      </PageWrapper>
    );
  }

  return MainContent;
}
