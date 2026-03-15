import { AuthNavHeader } from './auth-nav-header';

export function AuthFormContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className='desktop:items-center desktop:justify-center flex flex-1 flex-col'>
      <div className='desktop:shadow-level-0 desktop:max-w-106.5 desktop:flex-none desktop:rounded-sm desktop:border-[0.5px] desktop:border-[#D1D5DC] flex w-full flex-1 flex-col'>
        <AuthNavHeader />
        {children}
      </div>
    </div>
  );
}
