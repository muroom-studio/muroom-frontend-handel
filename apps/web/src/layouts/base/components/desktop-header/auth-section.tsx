'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Button, Popover, UserBaseInfoLabel } from '@muroom/components';

import { useMusicianMeQuery } from '@/hooks/api/musician/useQueries';
import { useAuthCheck } from '@/hooks/auth/useAuthCheck';
import { LoginLink } from '@/hooks/auth/useAuthRedirect';

export default function AuthSection() {
  const { isLoggedIn } = useAuthCheck();

  const { data: musicianBaseData } = useMusicianMeQuery();

  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'm1', label: '프로필', url: '/mypage/profile' },
    { id: 'm2', label: '고객센터', url: '/mypage/cs' },
    { id: 'm3', label: '로그아웃', url: '/logout' },
  ];

  const showProfile = isLoggedIn && !!musicianBaseData;

  if (showProfile) {
    const isAuthenticatedTriggerDiv = (
      <div
        data-state={isOpen ? 'open' : 'closed'}
        aria-haspopup='menu'
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <UserBaseInfoLabel
          className='cursor-pointer'
          instrumentDescription={
            musicianBaseData.musicianInstrument.description || ''
          }
          nickname={musicianBaseData.nickname || ''}
        />
      </div>
    );

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger>{isAuthenticatedTriggerDiv}</Popover.Trigger>
        <Popover.Content align='start' className='w-32'>
          <Popover.MenuContainer>
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                onClick={() => setIsOpen(false)}
              >
                <Popover.MenuItem>{item.label}</Popover.MenuItem>
              </Link>
            ))}
          </Popover.MenuContainer>
        </Popover.Content>
      </Popover>
    );
  }

  return (
    <LoginLink>
      <Button variant='outline' size='l'>
        회원가입/로그인
      </Button>
    </LoginLink>
  );
}
