import PageWrapper from '@/components/common/page-wrapper';

interface Props {
  onClose: () => void;
}

export default function InquiryDetail({ onClose }: Props) {
  return (
    <PageWrapper
      isMobile
      isHeader={{ title: '1:1 문의내역', onBackClick: onClose }}
      className='z-9999 fixed inset-0 bg-white'
      isModal
    >
      ds
    </PageWrapper>
  );
}
