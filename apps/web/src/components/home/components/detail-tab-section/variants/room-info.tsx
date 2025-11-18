import SectionWrapper from '../components/section-wrapper';

interface Props {
  title: string;
}

export default function RoomInfoSection({ title }: Props) {
  return (
    <SectionWrapper title={title}>
      <div className='h-[400px] bg-red-300' />
    </SectionWrapper>
  );
}
