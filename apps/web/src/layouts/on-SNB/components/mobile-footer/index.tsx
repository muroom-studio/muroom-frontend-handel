import React from 'react';

import {
  ChatIcon,
  ExtraIcon,
  HeartIcon,
  VisitListIcon,
  WorkroomFillIcon,
} from '@muroom/icons';
import { cn } from '@muroom/lib';

import { usePrepareModal } from '@/hooks/usePrepareModal.tsx';

export default function OnSNBMobileFooter() {
  const { open, Modal } = usePrepareModal();

  const handleMenuClick = (id: number) => {
    if (id !== 1) {
      open();
    } else {
      // 작업실 이동 로직 (필요시 구현)
    }
  };
  const FooterList = [
    {
      id: 1,
      icon: <WorkroomFillIcon />,
      label: '작업실',
      isActive: true,
    },
    {
      id: 2,
      icon: <HeartIcon />,
      label: '찜',
    },
    {
      id: 3,
      icon: <VisitListIcon />,
      label: '방문목록',
    },
    {
      id: 4,
      icon: <ChatIcon />,
      label: '톡톡',
    },
    {
      id: 5,
      icon: <ExtraIcon />,
      label: '더보기',
    },
  ];
  return (
    <footer className='flex-center gap-x-2'>
      {FooterList.map((list) => (
        <FooterItem
          key={list.id}
          icon={list.icon}
          label={list.label}
          isActive={list.isActive}
          onClick={() => handleMenuClick(list.id)}
        />
      ))}

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
