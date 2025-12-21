'use client';

import { useState } from 'react';

import { TabBar, TabItem } from '@muroom/components';

import FaqBoard from '@/components/mypage/cs/components/faq';
import InquiriesBoard from '@/components/mypage/cs/components/inquiries';

const tabs: TabItem[] = [
  { id: 'e1', label: 'FAQ' },
  { id: 'e2', label: '1:1문의내역 ' },
];

export default function Page() {
  const [activeTabId, setActiveTabId] = useState('e1');
  return (
    <div className='w-full'>
      <TabBar
        level={3}
        tabs={tabs}
        initialActiveTabId={activeTabId}
        onTabChange={(currentId) => setActiveTabId(currentId)}
      />
      <div className='px-5 pt-6'>
        {activeTabId === 'e1' && <FaqBoard />}

        {activeTabId === 'e2' && <InquiriesBoard />}
      </div>
    </div>
  );
}
