interface Props {
  children: React.ReactNode;
}

export default function MobileBaseLayout({ children }: Props) {
  return (
    <>
      모바일레이아웃
      {children}
    </>
  );
}
