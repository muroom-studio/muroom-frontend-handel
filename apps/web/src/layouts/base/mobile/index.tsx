interface Props {
  children: React.ReactNode;
}

export default function BaseMobileLayout({ children }: Props) {
  return <div className='pb-[env(safe-area-inset-bottom)]'>{children}</div>;
}
