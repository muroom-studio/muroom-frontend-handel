'use client';

import { RefObject, useState } from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  Spinner,
  Tag,
} from '@muroom/components';
import { cn } from '@muroom/lib';
import { getFormattedDate } from '@muroom/util';

import { InquiryItem } from '@/types/inquiries';

import InquiryDetail from './inquiry-detail';

interface Props {
  items: InquiryItem[];
  isLoading: boolean;
  infiniteScroll: {
    observerRef: RefObject<HTMLDivElement | null>;
    isFetchingNextPage: boolean;
  };
}

export default function MobileInquiryList({
  items,
  isLoading,
  infiniteScroll,
}: Props) {
  const headerGridClass =
    'grid w-full grid-cols-[54px_1fr] border-b border-b-gray-200';

  const itemContentGridClass = 'grid w-full grid-cols-[54px_1fr] items-center';

  const cellClass = 'py-3';

  const conditionedTag = (status: InquiryItem['status']) => {
    if (status === 'PROCESSING') {
      return (
        <Tag variant='secondary' size='s'>
          처리중
        </Tag>
      );
    } else {
      return (
        <Tag variant='primary' size='s'>
          완료
        </Tag>
      );
    }
  };

  const [targetedId, setTargetedId] = useState(0);

  return (
    <div className='mt-6 flex flex-col'>
      <div className={headerGridClass}>
        <div
          className={cn(cellClass, 'text-base-l-16-1 text-left text-gray-400')}
        >
          상태
        </div>
        <div
          className={cn(cellClass, 'text-base-l-16-1 text-left text-gray-400')}
        >
          문의내용
        </div>
      </div>

      {items.length === 0 && !isLoading ? (
        <div className='py-20 text-center text-gray-500'>
          검색 결과가 없습니다.
        </div>
      ) : (
        <Accordion
          className='w-full'
          onValueChange={(inquiryId) => setTargetedId(Number(inquiryId))}
        >
          {items.map((inquiry) => (
            <AccordionItem key={inquiry.id} value={String(inquiry.id)}>
              <AccordionTrigger
                className='py-0 hover:bg-gray-50'
                iconClassName='rotate-0'
              >
                <div className={itemContentGridClass}>
                  <div className={cn(cellClass, 'py-4.5')}>
                    {conditionedTag(inquiry.status)}
                  </div>
                  <div className='flex h-full flex-col justify-center gap-y-1'>
                    <span className='text-base-l-16-2'>{inquiry.title}</span>
                    <p className='text-base-m-14-1 flex items-center gap-x-2 text-gray-400'>
                      <span>{inquiry.category.name}</span>•
                      <span>
                        {getFormattedDate(inquiry.createdAt, 'yy.MM.dd HH:mm')}
                      </span>
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <div ref={infiniteScroll.observerRef} className='flex-center h-10 w-full'>
        {infiniteScroll.isFetchingNextPage && <Spinner variant='component' />}
      </div>

      {Boolean(targetedId) && (
        <InquiryDetail onClose={() => setTargetedId(0)} />
      )}
    </div>
  );
}
