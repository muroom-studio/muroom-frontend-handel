'use client';

import { Dispatch, SetStateAction } from 'react';

import { TextBox, TextField, ToggleButton } from '@muroom/components';
import { updateObjectProperty } from '@muroom/util';

import ImageUploader from '@/components/common/image-uploader';
import { CommonImageUploadResponseProps } from '@/types/api';
import { InquiryCategoryItem } from '@/types/inquiries';

interface InquiryFormValue {
  title: string;
  content: string;
}

interface Props {
  isMobile?: boolean;
  inquiryCategoriesData: InquiryCategoryItem[];

  // Props로 상태 및 핸들러 전달받음
  categoryId: number;
  setCategoryId: Dispatch<SetStateAction<number>>;
  value: InquiryFormValue;
  setValue: Dispatch<SetStateAction<InquiryFormValue>>;
  imageKeys: string[];
  setImageKeys: Dispatch<SetStateAction<string[]>>;
  // [수정] 반환 타입 업데이트
  handleUploadImages: (
    files: File[],
  ) => Promise<CommonImageUploadResponseProps[]>;
}

export default function MypageCsInquiryNewCommonForm({
  isMobile = false,
  inquiryCategoriesData,
  categoryId,
  setCategoryId,
  value,
  setValue,
  imageKeys,
  setImageKeys,
  handleUploadImages,
}: Props) {
  return (
    <div className='flex w-full flex-col gap-y-10'>
      <div className='flex flex-col gap-y-4'>
        <span className='text-title-s-22-1'>문의유형</span>
        <div className='flex items-center gap-x-2'>
          {inquiryCategoriesData.map((category) => (
            <ToggleButton
              key={category.id}
              variant='outline'
              size='m'
              selected={category.id === categoryId}
              onSelectedChange={(isSelected) => {
                if (isSelected) setCategoryId(category.id);
              }}
            >
              {category.name}
            </ToggleButton>
          ))}
        </div>
      </div>
      <TextField
        className='flex flex-col gap-y-4'
        customLabel={<span className='text-title-s-22-1'>문의제목</span>}
        placeholder='제목을 입력해주세요'
        value={value.title}
        onChange={(e) =>
          setValue((prev) =>
            updateObjectProperty(prev, 'title', e.target.value),
          )
        }
        onClear={() =>
          setValue((prev) => updateObjectProperty(prev, 'title', ''))
        }
      />

      <div className='flex flex-col gap-y-4'>
        <label htmlFor='EXTRA_TEXT'>
          <span className='text-title-s-22-1'>문의내용</span>
        </label>
        <TextBox
          id='EXTRA_TEXT'
          placeholder='문의하시는 내용에 대해 자세하게 적어주시면 빠르게 도와드리도록 하겠습니다'
          value={value.content}
          onChange={(e) =>
            setValue((prev) =>
              updateObjectProperty(prev, 'content', e.target.value),
            )
          }
        />
      </div>

      <ImageUploader
        isMobile={isMobile}
        label='사진'
        showImageCount
        uploadFn={handleUploadImages}
        onImagesChange={setImageKeys}
        maxImages={4}
      />

      <div className='text-base-l-16-1 flex flex-col gap-y-2 text-gray-500'>
        <span>
          문의 내역은 내정보 {'>'} 고객센터 {'>'} 1:1 문의내역 메뉴에서 확인하실
          수 있습니다.
        </span>
        <span>모든 문의는 접수된 순서대로 빠짐없이 확인 중입니다.</span>
      </div>
    </div>
  );
}
