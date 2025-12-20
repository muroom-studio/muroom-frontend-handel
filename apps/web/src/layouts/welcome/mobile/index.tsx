interface Props {
  children: React.ReactNode;
}

export default function MobileWelcomeLayout({ children }: Props) {
  return <div className='h-full'>{children}</div>;
}
