import { useEffect } from 'react';

/**
 * 트리거가 변경될 때 스크롤을 최상단으로 이동시킵니다.
 * @param trigger 스크롤을 유발할 상태 (예: page)
 * @param containerId (선택) 스크롤이 발생하는 부모 요소의 ID. 없으면 window를 스크롤합니다.
 */
export function useScrollToTop(trigger: unknown, containerId?: string) {
  useEffect(() => {
    // 1. ID가 제공되었다면 해당 엘리먼트를 찾아서 스크롤
    if (containerId) {
      const scrollContainer = document.getElementById(containerId);
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: 0,
          behavior: 'instant' as ScrollBehavior,
        });
        return;
      }
    }

    // 2. ID가 없거나 엘리먼트를 못 찾았다면 window 스크롤 (기본 동작)
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [trigger, containerId]);
}
