type LocationCoords = {
  lat: number;
  lng: number;
};

type GeolocationProps = {
  // 1. 위치 탐색 성공 시 호출될 콜백 함수를 받습니다.
  onLocationFound: (coords: LocationCoords) => void;
  // 2. (선택 사항) 에러 핸들링
  onError?: (error: GeolocationPositionError) => void;
};

/**
 * 브라우저 Geolocation API를 사용해 현재 위치를 탐색하는 훅
 * @param onLocationFound - 위치 탐색 성공 시 좌표를 전달받는 콜백
 * @param onError - 에러 발생 시 호출되는 콜백
 * @returns - 위치 탐색을 시작할 함수 (onClick 핸들러에 연결)
 */
export function useGeolocation({ onLocationFound, onError }: GeolocationProps) {
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newCenter = { lat: latitude, lng: longitude };

          // ⭐️ 성공 시, 부모 컴포넌트가 넘겨준 콜백 함수를 실행합니다.
          onLocationFound(newCenter);
        },
        (error) => {
          console.error('Geolocation error:', error);
          if (onError) {
            onError(error);
          } else {
            alert('위치 정보를 가져오는 데 실패했습니다.');
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    } else {
      alert('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
    }
  };

  return { getCurrentLocation };
}
