interface Props {
  isMobile?: boolean;
  title?: string;
  description: string;
  children: React.ReactNode;
}

export default function ContentWrapper({
  isMobile,
  title,
  description,
  children,
}: Props) {
  if (isMobile) {
    return (
      <div className='flex flex-col gap-y-10'>
        <div className='flex flex-col gap-y-4'>
          <span className='text-title-s-22-2 text-gray-800'>{title}</span>
          <span>{description}</span>
        </div>
        {children}
      </div>
    );
  }
  return (
    <div className='flex flex-col gap-y-6'>
      <span>{description}</span>
      {children}
    </div>
  );
}
