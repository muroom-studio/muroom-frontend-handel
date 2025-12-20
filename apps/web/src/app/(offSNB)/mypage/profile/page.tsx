'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';

import { Button, Tag } from '@muroom/components';
import { maskPhoneNumberAll } from '@muroom/util';

import Loading from '@/app/loading';
import {
  InstrumentEditAlert,
  NicknameEditAlert,
  PhoneEditAlert,
  StudioEditAlert,
} from '@/components/mypage/profile/components/edit-alert/variants';
import EditableField from '@/components/mypage/profile/components/editable-field';
import QuitAlert from '@/components/mypage/profile/components/quit-alert';
import { useMusicianMeDetailQuery } from '@/hooks/api/musician/useQueries';

type AlertKey = 'NICKNAME' | 'INSTRUMENT' | 'PHONE' | 'STUDIO' | 'QUIT';

const ALERT_COMPONENTS = {
  NICKNAME: NicknameEditAlert,
  INSTRUMENT: InstrumentEditAlert,
  PHONE: PhoneEditAlert,
  STUDIO: StudioEditAlert,
  QUIT: QuitAlert,
};

export default function Page() {
  const { data: detailData, isLoading: isDetailLoading } =
    useMusicianMeDetailQuery();

  const [activeAlert, setActiveAlert] = useState<AlertKey | null>(null);

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
            <span>{detailData.myStudio?.name}</span>
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

  return (
    <div className='flex flex-col'>
      {/* 리스트 렌더링 */}
      {fieldItems.map((item) => (
        <EditableField
          key={item.id}
          name={item.label}
          isEditable={item.isEditable}
          onEdit={
            item.isEditable && item.id !== 'SNS'
              ? () => setActiveAlert(item.id as AlertKey)
              : undefined
          }
        >
          {item.content}
        </EditableField>
      ))}

      <div className='flex-between pt-6'>
        <Link href='/logout'>
          <Button variant='outline' size='m'>
            로그아웃
          </Button>
        </Link>
        <p
          aria-label='서비스 탈퇴 버튼'
          className='text-base-l-16-1 cursor-pointer text-gray-400 underline underline-offset-1'
          onClick={() => setActiveAlert('QUIT')}
        >
          서비스 탈퇴
        </p>
      </div>

      {ActiveAlertComponent && (
        <ActiveAlertComponent
          isOpen={Boolean(activeAlert)}
          onClose={() => setActiveAlert(null)}
        />
      )}
    </div>
  );
}
