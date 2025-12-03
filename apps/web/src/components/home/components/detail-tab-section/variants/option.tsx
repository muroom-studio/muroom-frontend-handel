import Image from 'next/image';

import { StudioOptionsInfo } from '@/types/studio';

import SectionWrapper from '../components/section-wrapper';

interface Props {
  title: string;
  data: StudioOptionsInfo;
}

export default function OptionSection({ title, data }: Props) {
  console.log(data);

  return (
    <SectionWrapper title={title}>
      <>
        <p className='text-base-l-16-2 text-gray-900'>공용</p>
        <div className='grid grid-cols-4 gap-4'>
          {data.commonOptions.map((option) => (
            <OptionItem
              key={option.code}
              icon={
                <Image
                  src={option.iconImageKey}
                  alt={`${option.code} 이미지`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              }
              name={option.description}
            />
          ))}
        </div>

        <div className='h-px bg-gray-200' />

        <p className='text-base-l-16-2 text-gray-900'>개인</p>
        <div className='grid grid-cols-4 gap-4'>
          {data.individualOptions.map((option) => (
            <OptionItem
              key={option.code}
              icon={
                <Image
                  src={option.iconImageKey}
                  alt={`${option.code} 이미지`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              }
              name={option.description}
            />
          ))}
        </div>
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
