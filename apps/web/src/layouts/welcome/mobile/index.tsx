interface Props {
  children: React.ReactNode;
}

export default function MobileWelcomeLayout({ children }: Props) {
  return (
    <div className='bg-white pb-[env(safe-area-inset-bottom)]'>{children}</div>
  );
}
