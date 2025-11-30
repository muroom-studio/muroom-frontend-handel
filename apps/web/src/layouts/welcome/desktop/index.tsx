interface Props {
  children: React.ReactNode;
}

export default function DesktopWelcomeLayout({ children }: Props) {
  return <div className='shadow-level-1 w-[420px] bg-white'>{children}</div>;
}
