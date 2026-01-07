'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@muroom/components';
import { cn } from '@muroom/lib';
import Image404 from '@muroom/ui/assets/404.png';
import Image500 from '@muroom/ui/assets/500.png';

import { useResponsiveLayout } from '@/hooks/common/useResponsiveLayout';
import { HttpErrorStatusCode } from '@/types/http';

import CommonImage from '../common-image';
import PageWrapper from '../page-wrapper';

interface Props {
  status: Extract<HttpErrorStatusCode, 404 | 500>;
}

export default function ErrorTemplate({ status }: Props) {
  const { isMobile: detectedIsMobile, isMounted } = useResponsiveLayout();

  const router = useRouter();

  const isMobile = isMounted ? detectedIsMobile : false;

  const getErrorContent = () => {
    if (status === 404) {
      return {
        title: isMobile
          ? `죄송합니다. 현재 찾을 수 없는 페이지를 \n요청하셨습니다.`
          : '죄송합니다. 현재 찾을 수 없는 페이지를 요청하셨습니다.',
        description:
          '주소를 입력하셨거나, 요청하신 페이지의 주소가 변경, 삭제 되어 찾을 수 없습니다.',
      };
    }

    return {
      title: isMobile
        ? `죄송합니다. \n현재 서버에 예기치 않은 오류가 발생해 \n요청하신 페이지를 표시할 수 없습니다.`
        : `죄송합니다. 현재 서버에 예기치 않은 오류가 발생해 \n요청하신 페이지를 표시할 수 없습니다.`,
      description:
        '이 오류는 서버 문제이며, 저희가 신속하게 확인하고 해결하고 있습니다.',
    };
  };

  const { title, description } = getErrorContent();

  const content = (
    <div
      className={cn('flex-center-col h-screen gap-y-8', {
        '!justify-start': isMobile,
      })}
    >
      {status === 404 ? (
        <CommonImage
          src={Image404}
          alt='404-image'
          className={cn('size-90 relative object-cover', {
            'size-45': isMobile,
          })}
          sizes={isMobile ? '180px' : '360px'}
        />
      ) : (
        <CommonImage
          src={Image500}
          alt='500-image'
          className={cn('size-90 relative object-cover', {
            'size-45': isMobile,
          })}
          sizes={isMobile ? '180px' : '360px'}
        />
      )}

      <div
        aria-label='error-description'
        className='flex-center-col gap-y-5 text-center'
      >
        <p
          className={cn('text-special-m-40 whitespace-pre-wrap', {
            'text-title-s-22-2': isMobile,
          })}
        >
          {title}
        </p>
        <span
          className={cn('text-base-exl-18-1', { 'text-base-l-16-1': isMobile })}
        >
          {description}
        </span>
      </div>

      <div className='flex-center gap-x-3'>
        {!isMobile && (
          <Button variant='outline' size='xl' onClick={() => router.back()}>
            이전으로
          </Button>
        )}
        <Button
          variant='primary'
          size='xl'
          onClick={() => (window.location.href = '/home')}
        >
          메인으로 돌아가기
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <PageWrapper
        isMobile
        isHeader={{ onBackClick: () => router.back() }}
        contentClassName='pt-21 px-5'
      >
        {content}
      </PageWrapper>
    );
  }
  return content;
}
