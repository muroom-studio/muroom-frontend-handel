'use client';

import MypageCsInquiryNewPage from '@/components/mypage/cs/inquiry/new';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

export default function Page() {
  const { isMobile } = useResponsiveLayout();

  return <MypageCsInquiryNewPage isMobile={isMobile} />;
}
