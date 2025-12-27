import { AnimatePresence, motion } from 'framer-motion';

import { TextBox, TextField } from '@muroom/components';
import { cn } from '@muroom/lib';
import { updateObjectProperty } from '@muroom/util';

import ImageUploader from '@/components/common/image-uploader';
import AddressForm from '@/components/welcome/components/steps/components/address-form';
import { CommonImageUploadResponseProps } from '@/types/api';
import { CreateStudioBoastsRequestProps } from '@/types/studio-boasts';

import InstaAgreement from './insta-agreement';

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
  showConfirmCheckModal: boolean;
  setShowConfirmCheckModal: React.Dispatch<React.SetStateAction<boolean>>;
  onRegister?: () => void;
}

export default function StudioBoastsNewCommonForm({
  isMobile = false,
  handleUploadImages,
  setImageKeys,
  value,
  setValue,
  showConfirmCheckModal,
  setShowConfirmCheckModal,
  onRegister,
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
        value={value}
        setValue={setValue}
        onMyPage={true}
        fieldMap={{
          address: 'roadNameAddress',
          jibunAddress: 'lotNumberAddress',
          detailAddress: 'detailedAddress',
          name: 'studioName',
        }}
      />

      <div aria-description='인스타약관' className='flex flex-col gap-y-6'>
        <TextField
          className='flex flex-col gap-y-4'
          customLabel={
            <div className='flex flex-col gap-y-3'>
              <span className='text-title-s-22-1'>이벤트 참여 확인</span>
              <span className='text-base-l-16-1 text-gray-600'>
                이벤트 참여를 위해 인스타그램 아이디를 입력해 주세요. 입력하신
                아이디는 외부에 공개되거나 다른 목적으로 사용되지 않습니다.
              </span>
            </div>
          }
          placeholder='본인의 인스타그램 아이디를 입력해주세요'
          value={value.instagramAccount}
          onChange={(e) =>
            setValue((prev) =>
              updateObjectProperty(prev, 'instagramAccount', e.target.value),
            )
          }
        />
        <AnimatePresence initial={false}>
          {value.instagramAccount && (
            <motion.div
              key='insta-agreement'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <InstaAgreement
                isMobile={isMobile}
                value={value}
                setValue={setValue}
                showConfirmCheckModal={showConfirmCheckModal}
                setShowConfirmCheckModal={setShowConfirmCheckModal}
                onRegister={onRegister}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
