'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { updateObjectProperty } from '@muroom/util';

import {
  usePostStudioBoastsMutation,
  useStudioBoastsPresignedUrlMutation,
} from '@/hooks/api/studio-boasts/useMutations';
import { useImageUpload } from '@/hooks/common/useImageUpload';
import { CreateStudioBoastsRequestProps } from '@/types/studio-boasts';

import StudioBoastsNewCommonForm from '../components/common-form';
import DesktopStudioBoastsNewPage from './desktop';
import MobileStudioBoastsNewPage from './mobile';

interface Props {
  isMobile?: boolean;
}

export default function StudioBoastsNewPage({ isMobile = false }: Props) {
  const router = useRouter();

  const [imageFileKeys, setImageFileKeys] = useState<string[]>([]);

  const [showConfirmCheckModal, setShowConfirmCheckModal] = useState(false);

  const [dto, setDto] = useState<
    Omit<CreateStudioBoastsRequestProps, 'imageFileKeys'>
  >({
    content: '',
    roadNameAddress: '',
    lotNumberAddress: '',
    detailedAddress: '',
    studioId: '',
    studioName: '',
    instagramAccount: '',
    agreedToEventTerms: false,
  });

  const { mutateAsync: getPresignedUrl } =
    useStudioBoastsPresignedUrlMutation();

  const { handleUploadImages } = useImageUpload(getPresignedUrl);

  const { mutate: studioBoastsMutate } = usePostStudioBoastsMutation();

  const mutationOptions = {
    onSuccess: () => {
      toast.success('매물 자랑 등록이 성공적으로 완료되었습니다.');
      router.replace('/studio-boasts');
    },
  };

  const submitHandler = () => {
    if (dto.instagramAccount && !dto.agreedToEventTerms) {
      setShowConfirmCheckModal(true);
      return;
    }

    studioBoastsMutate(
      {
        ...dto,
        imageFileKeys,
        studioId: dto.studioId !== '' ? dto.studioId : undefined,
        instagramAccount: dto.instagramAccount || undefined,
      },
      mutationOptions,
    );
  };

  const onRegister = () => {
    setDto((prev) => updateObjectProperty(prev, 'agreedToEventTerms', true));

    studioBoastsMutate(
      {
        ...dto,
        agreedToEventTerms: true,
        imageFileKeys,
        studioId: dto.studioId !== '' ? dto.studioId : undefined,
        instagramAccount: dto.instagramAccount || undefined,
      },
      mutationOptions,
    );
  };

  const isFormValid =
    imageFileKeys.length > 0 &&
    [
      'content',
      'studioName',
      'roadNameAddress',
      'lotNumberAddress',
      'detailedAddress',
    ].every((key) => dto[key as keyof typeof dto] !== '');

  const commonProps = {
    handleUploadImages,
    setImageKeys: setImageFileKeys,
    value: dto,
    setValue: setDto,
    showConfirmCheckModal,
    setShowConfirmCheckModal,
    onRegister,
  };

  if (isMobile) {
    return (
      <MobileStudioBoastsNewPage
        submitHandler={submitHandler}
        isFormValid={isFormValid}
      >
        <StudioBoastsNewCommonForm isMobile {...commonProps} />
      </MobileStudioBoastsNewPage>
    );
  }

  return (
    <DesktopStudioBoastsNewPage
      submitHandler={submitHandler}
      isFormValid={isFormValid}
    >
      <StudioBoastsNewCommonForm {...commonProps} />
    </DesktopStudioBoastsNewPage>
  );
}
