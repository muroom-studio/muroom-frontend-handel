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
import { PresignedUrlItem } from '@/types/inquiries';

import DesktopMypageCsInquiryNewPage from './desktop';
import MobileMypageCsInquiryNewPage from './mobile';

interface Props {
  isMobile?: boolean;
}

export default function MypageCsInquiryNewPage({ isMobile }: Props) {
  const router = useRouter();

  const { data: inquiryCategoriesData, isLoading } = useInquiryCategories();

  const [categoryId, setCategoryId] = useState(
    inquiryCategoriesData?.[0]?.id || 0,
  );

  const [value, setValue] = useState({
    title: '',
    content: '',
  });
  const [imageKeys, setImageKeys] = useState<string[]>([]);

  const { mutateAsync: getPresignedUrls } = useInquiriesPresignedUrlMutation();
  const { mutate: inquiriesMutate } = useInquiriesMutation();

  const handleUploadImages = async (
    files: File[],
  ): Promise<PresignedUrlItem[]> => {
    const requestPayload = {
      inquiryImages: files.map((file) => ({
        fileName: file.name,
        categoryId,
        contentType: file.type,
      })),
    };

    const response = await getPresignedUrls(requestPayload);

    return response.presignedUrls.map((item) => ({
      fileKey: item.fileKey,
      url: item.url,
    }));
  };

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
          router.replace('/mypage/cs');
        },
        onError: () => {
          toast.error('문의 등록이 실패했습니다.');
        },
      },
    );
  };

  const isFormValid =
    value.title !== '' && value.content !== '' && imageKeys.length > 0;

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
    submitHandler,
    isFormValid,
  };

  if (isMobile) {
    return <MobileMypageCsInquiryNewPage {...commonProps} />;
  }
  return <DesktopMypageCsInquiryNewPage {...commonProps} />;
}
