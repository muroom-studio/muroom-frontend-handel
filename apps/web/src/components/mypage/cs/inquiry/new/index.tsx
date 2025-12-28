'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import Loading from '@/app/loading';
import {
  useInquiriesMutation,
  useInquiriesPresignedUrlMutation,
} from '@/hooks/api/inquiries/useMutations';
import { useInquiryCategories } from '@/hooks/api/inquiries/useQueries';
import { useImageUpload } from '@/hooks/common/useImageUpload';

import DesktopMypageCsInquiryNewPage from './desktop';
import MobileMypageCsInquiryNewPage from './mobile';

interface Props {
  isMobile?: boolean;
}

export default function MypageCsInquiryNewPage({ isMobile }: Props) {
  const router = useRouter();

  const [showCancelAlert, setShowCancelAlert] = useState(false);

  const { data: inquiryCategoriesData, isLoading } = useInquiryCategories();

  const [categoryId, setCategoryId] = useState(0);

  const [value, setValue] = useState({
    title: '',
    content: '',
  });
  const [imageKeys, setImageKeys] = useState<string[]>([]);

  const { mutateAsync: getPresignedUrl } = useInquiriesPresignedUrlMutation();

  const { handleUploadImages } = useImageUpload(getPresignedUrl);

  const { mutate: inquiriesMutate } = useInquiriesMutation();

  const submitHandler = () => {
    inquiriesMutate(
      {
        categoryId,
        title: value.title,
        content: value.content,
        imageKeys,
      },
      {
        onSuccess: () => {
          toast.success('문의 등록이 성공적으로 완료되었습니다.');
          router.replace('/mypage/cs?inquiry=true');
        },
        onError: () => {
          toast.error('문의 등록이 실패했습니다.');
        },
      },
    );
  };

  const isFormValid =
    categoryId !== 0 && value.title !== '' && value.content !== '';

  if (isLoading || !inquiryCategoriesData) {
    return <Loading />;
  }

  const commonProps = {
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
  };

  if (isMobile) {
    return <MobileMypageCsInquiryNewPage {...commonProps} />;
  }
  return <DesktopMypageCsInquiryNewPage {...commonProps} />;
}
