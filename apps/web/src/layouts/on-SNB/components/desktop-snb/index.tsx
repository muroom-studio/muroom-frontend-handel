import React from 'react';

import {
  ChatIcon,
  FileIcon,
  HeartIcon,
  VisitListIcon,
  WorkroomIcon,
} from '@muroom/icons';
import { cn } from '@muroom/lib';

import { usePrepareModal } from '@/hooks/usePrepareModal.tsx';

export default function OnSNBDesktopSnb() {
  const { open, Modal } = usePrepareModal();

  const handleMenuClick = (id: number) => {
    if (id !== 1) {
      open();
    } else {
      // 작업실 이동 로직 (필요시 구현)
    }
  };

  const SnbList = [
    {
      id: 1,
      icon: <WorkroomIcon />,
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
      icon: <FileIcon />,
      label: '비교함',
    },
  ];

  return (
    <aside className='bg-primary-50 min-h-svh border-gray-300 border-r-[0.5] p-2'>
      <div className='flex flex-col gap-y-3'>
        {SnbList.map((list) => (
          <SnbItem
            key={list.id}
            icon={list.icon}
            label={list.label}
            isActive={list.isActive}
            onClick={() => handleMenuClick(list.id)}
          />
        ))}
      </div>

      <Modal />
    </aside>
  );
}

const SnbItem = ({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactElement<{ className?: string }>;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex-center-col rounded-4 group size-16 cursor-pointer gap-y-[2px] transition-all hover:bg-gray-50',
        {
          'bg-primary-600 hover:bg-primary-600': isActive,
        },
      )}
    >
      {React.cloneElement(icon, {
        className: cn('size-6 text-gray-400', icon.props.className, {
          '!text-white': isActive,
        }),
      })}
      <span
        className={`text-base-s-12-2 text-gray-400 ${isActive && 'text-white'}`}
      >
        {label}
      </span>
    </div>
  );
};
