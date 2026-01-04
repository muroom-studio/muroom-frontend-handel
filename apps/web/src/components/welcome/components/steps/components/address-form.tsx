'use client';

import { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

import {
  Button,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  ModalBottomSheet,
  RequiredText,
  TextField,
} from '@muroom/components';
import { CloseIcon, DownArrowIcon } from '@muroom/icons';

import { useStudiosSearchAddressQuery } from '@/hooks/api/studios/useQueries';

export interface AddressFieldMap<T> {
  address: keyof T;
  detailAddress: keyof T;
  jibunAddress?: keyof T;
  name?: keyof T;
  studioId?: keyof T; // ✅ [추가] 스튜디오 ID를 매핑할 키
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
  const [searchAddress, setSearchAddress] = useState('');

  const [isNameDropdownVisible, setIsNameDropdownVisible] = useState(false);
  const [isDirectInputMode, setIsDirectInputMode] = useState(false);
  const [dropdownDefaultOpen, setDropdownDefaultOpen] = useState(false);

  const { data: searchResults } = useStudiosSearchAddressQuery({
    roadNameAddress: searchAddress,
  });

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setIsNameDropdownVisible(true);
    }
  }, [searchResults]);

  const updateField = (key: keyof T, newValue: any) => {
    setValue((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const handleComplete = (data: any) => {
    const basicAddress = data.address;
    const lotNumberAddress = data.jibunAddress || data.autoJibunAddress || '';

    setSearchAddress(basicAddress);

    setIsNameDropdownVisible(false);
    setIsDirectInputMode(false);
    setDropdownDefaultOpen(false);

    setValue((prev) => {
      const updates = {} as Partial<T>;

      updates[fieldMap.address] = basicAddress as any;

      if (fieldMap.jibunAddress) {
        updates[fieldMap.jibunAddress] = lotNumberAddress as any;
      }

      if (fieldMap.studioId) {
        updates[fieldMap.studioId] = '' as any;
      }

      return { ...prev, ...updates };
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
        <>
          {/* Case 1: 드롭다운 */}
          {isNameDropdownVisible && searchResults && !isDirectInputMode ? (
            <Dropdown
              className='w-full'
              defaultOpen={dropdownDefaultOpen}
              label={String(value[fieldMap.name] || '')}
              value={
                searchResults.find(
                  (s) => s.name === String(value[fieldMap.name!] || ''),
                )?.id || ''
              }
              placeholder='작업실 이름을 선택해주세요'
              onValueChange={(selectedId) => {
                if (selectedId === 'direct-input') {
                  setIsNameDropdownVisible(false);
                  setIsDirectInputMode(true);
                  setDropdownDefaultOpen(false);

                  const directInputData = searchResults.find(
                    (s) => s.id === 'direct-input',
                  );

                  if (directInputData) {
                    setValue((prev) => ({
                      ...prev,
                      [fieldMap.name!]: '',
                      [fieldMap.detailAddress]: directInputData.detailedAddress,
                      ...(fieldMap.studioId && { [fieldMap.studioId]: '' }),
                    }));
                  }
                  return;
                }

                const selectedStudio = searchResults.find(
                  (s) => s.id === selectedId,
                );
                if (selectedStudio) {
                  setValue((prev) => ({
                    ...prev,
                    [fieldMap.name!]: selectedStudio.name,
                    [fieldMap.address]: selectedStudio.roadNameAddress,
                    [fieldMap.detailAddress]: selectedStudio.detailedAddress,
                    ...(fieldMap.jibunAddress && {
                      [fieldMap.jibunAddress]: selectedStudio.lotNumberAddress,
                    }),
                    ...(fieldMap.studioId && {
                      [fieldMap.studioId]: selectedStudio.id,
                    }),
                  }));
                }
              }}
            >
              <DropdownTrigger
                variant='primary'
                size='l'
                className='max-w-full'
              />
              <DropdownContent className='max-h-[200px] w-[var(--radix-popper-anchor-width)] overflow-y-auto'>
                {searchResults.map((studio) => (
                  <DropdownItem key={studio.id} value={studio.id}>
                    {studio.name}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          ) : isDirectInputMode ? (
            // Case 2: [직접입력] 모드 TextField
            <TextField
              placeholder='작업실 이름을 입력해주세요'
              value={String(value[fieldMap.name] || '')}
              onChange={(e) => updateField(fieldMap.name!, e.target.value)}
              rightIcon={
                <DownArrowIcon
                  className='size-5 shrink-0 cursor-pointer rounded transition-transform duration-200 hover:bg-gray-100'
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownDefaultOpen(true);
                    setIsDirectInputMode(false);
                    setIsNameDropdownVisible(true);
                  }}
                />
              }
              onClear={() => updateField(fieldMap.name!, '')}
            />
          ) : (
            // Case 3: 기본 TextField
            <TextField
              placeholder='작업실 이름을 입력해주세요'
              value={String(value[fieldMap.name] || '')}
              onChange={(e) => updateField(fieldMap.name!, e.target.value)}
              onClear={() => updateField(fieldMap.name!, '')}
            />
          )}
        </>
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
