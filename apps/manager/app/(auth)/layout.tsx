import { Footer } from '@muroom/ui/components';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-1 flex-col'>
      <main className='flex flex-1 flex-col'>{children}</main>
    </div>
  );
}
