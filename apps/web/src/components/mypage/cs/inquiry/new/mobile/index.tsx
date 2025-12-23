import { Dispatch, SetStateAction } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@muroom/components';

import PageWrapper from '@/components/common/page-wrapper';
import { InquiryCategoryItem, PresignedUrlItem } from '@/types/inquiries';

import MypageCsInquiryNewCommonForm from '../common-form';

interface Props {
  inquiryCategoriesData: InquiryCategoryItem[];
  categoryId: number;
  setCategoryId: Dispatch<SetStateAction<number>>;
  value: { title: string; content: string };
  setValue: Dispatch<SetStateAction<{ title: string; content: string }>>;
  imageKeys: string[];
  setImageKeys: Dispatch<SetStateAction<string[]>>;
  handleUploadImages: (files: File[]) => Promise<PresignedUrlItem[]>;
  submitHandler: () => void;
  isFormValid: boolean;
}

export default function MobileMypageCsInquiryNewPage({
  inquiryCategoriesData,
  categoryId,
  setCategoryId,
  value,
  setValue,
  imageKeys,
  setImageKeys,
  handleUploadImages,
  submitHandler,
  isFormValid,
}: Props) {
  const router = useRouter();

  return (
    <PageWrapper
      isMobile
      isHeader={{ title: '1:1 문의하기', onBackClick: () => router.back() }}
      bottomSlot={
        <div className='grid grid-cols-2 gap-x-3 px-5 pb-0.5 pt-3'>
          <Button
            variant='outline'
            size='xl'
            onClick={() => router.back()}
            className='w-full'
          >
            취소하기
          </Button>
          <Button
            onClick={submitHandler}
            variant='primary'
            size='xl'
            disabled={!isFormValid}
            className='w-full'
          >
            문의하기
          </Button>
        </div>
      }
    >
      <MypageCsInquiryNewCommonForm
        isMobile
        inquiryCategoriesData={inquiryCategoriesData}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        value={value}
        setValue={setValue}
        imageKeys={imageKeys}
        setImageKeys={setImageKeys}
        handleUploadImages={handleUploadImages}
      />
    </PageWrapper>
  );
}
