import React from 'react';

import {
  ChatIcon,
  ExtraIcon,
  HeartIcon,
  VisitListIcon,
  WorkroomFillIcon,
} from '@muroom/icons';
import { cn } from '@muroom/lib';

export default function OnSNBMobileFooter() {
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
        />
      ))}
    </footer>
  );
}

const FooterItem = ({
  icon,
  label,
  isActive,
  className,
}: {
  icon: React.ReactElement<{ className?: string }>;
  label: string;
  isActive?: boolean;
  className?: string;
}) => {
  return (
    <div
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
