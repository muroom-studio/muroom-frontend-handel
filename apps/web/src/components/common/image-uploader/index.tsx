'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { toast } from 'sonner';

import { Spinner } from '@muroom/components';
import { CloseIcon, PlusIcon } from '@muroom/icons';
import { cn } from '@muroom/lib';

import { CommonImageUploadResponseProps } from '@/types/api';

import CommonImage from '../common-image';

export interface ImageItem {
  id: string;
  url?: string;
  fileKey?: string;
  isLoading: boolean;
}

interface ImageUploaderProps {
  label?: string;
  showImageCount?: boolean;
  wrapperClassName?: string;
  maxImages?: number;
  uploadFn: (files: File[]) => Promise<CommonImageUploadResponseProps[]>;
  onImagesChange: (imageKeys: string[]) => void;
  isMobile?: boolean;
  initialImages?: ImageItem[];
}

export default function ImageUploader({
  label,
  showImageCount = false,
  wrapperClassName,
  maxImages = 4,
  uploadFn,
  onImagesChange,
  isMobile = false,
  initialImages = [],
}: ImageUploaderProps) {
  const [images, setImages] = useState<ImageItem[]>(initialImages);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImages.length > 0 && images.length === 0) {
      setImages(initialImages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialImages]);

  useEffect(() => {
    const validKeys = images
      .filter((img) => !img.isLoading && img.fileKey)
      .map((img) => img.fileKey as string);

    onImagesChange(validKeys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      toast.info(`최대 ${maxImages}장까지만 등록 가능합니다.`);
      return;
    }

    const newFiles = Array.from(files);

    const placeholders: ImageItem[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      isLoading: true,
    }));

    setImages((prev) => [...prev, ...placeholders]);

    try {
      const presignedDataList = await uploadFn(newFiles);

      const uploadPromises = newFiles.map(async (file, index) => {
        const data = presignedDataList[index];
        if (!data || !data.presignedPutUrl) {
          throw new Error(`${file.name}의 업로드 URL을 받지 못했습니다.`);
        }

        const response = await fetch(data.presignedPutUrl, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type },
        });

        if (!response.ok) {
          throw new Error(`S3 업로드 실패: ${response.statusText}`);
        }

        return response;
      });

      await Promise.all(uploadPromises);

      setImages((prev) => {
        const updated = [...prev];
        const startIndex = updated.length - placeholders.length;

        presignedDataList.forEach((data, idx) => {
          const targetIndex = startIndex + idx;
          if (updated[targetIndex]) {
            updated[targetIndex].fileKey = data.fileKey;
            updated[targetIndex].isLoading = false;
          }
        });

        return updated;
      });
    } catch (error) {
      console.error('Image Upload Error:', error);
      toast.error('이미지 업로드에 실패했습니다. (CORS 또는 네트워크 확인)');
      setImages((prev) => prev.slice(0, prev.length - placeholders.length));
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemove = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const triggerInput = () => fileInputRef.current?.click();

  return (
    <div className={cn('flex w-full flex-col gap-y-4', wrapperClassName)}>
      <input
        ref={fileInputRef}
        type='file'
        multiple
        accept='image/*'
        onChange={handleFileChange}
        className='hidden'
      />

      {(label || showImageCount) && (
        <div className='flex-between'>
          {label && (
            <span
              onClick={triggerInput}
              className='text-title-s-22-1 cursor-default'
            >
              {label}
            </span>
          )}
          {showImageCount && (
            <span className='text-title-exs-18 text-gray-400'>
              <span className='text-gray-800'>{images.length}</span>/{maxImages}
            </span>
          )}
        </div>
      )}

      {images.length === 0 ? (
        <div
          onClick={triggerInput}
          className='flex-center-col px-auto py-13 rounded-4 w-full cursor-pointer border border-dashed border-gray-400 bg-white hover:bg-gray-50'
        >
          <div className='flex-center rounded-1000 bg-primary-400 size-6'>
            <PlusIcon className='size-4.5 text-white' />
          </div>
          <span className='text-base-m-14-1 mt-4 text-gray-600'>
            {`사진 추가하기(${images.length}/${maxImages})`}
          </span>
        </div>
      ) : (
        <div
          className={cn(
            'rounded-4 w-full border border-dashed border-gray-400 bg-white p-4',
            {
              'border-solid border-gray-300': isMobile && images.length > 0,
            },
          )}
        >
          <div
            className={cn(
              isMobile
                ? 'gap-2.75 grid grid-cols-2 place-content-center'
                : 'flex flex-wrap gap-4',
            )}
          >
            {images.map((img) => (
              <div
                key={img.id}
                className={cn(
                  'relative',
                  isMobile
                    ? 'aspect-square w-full'
                    : 'h-[130px] w-[130px] shrink-0',
                )}
              >
                <CommonImage
                  src={img.url || ''}
                  alt='preview'
                  fill
                  sizes={isMobile ? '50vw' : '130px'}
                  className={`rounded-4 object-cover transition-opacity ${
                    img.isLoading ? 'opacity-50' : 'opacity-100'
                  }`}
                />

                {img.isLoading && (
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <Spinner variant='component' />
                  </div>
                )}

                {!img.isLoading && (
                  <button
                    type='button'
                    onClick={() => handleRemove(img.id)}
                    className='flex-center rounded-1000 absolute -right-2 -top-2 z-10 size-4 cursor-pointer border border-gray-200 bg-white hover:bg-gray-100'
                  >
                    <CloseIcon className='size-2 text-black' />
                  </button>
                )}
              </div>
            ))}

            {images.length < maxImages && (
              <div
                onClick={triggerInput}
                className={cn(
                  'flex-center-col rounded-4 flex cursor-pointer border border-dashed border-gray-300 bg-white hover:bg-gray-50',
                  isMobile ? 'w-full' : 'h-[130px] w-[130px] shrink-0',
                  isMobile && images.length === 2
                    ? 'aspect-2/1 col-span-2'
                    : isMobile
                      ? 'aspect-square'
                      : '',
                )}
              >
                <div className='flex-center rounded-1000 bg-primary-400 size-6'>
                  <PlusIcon className='size-4.5 text-white' />
                </div>
                <span className='text-base-m-14-1 mt-4 text-gray-600'>
                  {`사진 추가하기(${images.length}/${maxImages})`}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
