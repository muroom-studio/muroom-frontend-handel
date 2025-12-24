import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 날짜와 포맷 형식을 받아 포맷팅된 문자열을 반환하는 함수
 * @param date - 날짜 문자열 (예: '2025-12-10') 또는 Date 객체
 * @param formatStr - 원하는 포맷 형식 (예: 'yy.MM.dd(E)')
 * @returns 포맷팅된 날짜 문자열 (유효하지 않은 날짜면 빈 문자열 반환)
 */
export const getFormattedDate = (
  date: string | Date | null | undefined,
  formatStr: string,
): string => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // 유효하지 않은 날짜(Invalid Date)인 경우 빈 문자열 반환
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  return format(dateObj, formatStr, { locale: ko });
};

export const formatPhoneNumber = (value: string | undefined | null) => {
  if (!value) return '';

  const cleanInput = value.replace(/[^0-9]/g, '');

  if (cleanInput.length === 11) {
    return cleanInput.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }

  if (cleanInput.length === 10) {
    if (cleanInput.startsWith('02')) {
      return cleanInput.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    return cleanInput.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  if (cleanInput.length === 9) {
    return cleanInput.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  if (cleanInput.length === 8) {
    return cleanInput.replace(/(\d{4})(\d{4})/, '$1-$2');
  }

  return cleanInput;
};

export const maskPhoneNumberAll = (phone: string): string => {
  if (!phone) return '';

  return phone.replace(/^(\d{2,3})-\d{3,4}-\d{4}$/, '$1-****-****');
};
