import { cn } from '@muroom/lib';

interface Props {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const SectionWrapper = ({ className, title, children }: Props) => {
  return (
    <section
      className={cn(
        'flex w-full flex-col gap-y-6 bg-white px-5 py-10',
        className,
      )}
    >
      <h2 className='text-base-exl-18-2 text-black'>{title}</h2>
      {children}
    </section>
  );
};

export default SectionWrapper;
