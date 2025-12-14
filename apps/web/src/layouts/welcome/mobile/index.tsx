interface Props {
  children: React.ReactNode;
}

export default function MobileWelcomeLayout({ children }: Props) {
  return <div className='bg-red-400'>{children}</div>;
}
