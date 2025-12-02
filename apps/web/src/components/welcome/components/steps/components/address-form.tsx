'use client';

import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

import {
  Button,
  ModalBottomSheet,
  RequiredText,
  TextField,
} from '@muroom/components';
import { CloseIcon } from '@muroom/icons';
import { updateObjectProperty } from '@muroom/util';

import { StudioJuso } from '../third-step';

interface Props {
  isMobile?: boolean;
  value: StudioJuso;
  setValue: React.Dispatch<React.SetStateAction<StudioJuso>>;
}

export default function AddressForm({
  isMobile = false,
  value,
  setValue,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data: any) => {
    let fullAddress = data.roadAddress || data.autoRoadAddress || data.address;
    let extraAddress = '';

    if (data.bname !== '') {
      extraAddress += data.bname;
    }
    if (data.buildingName !== '') {
      extraAddress +=
        extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
    }

    if (extraAddress !== '') {
      fullAddress += ` (${extraAddress})`;
    }

    setValue((prev) => ({
      ...prev,
      juso: fullAddress,
    }));

    setIsOpen(false);
  };

  const toggleModal = () => setIsOpen((prev) => !prev);

  const PostcodeContent = (
    <DaumPostcode onComplete={handleComplete} style={{ height: '100%' }} />
  );

  return (
    <div className='flex flex-col gap-y-[9px]'>
      <RequiredText htmlFor='address' required={false}>
        내 작업실
      </RequiredText>

      <div className='grid grid-cols-[248px_1fr] gap-x-3'>
        <TextField
          id='address'
          value={value.juso}
          placeholder='작업실 찾기'
          readOnly
          disabled
          onClick={toggleModal}
          className='cursor-pointer'
        />
        <Button type='button' variant='outline' size='l' onClick={toggleModal}>
          주소찾기
        </Button>
      </div>

      <TextField
        placeholder='상세주소를 입력해주세요'
        value={value.detailJuso}
        onChange={(e) =>
          setValue((prev) =>
            updateObjectProperty(prev, 'detailJuso', e.target.value),
          )
        }
        onClear={() =>
          setValue((prev) => updateObjectProperty(prev, 'detailJuso', ''))
        }
        disabled={!value.juso}
      />

      <TextField
        placeholder='작업실 이름을 입력해주세요'
        value={value.studioName}
        onChange={(e) =>
          setValue((prev) =>
            updateObjectProperty(prev, 'studioName', e.target.value),
          )
        }
        onClear={() =>
          setValue((prev) => updateObjectProperty(prev, 'studioName', ''))
        }
      />

      {isMobile && (
        <ModalBottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footerBtns={
            <Button
              variant='outline'
              size='xl'
              className='w-full'
              onClick={() => setIsOpen(false)}
            >
              닫기
            </Button>
          }
        >
          <div className='flex h-full flex-col'>
            <span className='text-base-exl-18-2 text-black'>주소 찾기</span>
            <div className='h-[400px] pt-5'>{PostcodeContent}</div>
          </div>
        </ModalBottomSheet>
      )}

      {!isMobile && isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
          <div className='rounded-4 relative w-full max-w-[500px] overflow-hidden bg-white shadow-lg'>
            <div className='flex items-center justify-between border-b p-4'>
              <h3 className='text-base-l-16-2'>주소 찾기</h3>
              <button onClick={toggleModal} type='button'>
                <CloseIcon className='size-6 cursor-pointer text-gray-500' />
              </button>
            </div>
            <div className='h-[450px] w-full'>{PostcodeContent}</div>
          </div>
        </div>
      )}
    </div>
  );
}
