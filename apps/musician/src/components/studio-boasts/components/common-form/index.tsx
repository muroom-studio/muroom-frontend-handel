'use client';

import { TextBox } from '@muroom/components';
import { cn } from '@muroom/lib';
import { updateObjectProperty } from '@muroom/util';

import ImageUploader, { ImageItem } from '@/components/common/image-uploader';
import AddressForm from '@/components/welcome/components/steps/components/address-form';
import { CommonImageUploadResponseProps } from '@/types/api';
import { CreateStudioBoastsRequestProps } from '@/types/studio-boasts';

interface Props {
  isMobile?: boolean;
  handleUploadImages: (
    files: File[],
  ) => Promise<CommonImageUploadResponseProps[]>;
  setImageKeys: React.Dispatch<React.SetStateAction<string[]>>;
  value: Omit<CreateStudioBoastsRequestProps, 'imageFileKeys'>;
  setValue: React.Dispatch<
    React.SetStateAction<Omit<CreateStudioBoastsRequestProps, 'imageFileKeys'>>
  >;
  initialImages?: ImageItem[];
}

export default function StudioBoastsNewCommonForm({
  isMobile = false,
  handleUploadImages,
  setImageKeys,
  value,
  setValue,
  initialImages,
}: Props) {
  return (
    <div
      className={cn('flex w-full flex-col gap-y-10 pb-[46px]', {
        'px-5 pb-0': !isMobile,
      })}
    >
      <div className='flex flex-col gap-y-4'>
        <h1 className='text-title-s-22-2'>내 작업실을 소개해주세요.</h1>
        <span className='text-base-exl-18-1'>
          여러분의 인생 작업실을 소개해주세요. 내 작업실, 단골 작업실, 친구
          작업실 어디든 보기만 해도 영감이 샘솟는 작업실을 찾습니다!
        </span>
      </div>

      <ImageUploader
        isMobile={isMobile}
        label='사진'
        showImageCount
        uploadFn={handleUploadImages}
        onImagesChange={setImageKeys}
        maxImages={3}
        initialImages={initialImages}
      />

      <div className='flex flex-col gap-y-4'>
        <label htmlFor='CONTENT'>
          <span className='text-title-s-22-1'>내용 작성</span>
        </label>
        <TextBox
          id='CONTENT'
          placeholder='나만의 멋진 작업실을 소개해주세요.'
          value={value.content}
          onChange={(e) =>
            setValue((prev) =>
              updateObjectProperty(prev, 'content', e.target.value),
            )
          }
          minLength={10}
        />
      </div>

      <AddressForm
        isMobile={isMobile}
        value={value as any}
        setValue={setValue as any}
        fieldMap={{
          address: 'roadNameAddress',
          jibunAddress: 'lotNumberAddress',
          detailAddress: 'detailedAddress',
          name: 'studioName',
          studioId: 'studioId',
        }}
      />
    </div>
  );
}
