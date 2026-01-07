import { HTMLAttributes } from 'react';

import { cn } from '@muroom/lib';

import { useAuthCheck } from '@/hooks/auth/useAuthCheck';
import { LoginLink } from '@/hooks/auth/useAuthRedirect';

interface Props extends HTMLAttributes<HTMLDivElement> {
  isMobile?: boolean;
  variant?: 'outline' | 'fill' | 'comment';
  active?: boolean;
  requireAuth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function StudioBoastsButtonWrapper({
  isMobile = false,
  variant = 'fill',
  active = false,
  requireAuth = true,
  children,
  className,
  onClick,
  ...props
}: Props) {
  const { isLoggedIn } = useAuthCheck();

  const BaseButton = (
    <div
      className={cn(
        'cursor-pointer transition-all',
        !isMobile &&
          variant !== 'comment' && [
            'flex-center-col rounded-4 size-16 gap-y-1',
            'shadow-level-0 hover:shadow-level-1',
            variant === 'outline' && 'border border-gray-300 bg-white',
            variant === 'fill' && 'bg-gray-50 hover:bg-gray-100',
            variant === 'fill' && active && 'shadow-level-1 bg-gray-100',
          ],
        (isMobile || variant === 'comment') && [
          'flex items-center gap-x-1',
          'size-fit',
          'border-none bg-transparent shadow-none',
          'p-0 hover:bg-transparent',
        ],

        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );

  if (!isLoggedIn && requireAuth) {
    return <LoginLink>{BaseButton}</LoginLink>;
  }

  return BaseButton;
}
