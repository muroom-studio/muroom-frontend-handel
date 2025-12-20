interface Props {
  description: string;
  children: React.ReactNode;
}

export default function ContentWrapper({ description, children }: Props) {
  return (
    <div className='flex flex-col gap-y-6'>
      <p>{description}</p>
      {children}
    </div>
  );
}
