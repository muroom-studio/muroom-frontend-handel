import OnSNBLayout from '@/layouts/on-SNB';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <OnSNBLayout>{children}</OnSNBLayout>;
}
