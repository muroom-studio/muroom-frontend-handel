import { toast } from 'sonner';

interface Props {
  message?: string;
  onSuccess?: () => void;
  text?: string; // [추가] 복사할 텍스트 지정 (없으면 URL 복사)
  showToast?: boolean; // [추가] sonner 토스트 노출 여부 (기본값 true)
}

export const handleCopyClipboard = (
  arg?: React.MouseEvent<HTMLButtonElement> | Props,
) => {
  const defaultMessage = '링크가 복사되었습니다.';
  let message = defaultMessage;
  let onSuccess: (() => void) | undefined;
  let textToCopy = typeof window !== 'undefined' ? window.location.href : '';
  let showToast = true;

  // 인자가 Props 객체인 경우
  if (arg && !('target' in arg)) {
    message = arg.message || defaultMessage;
    onSuccess = arg.onSuccess;
    if (arg.text) textToCopy = arg.text; // 특정 텍스트가 있으면 그것을 사용
    if (arg.showToast !== undefined) showToast = arg.showToast; // 토스트 여부 설정
  }

  if (typeof window !== 'undefined' && textToCopy) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      // showToast가 true일 때만 sonner 토스트 실행
      if (showToast) {
        toast.success(message);
      }
      onSuccess?.();
    });
  }
};
