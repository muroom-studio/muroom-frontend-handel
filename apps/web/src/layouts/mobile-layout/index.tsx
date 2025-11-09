interface Props {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: Props) {
  return (
    <>
      모바일레이아웃
      {children}
    </>
  );
}
