import SectionWrapper from '../components/section-wrapper';

interface Props {
  title: string;
}

export default function OptionSection({ title }: Props) {
  return (
    <SectionWrapper title={title}>
      <div className='h-[400px] bg-green-300' />
    </SectionWrapper>
  );
}
