'use client';

import { Tag } from '@muroom/components';

import Loading from '@/app/loading';
import CommonImage from '@/components/common/common-image';
import DraggableCarousel from '@/components/common/draggable-carousel';
import PageWrapper from '@/components/common/page-wrapper';
import { useInquiriesDetailQuery } from '@/hooks/api/inquiries/useQueries';
import { InquiriesDetailResponseProps } from '@/types/inquiries';

interface Props {
  targetedId: string;
  onClose: () => void;
  contentHeader: (inquiry: InquiriesDetailResponseProps) => React.ReactNode;
}

export default function InquiryDetail({
  targetedId,
  onClose,
  contentHeader,
}: Props) {
  const { data: inquiriesDetailData, isLoading: isInquiriesDetailLoading } =
    useInquiriesDetailQuery({
      inquiryId: targetedId,
    });

  if (!inquiriesDetailData || isInquiriesDetailLoading) return <Loading />;

  return (
    <PageWrapper
      isMobile
      isHeader={{ title: '1:1 문의내역', onBackClick: onClose }}
      className='z-9999 fixed inset-0 bg-white'
      contentClassName='pt-0'
      isModal
    >
      {contentHeader(inquiriesDetailData)}
      <div className='flex flex-col gap-y-2 border-y border-y-gray-200 py-6'>
        <DraggableCarousel containerClassName='gap-x-1'>
          {inquiriesDetailData.images.map((image) => (
            <div
              key={`${image.id}-image`}
              className='relative h-[140px] w-[140px] flex-none cursor-pointer transition-opacity hover:opacity-90'
            >
              <CommonImage
                src={image.imageFileUrl}
                alt={`${image.id}-image`}
                fill
                className='object-cover'
                sizes='140px'
                draggable={false}
              />
            </div>
          ))}
        </DraggableCarousel>
        <p className='text-base-l-16-1'>{inquiriesDetailData.content}</p>
      </div>
      {inquiriesDetailData.reply && (
        <div className='flex flex-col gap-y-2 py-6'>
          <Tag variant='primary' size='s' className='w-fit'>
            답변완료
          </Tag>
          <DraggableCarousel containerClassName='gap-x-1'>
            {inquiriesDetailData.reply.imageUrls.map((image) => (
              <div
                key={`${image.id}-image`}
                className='relative h-[140px] w-[140px] flex-none cursor-pointer transition-opacity hover:opacity-90'
              >
                <CommonImage
                  src={image.imageFileUrl}
                  alt={`${image.id}-image`}
                  fill
                  className='object-cover'
                  sizes='140px'
                  draggable={false}
                />
              </div>
            ))}
          </DraggableCarousel>
          <p className='text-base-l-16-1'>
            {inquiriesDetailData.reply.content}
          </p>
        </div>
      )}
    </PageWrapper>
  );
}
