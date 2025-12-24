import Image from 'next/image';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Pagination,
  Tag,
} from '@muroom/components';
import { cn } from '@muroom/lib';
import { getFormattedDate } from '@muroom/util';

import { S3_BUCKET_URL } from '@/config/constants';
import { InquiryItem } from '@/types/inquiries';

interface Props {
  items: InquiryItem[];
  isLoading: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

export default function DesktopInquiryList({
  items,
  isLoading,
  pagination,
}: Props) {
  const headerGridClass =
    'grid w-full grid-cols-[160px_1fr_100px_80px] border-b border-b-gray-200';

  const itemContentGridClass =
    'grid w-full grid-cols-[160px_1fr_100px_80px] items-center';

  const cellClass = 'pl-3 py-5';

  const conditionedTag = (status: InquiryItem['status']) => {
    if (status === 'PROCESSING') {
      return <Tag variant='secondary'>처리중</Tag>;
    } else {
      return <Tag variant='primary'>완료</Tag>;
    }
  };

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
          문의내용
        </div>
        <div
          className={cn(cellClass, 'text-base-l-16-1 text-left text-gray-400')}
        >
          문의시간
        </div>
        <div className='text-base-l-16-1 flex-center text-gray-400'>상태</div>
      </div>

      {items.length === 0 && !isLoading ? (
        <div className='py-25 whitespace-pre-wrap text-center text-gray-400'>
          {`문의하신 내역이 없습니다. \n매물에 대한 궁금한 상사항이 있다면 언제든 문의해주세요`}
        </div>
      ) : (
        <Accordion className='w-full'>
          {items.map((inquiry) => (
            <AccordionItem key={inquiry.id} value={String(inquiry.id)}>
              <AccordionTrigger className='py-0 hover:bg-gray-50' hideIcon>
                <div className={itemContentGridClass}>
                  {/* 카테고리 컬럼 */}
                  <div className={cn(cellClass, 'text-base-l-16-2 text-left')}>
                    {inquiry.category.name}
                  </div>
                  {/* 문의내용 컬럼 */}
                  <div className={cn(cellClass, 'text-base-l-16-2 text-left')}>
                    {inquiry.title}
                  </div>
                  {/* 문의시간 컬럼 */}
                  <div
                    className={cn(
                      cellClass,
                      'text-base-m-14-1 flex flex-col text-left text-gray-400',
                    )}
                  >
                    <span>
                      {getFormattedDate(inquiry.createdAt, 'yy.MM.dd')}
                    </span>
                    <span>{getFormattedDate(inquiry.createdAt, 'HH:mm')}</span>
                  </div>
                  {/* 상태 컬럼 */}
                  <div className='flex-center'>
                    {conditionedTag(inquiry.status)}
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className='pl-43 text-left'>
                <div className='flex flex-col gap-y-3'>
                  <div className='flex flex-wrap gap-x-1'>
                    {inquiry.images.map((img) => (
                      <div key={img.id} className='size-27.25 relative'>
                        <Image
                          src={img.imageFileUrl}
                          alt='이미지'
                          fill
                          sizes='109px'
                          className='object-cover'
                        />
                      </div>
                    ))}
                  </div>
                  <p className='whitespace-pre-wrap leading-relaxed'>
                    {inquiry.content}
                  </p>
                </div>
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
