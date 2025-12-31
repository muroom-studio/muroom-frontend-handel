import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Pagination,
} from '@muroom/components';
import { cn } from '@muroom/lib';

import { FaqItem } from '@/types/faqs';

interface Props {
  items: FaqItem[];
  isLoading: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

export default function DesktopFaqList({
  items,
  isLoading,
  pagination,
}: Props) {
  const headerGridClass =
    'grid w-full grid-cols-[120px_1fr] border-b border-b-gray-200';

  const itemContentGridClass = 'grid w-full grid-cols-[120px_1fr] items-center';

  const cellClass = 'pl-3 py-5';

  return (
    <div className='mt-10 flex flex-col'>
      {/* 1. Desktop Header Row */}
      <div className={headerGridClass}>
        <div
          className={cn(cellClass, 'text-base-l-16-1 text-left text-gray-400')}
        >
          카테고리
        </div>
        <div
          className={cn(cellClass, 'text-base-l-16-1 text-left text-gray-400')}
        >
          질문내용
        </div>
      </div>

      {items.length === 0 && !isLoading ? (
        <div className='py-25 whitespace-pre-wrap text-center text-gray-400'>
          {`검색하신 내역이 없습니다. \n궁금한 사항이 있다면 \n다른 FAQ를 이용해주세요`}
        </div>
      ) : (
        <Accordion className='w-full'>
          {items.map((faq) => (
            <AccordionItem key={faq.faqId} value={String(faq.faqId)}>
              <AccordionTrigger className='py-0 hover:bg-gray-50' hideIcon>
                <div className={itemContentGridClass}>
                  {/* 카테고리 컬럼 */}
                  <div className={cn(cellClass, 'text-base-l-16-2 text-left')}>
                    {faq.category.name}
                  </div>
                  {/* 질문 컬럼 */}
                  <div className={cn(cellClass, 'text-base-l-16-2 text-left')}>
                    {faq.question}
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className='pl-33 text-left'>
                <p className='whitespace-pre-wrap leading-relaxed'>
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 0 && (
        <div className='mt-10 flex justify-center'>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
          />
        </div>
      )}
    </div>
  );
}
