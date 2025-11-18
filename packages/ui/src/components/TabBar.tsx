'use client';

import { useEffect, useState } from 'react';

import { cn } from '../lib/utils';

export interface TabItem {
  id: string;
  label: React.ReactNode;
}

interface TabBarProps {
  level: 1 | 2 | 3;
  tabs: TabItem[];
  initialActiveTabId: string;
  onTabChange: (id: string) => void;
  className?: string;
  btnClassName?: string;
}

export default function TabBar({
  level,
  tabs,
  initialActiveTabId,
  onTabChange,
  className,
  btnClassName,
}: TabBarProps) {
  const [activeTabId, setActiveTabId] = useState(initialActiveTabId);

  useEffect(() => {
    setActiveTabId(initialActiveTabId);
  }, [initialActiveTabId]);

  const handleTabChange = (id: string) => {
    setActiveTabId(id);
    onTabChange(id);
  };

  return (
    <nav
      className={cn(
        'grid grid-cols-2',
        {
          'rounded-4 border border-gray-200 bg-gray-200 p-[2px]': level === 1,
          'bg-white': level === 2,
          'border-b-[0.5px] border-gray-300': level === 3,
        },
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;

        return (
          <button
            key={tab.id}
            type='button'
            role='tab'
            aria-selected={isActive}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              'flex-1 shrink-0 cursor-pointer whitespace-nowrap text-center transition-all duration-150',

              { 'rounded-4 py-3': level === 1 },
              {
                'bg-white': level === 1 && isActive,
              },
              { 'text-gray-500': level === 1 && !isActive },

              { 'py-3': level === 2 },
              { 'bg-gray-600 !text-white': level === 2 && isActive },
              { '!text-gray-400': (level === 2 || level === 3) && !isActive },

              {
                'text-base-l-16-2': isActive,
                'text-base-l-16-1': !isActive,
              },
              btnClassName,
            )}
          >
            {level === 3 ? (
              <div
                className={cn(
                  'inline-block border-b-2 py-3',
                  { 'border-gray-800': isActive },
                  { 'border-transparent': !isActive },
                )}
              >
                {tab.label}
              </div>
            ) : (
              tab.label
            )}
          </button>
        );
      })}
    </nav>
  );
}
