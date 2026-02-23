'use client';

import { useCallback } from 'react';

import Link, { LinkProps } from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { useAuthRedirectStore } from '@/store/useAuthRedirectStore';

export function useSaveRedirectUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setRedirectUrl } = useAuthRedirectStore();

  const saveCurrentUrl = useCallback(() => {
    const queryString = searchParams.toString();
    const currentUrl = queryString ? `${pathname}?${queryString}` : pathname;
    setRedirectUrl(currentUrl);
  }, [pathname, searchParams, setRedirectUrl]);

  return { saveCurrentUrl };
}

interface LoginLinkProps extends Omit<LinkProps, 'href'> {
  children: React.ReactNode;
  className?: string;
}

export function LoginLink({ children, onClick, ...props }: LoginLinkProps) {
  const searchParams = useSearchParams();
  const { saveCurrentUrl } = useSaveRedirectUrl();

  const queryString = searchParams.toString();
  const href = queryString ? `/welcome?${queryString}` : '/welcome';

  return (
    <Link
      href={href}
      scroll={false}
      {...props}
      onClick={(e) => {
        saveCurrentUrl();
        if (onClick) onClick(e);
      }}
    >
      <div className='pointer-events-none contents'>{children}</div>
    </Link>
  );
}
