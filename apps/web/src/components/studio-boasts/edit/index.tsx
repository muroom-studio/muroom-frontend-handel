'use client';

import { notFound, useRouter } from 'next/navigation';

import { toast } from 'sonner';

import Loading from '@/app/loading';
import { ImageItem } from '@/components/common/image-uploader';
import { usePutStudioBoastsMutation } from '@/hooks/api/studio-boasts/useMutations';
import { useStudioBoastsDetailQuery } from '@/hooks/api/studio-boasts/useQueries';
import { CreateStudioBoastsRequestProps } from '@/types/studio-boasts';

import StudioBoastsEditorForm from '../components/editor-form';
import DesktopStudioBoastsEditPage from './desktop';
import MobileStudioBoastsEditPage from './mobile';

interface Props {
  isMobile?: boolean;
  studioBoastId: string;
}

export default function StudioBoastsEditPage({
  isMobile,
  studioBoastId,
}: Props) {
  const router = useRouter();

  const { data: boastData, isLoading } = useStudioBoastsDetailQuery({
    studioBoastId,
  });
  const { mutate: editMutate, isPending } = usePutStudioBoastsMutation();

  const handleEditSubmit = (
    dto: Omit<CreateStudioBoastsRequestProps, 'imageFileKeys'>,
    imageFileKeys: string[],
    agreedToEventTerms: boolean,
  ) => {
    editMutate(
      {
        studioBoastId: String(studioBoastId),
        ...dto,
        imageFileKeys,
        studioId: dto.studioId ? dto.studioId : undefined,
        instagramAccount: dto.instagramAccount || undefined,
        agreedToEventTerms,
      },
      {
        onSuccess: () => {
          toast.success('매물 자랑 수정이 완료되었습니다.');
          if (isMobile) {
            router.replace('/studio-boasts');
          } else {
            router.replace(`/studio-boasts/${studioBoastId}`);
          }
        },
      },
    );
  };

  const convertUrlsToImageItems = (urls: string[] = []): ImageItem[] => {
    return urls.map((url) => {
      let fileKey = url;
      try {
        const urlObj = new URL(url);
        fileKey = urlObj.pathname.substring(1);
      } catch (e) {}

      return {
        id: Math.random().toString(36).substring(7),
        url: url,
        fileKey: fileKey,
        isLoading: false,
      };
    });
  };

  if (isLoading) return <Loading />;

  if (!isLoading && !boastData) return notFound();

  return (
    <StudioBoastsEditorForm
      isMobile={isMobile}
      isPending={isPending}
      initialValues={{
        content: boastData?.content,
        studioName:
          boastData?.studioInfo?.name ||
          boastData?.unknownStudioInfo?.name ||
          '',
        roadNameAddress:
          boastData?.studioInfo?.roadNameAddress ||
          boastData?.unknownStudioInfo?.roadNameAddress ||
          '',
        lotNumberAddress:
          boastData?.studioInfo?.lotNumberAddress ||
          boastData?.unknownStudioInfo?.lotNumberAddress ||
          '',
        detailedAddress:
          boastData?.studioInfo?.detailedAddress ||
          boastData?.unknownStudioInfo?.detailedAddress ||
          '',
        studioId: boastData?.studioInfo?.id || '',
        instagramAccount: boastData?.creatorUserInfo?.instagramAccount || '',
        agreedToEventTerms: true,
      }}
      initialImages={convertUrlsToImageItems(boastData?.imageFileUrls)}
      onSubmit={handleEditSubmit}
      MobileLayout={MobileStudioBoastsEditPage}
      DesktopLayout={DesktopStudioBoastsEditPage}
    />
  );
}
