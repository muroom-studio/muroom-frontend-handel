'use client';

import React from 'react';

import { usePathname, useRouter } from 'next/navigation';

import {
  ChatIcon,
  ExtraIcon,
  HeartIcon,
  VisitListIcon,
  WorkroomFillIcon,
  WorkroomIcon,
} from '@muroom/icons';
import { cn } from '@muroom/lib';

import { usePrepareModal } from '@/hooks/usePrepareModal.tsx';

export default function OnSNBMobileFooter() {
  const router = useRouter();
  const pathname = usePathname();
  const { open, Modal } = usePrepareModal();

  const handleMenuClick = (url?: string) => {
    if (url) {
      router.push(url);
    } else {
      open();
    }
  };

  const FooterList = [
    {
      id: 1,
      icon: <WorkroomIcon className='text-gray-300' />,
      activeIcon: <WorkroomFillIcon />,
      label: '작업실',
      url: '/home',
    },
    {
      id: 2,
      icon: <HeartIcon className='text-gray-300' />,
      label: '찜',
    },
    {
      id: 3,
      icon: <VisitListIcon className='text-gray-300' />,
      label: '방문목록',
    },
    {
      id: 4,
      icon: <ChatIcon className='text-gray-300' />,
      label: '톡톡',
    },
    {
      id: 5,
      icon: <ExtraIcon className='text-gray-300' />,
      label: '더보기',
      url: '/extra',
    },
  ];

  return (
    <footer className='flex-center gap-x-2'>
      {FooterList.map((list) => {
        const isActive = list.url ? pathname.startsWith(list.url) : false;

        const targetIcon =
          isActive && list.activeIcon ? list.activeIcon : list.icon;

        return (
          <FooterItem
            key={list.id}
            icon={targetIcon}
            label={list.label}
            isActive={isActive}
            onClick={() => handleMenuClick(list.url)}
          />
        );
      })}

      <Modal />
    </footer>
  );
}

const FooterItem = ({
  icon,
  label,
  isActive,
  className,
  onClick,
}: {
  icon: React.ReactElement<{ className?: string }>;
  label: string;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex-center-col rounded-4 group size-16 cursor-pointer gap-y-[2px] bg-white transition-all hover:text-gray-50',
        {
          '!text-primary-600 hover:!text-primary-600': isActive,
        },
        className,
      )}
    >
      {React.cloneElement(icon, {
        className: cn('size-6 text-gray-400', icon.props.className, {
          '!text-primary-600': isActive,
        }),
      })}
      <span
        className={`text-base-exs-10-1 text-gray-400 ${isActive && 'text-primary-600'}`}
      >
        {label}
      </span>
    </div>
  );
};
