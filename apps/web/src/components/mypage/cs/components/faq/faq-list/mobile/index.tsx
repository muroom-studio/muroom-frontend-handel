import { RefObject } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Spinner,
} from '@muroom/components';

import { FaqItem } from '@/types/faqs';

interface Props {
  items: FaqItem[];
  isLoading: boolean;
  infiniteScroll: {
    observerRef: RefObject<HTMLDivElement | null>;
    isFetchingNextPage: boolean;
  };
}

export default function MobileFaqList({
  items,
  isLoading,
  infiniteScroll,
}: Props) {
  return (
    <div className='mt-6 flex flex-col'>
      <div className='flex w-full border-b border-b-gray-200 pb-3 pl-3 pt-3'>
        <span className='text-base-l-16-1 text-gray-400'>질문내용</span>
      </div>

      {items.length === 0 && !isLoading ? (
        <div className='py-25 whitespace-pre-wrap text-center text-gray-400'>
          {`검색하신 내역이 없습니다. \n매물에 대한 궁금한 사항이 있다면 1:1 문의를 이용해주세요`}
        </div>
      ) : (
        <Accordion className='w-full'>
          {items.map((faq) => (
            <AccordionItem key={faq.faqId} value={String(faq.faqId)}>
              <AccordionTrigger className='py-0 hover:bg-gray-50'>
                <div className='flex flex-col items-start gap-y-1 py-2.5 pl-3 text-left'>
                  <span className='text-base-s-12-1'>{faq.category.name}</span>
                  <span className='text-base-l-16-2'>{faq.question}</span>
                </div>
              </AccordionTrigger>

              <AccordionContent className='px-3 py-4 text-left'>
                <p className='whitespace-pre-wrap leading-relaxed'>
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <div ref={infiniteScroll.observerRef} className='flex-center h-10 w-full'>
        {infiniteScroll.isFetchingNextPage && <Spinner variant='component' />}
      </div>
    </div>
  );
}
