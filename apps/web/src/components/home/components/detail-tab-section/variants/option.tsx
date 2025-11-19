import { WaterPurifyIcon } from '@muroom/icons';
import SectionWrapper from '../components/section-wrapper';

interface Props {
  title: string;
}

export default function OptionSection({ title }: Props) {
  return (
    <SectionWrapper title={title}>
      <>
        <p className='text-base-l-16-2 text-gray-900'>공용</p>
        <div className='grid grid-cols-4 gap-4'>
          {Array.from({ length: 16 }).map((_, index) => (
            <OptionItem key={index} icon={<WaterPurifyIcon />} name='정수기' />
          ))}
        </div>

        <div className='h-px bg-gray-200' />

        <p className='text-base-l-16-2 text-gray-900'>개인</p>
        <div className='grid grid-cols-4 gap-4'>
          {Array.from({ length: 8 }).map((_, index) => (
            <OptionItem key={index} icon={<WaterPurifyIcon />} name='정수기' />
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
