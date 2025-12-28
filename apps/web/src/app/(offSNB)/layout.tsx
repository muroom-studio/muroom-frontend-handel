import OffSNBLayout from '@/layouts/off-SNB';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <OffSNBLayout>{children}</OffSNBLayout>;
}
