import { cn } from '@muroom/lib';

interface Props {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

const SectionWrapper = ({ className, title, description, children }: Props) => {
  return (
    <section
      className={cn(
        'flex w-full flex-col gap-y-6 bg-white px-5 py-10',
        className,
      )}
    >
      <div
        aria-label={`${description ? '제목, 설명' : '제목'}`}
        className={`${description ? 'flex items-center gap-x-2' : ''}`}
      >
        <h2 className='text-base-exl-18-2 text-black'>{title}</h2>
        <h3 className='text-base-m-14-1 text-gray-600'>{description}</h3>
      </div>
      {children}
    </section>
  );
};

export default SectionWrapper;
