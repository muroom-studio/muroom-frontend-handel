interface Props {
  children: React.ReactNode;
}

export default function DesktopWelcomeLayout({ children }: Props) {
  return (
    <div className='shadow-level-1 rounded-4 w-[420px] overflow-hidden bg-white'>
      {children}
    </div>
  );
}
