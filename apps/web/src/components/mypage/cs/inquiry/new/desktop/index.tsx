import { Dispatch, SetStateAction } from 'react';

import { Button } from '@muroom/components';

import PageWrapper from '@/components/common/page-wrapper';
import { CommonImageUploadResponseProps } from '@/types/api';
import { InquiryCategoryItem } from '@/types/inquiries';

import CancelAlert from '../cancel-alert';
import MypageCsInquiryNewCommonForm from '../common-form';

interface Props {
  inquiryCategoriesData: InquiryCategoryItem[];
  categoryId: number;
  setCategoryId: Dispatch<SetStateAction<number>>;
  value: { title: string; content: string };
  setValue: Dispatch<SetStateAction<{ title: string; content: string }>>;
  imageKeys: string[];
  setImageKeys: Dispatch<SetStateAction<string[]>>;
  handleUploadImages: (
    files: File[],
  ) => Promise<CommonImageUploadResponseProps[]>;
  showCancelAlert: boolean;
  setShowCancelAlert: Dispatch<SetStateAction<boolean>>;
  submitHandler: () => void;
  isFormValid: boolean;
}

export default function DesktopMypageCsInquiryNewPage({
  inquiryCategoriesData,
  categoryId,
  setCategoryId,
  value,
  setValue,
  imageKeys,
  setImageKeys,
  handleUploadImages,
  showCancelAlert,
  setShowCancelAlert,
  submitHandler,
  isFormValid,
}: Props) {
  return (
    <PageWrapper title='1:1 문의하기'>
      <div className='flex flex-col gap-y-10'>
        <MypageCsInquiryNewCommonForm
          isMobile={false}
          inquiryCategoriesData={inquiryCategoriesData}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          value={value}
          setValue={setValue}
          imageKeys={imageKeys}
          setImageKeys={setImageKeys}
          handleUploadImages={handleUploadImages}
        />

        <div className='grid grid-cols-2 gap-x-3 border-t border-t-gray-200 p-5'>
          <Button
            variant='outline'
            size='xl'
            onClick={() => setShowCancelAlert(true)}
          >
            취소하기
          </Button>
          <Button
            onClick={submitHandler}
            variant='primary'
            size='xl'
            disabled={!isFormValid}
          >
            문의하기
          </Button>
        </div>
      </div>

      <CancelAlert
        isOpen={showCancelAlert}
        onClose={() => setShowCancelAlert(false)}
      />
    </PageWrapper>
  );
}
