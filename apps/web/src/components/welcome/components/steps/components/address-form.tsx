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

export interface AddressFieldMap<T> {
  address: keyof T;
  detailAddress: keyof T;
  jibunAddress?: keyof T;
  name?: keyof T;
}

interface Props<T> {
  isMobile?: boolean;
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  onMyPage?: boolean;
  fieldMap: AddressFieldMap<T>;
  label?: string;
}

export default function AddressForm<T>({
  isMobile = false,
  value,
  setValue,
  onMyPage = false,
  fieldMap,
  label = '내 작업실',
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const updateField = (key: keyof T, newValue: any) => {
    setValue((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

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

    const lotNumberAddress = data.jibunAddress || data.autoJibunAddress || '';

    setValue((prev) => {
      const updates = {} as Partial<T>;

      updates[fieldMap.address] = fullAddress as any;

      if (fieldMap.jibunAddress) {
        updates[fieldMap.jibunAddress] = lotNumberAddress as any;
      }

      return {
        ...prev,
        ...updates,
      };
    });

    setIsOpen(false);
  };

  const toggleModal = () => setIsOpen((prev) => !prev);

  const PostcodeContent = (
    <DaumPostcode onComplete={handleComplete} style={{ height: '100%' }} />
  );

  return (
    <div className='flex flex-col gap-y-[9px]'>
      {!onMyPage && (
        <RequiredText htmlFor='address' required={false}>
          {label}
        </RequiredText>
      )}

      <div className='grid w-full grid-cols-[1fr_auto] gap-x-3'>
        <TextField
          id='address'
          value={String(value[fieldMap.address] || '')}
          placeholder='주소 찾기'
          readOnly
          disabled
          onClick={toggleModal}
          className='cursor-pointer'
        />
        <Button
          type='button'
          variant='outline'
          size='l'
          onClick={toggleModal}
          className={onMyPage ? 'flex-none' : ''}
        >
          주소찾기
        </Button>
      </div>

      <TextField
        placeholder='상세주소를 입력해주세요'
        value={String(value[fieldMap.detailAddress] || '')}
        onChange={(e) => updateField(fieldMap.detailAddress, e.target.value)}
        onClear={() => updateField(fieldMap.detailAddress, '')}
        disabled={!value[fieldMap.address]}
      />

      {fieldMap.name && (
        <TextField
          placeholder='작업실 이름을 입력해주세요'
          value={String(value[fieldMap.name] || '')}
          onChange={(e) => updateField(fieldMap.name!, e.target.value)}
          onClear={() => updateField(fieldMap.name!, '')}
        />
      )}

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
