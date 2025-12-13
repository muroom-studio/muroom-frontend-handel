import Image from 'next/image';

import { S3_BUCKET_URL } from '@/config/constants';
import { StudioOptionItem, StudioOptionsInfo } from '@/types/studio';

import SectionWrapper from '../components/section-wrapper';

interface Props {
  title: string;
  data: StudioOptionsInfo;
}

const NONE_IMAGE_URL =
  'https://muroom-storage.s3.ap-northeast-2.amazonaws.com/systems/icons/NONE.svg';

const RenderOptionList = ({ options }: { options: StudioOptionItem[] }) => {
  const optionList = options || [];

  return (
    <div className='grid grid-cols-4 gap-4'>
      {optionList.length > 0 ? (
        optionList.map((option) => (
          <OptionItem
            key={option.code}
            icon={
              <Image
                src={`${S3_BUCKET_URL}${option.iconImageKey}`}
                alt={`${option.code} 이미지`}
                width={0}
                height={0}
                sizes='100vw'
                style={{ width: '100%', height: 'auto' }}
              />
            }
            name={option.description}
          />
        ))
      ) : (
        <OptionItem
          key={'none'}
          icon={
            <Image
              src={NONE_IMAGE_URL}
              alt={'옵션 없음'}
              width={0}
              height={0}
              sizes='100vw'
              style={{ width: '100%', height: 'auto' }}
            />
          }
          name={'없음'}
        />
      )}
    </div>
  );
};

export default function OptionSection({ title, data }: Props) {
  return (
    <SectionWrapper title={title}>
      <>
        {/* 공용 옵션 */}
        <p className='text-base-l-16-2 text-gray-900'>공용</p>
        <RenderOptionList options={data.commonOptions} />

        <div className='h-px bg-gray-200' />

        {/* 개인 옵션 */}
        <p className='text-base-l-16-2 text-gray-900'>개인</p>
        <RenderOptionList options={data.individualOptions} />
      </>
    </SectionWrapper>
  );
}

const OptionItem = ({
  icon,
  name,
}: {
  icon: React.ReactNode;
  name: string;
}) => {
  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex-center size-18 rounded-4 bg-gray-50'>{icon}</div>
      <p className='text-base-m-14-1 text-center'>{name}</p>
    </div>
  );
};
