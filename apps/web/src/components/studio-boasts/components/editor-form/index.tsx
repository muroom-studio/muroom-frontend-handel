'use client';

import { useState } from 'react';

import { updateObjectProperty } from '@muroom/util';

import { ImageItem } from '@/components/common/image-uploader';
import { useStudioBoastsPresignedUrlMutation } from '@/hooks/api/studio-boasts/useMutations';
import { useImageUpload } from '@/hooks/common/useImageUpload';
import { CreateStudioBoastsRequestProps } from '@/types/studio-boasts';

import StudioBoastsNewCommonForm from '../common-form';

export interface StudioBoastsLayoutProps {
  submitHandler: () => void;
  isFormValid: boolean;
  children: React.ReactNode;
  isLoading?: boolean;
}

interface Props {
  isMobile?: boolean;
  initialValues?: Partial<CreateStudioBoastsRequestProps>;
  initialImages?: ImageItem[];
  onSubmit: (
    data: Omit<CreateStudioBoastsRequestProps, 'imageFileKeys'>,
    imageFileKeys: string[],
    agreedToEventTerms: boolean,
  ) => void;
  isPending: boolean;
  MobileLayout: React.ComponentType<StudioBoastsLayoutProps>;
  DesktopLayout: React.ComponentType<StudioBoastsLayoutProps>;
}

export default function StudioBoastsEditorForm({
  isMobile = false,
  initialValues,
  initialImages = [],
  onSubmit,
  isPending,
  MobileLayout,
  DesktopLayout,
}: Props) {
  const [imageFileKeys, setImageFileKeys] = useState<string[]>(
    initialImages.map((img) => img.fileKey || ''),
  );

  const [showConfirmCheckModal, setShowConfirmCheckModal] = useState(false);

  const [dto, setDto] = useState<
    Omit<CreateStudioBoastsRequestProps, 'imageFileKeys' | 'studioId'> & {
      studioId: number | string;
    }
  >({
    content: initialValues?.content || '',
    roadNameAddress: initialValues?.roadNameAddress || '',
    lotNumberAddress: initialValues?.lotNumberAddress || '',
    detailedAddress: initialValues?.detailedAddress || '',
    studioId: initialValues?.studioId ?? '',
    studioName: initialValues?.studioName || '',
    instagramAccount: initialValues?.instagramAccount || '',
    agreedToEventTerms: initialValues?.agreedToEventTerms || false,
  });

  const { mutateAsync: getPresignedUrl } =
    useStudioBoastsPresignedUrlMutation();
  const { handleUploadImages } = useImageUpload(getPresignedUrl);

  const submitHandler = () => {
    if (dto.instagramAccount && !dto.agreedToEventTerms) {
      setShowConfirmCheckModal(true);
      return;
    }
    onSubmit(
      dto as Omit<CreateStudioBoastsRequestProps, 'imageFileKeys'>,
      imageFileKeys,
      dto.agreedToEventTerms,
    );
  };

  const onRegister = () => {
    setDto((prev) => updateObjectProperty(prev, 'agreedToEventTerms', true));
    onSubmit(
      dto as Omit<CreateStudioBoastsRequestProps, 'imageFileKeys'>,
      imageFileKeys,
      true,
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
    value: dto as any,
    setValue: setDto as any,
    showConfirmCheckModal,
    setShowConfirmCheckModal,
    onRegister,
    initialImages,
  };

  const Layout = isMobile ? MobileLayout : DesktopLayout;

  return (
    <Layout
      submitHandler={submitHandler}
      isFormValid={isFormValid}
      isLoading={isPending}
    >
      <StudioBoastsNewCommonForm isMobile={isMobile} {...commonProps} />
    </Layout>
  );
}
