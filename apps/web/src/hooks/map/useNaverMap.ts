import { useRef, useEffect } from 'react';

type Props = {
  mapRef: React.RefObject<HTMLDivElement | null>;
  center: { lat: number; lng: number };
  zoom: number;
};

// 1. ⭐️ 지도 생성과 업데이트 로직을 통합한 훅
export function useNaverMap({ mapRef, center, zoom }: Props) {
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);
  const infoWindowRef = useRef<naver.maps.InfoWindow | null>(null);

  // 2. [지도 초기화 훅]
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const initialCenter = new naver.maps.LatLng(center.lat, center.lng);
      const map = new naver.maps.Map(mapRef.current, {
        center: initialCenter,
        zoom: zoom,
      });
      mapInstanceRef.current = map;

      infoWindowRef.current = new naver.maps.InfoWindow({
        content: '<div style="padding:10px;"></div>',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        pixelOffset: new naver.maps.Point(0, -10),
      });
    }
  }, [mapRef, center, zoom]);

  // 3. [지도 이동 훅]
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setCenter(
      new naver.maps.LatLng(center.lat, center.lng),
    );
  }, [center]); // ⭐️ 맵 인스턴스는 의존성에서 제거 (초기화 훅이 보장)

  // 4. [지도 확대/축소 훅]
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setZoom(zoom);
  }, [zoom]); // ⭐️ 맵 인스턴스는 의존성에서 제거

  // 5. 생성된 인스턴스들을 반환
  return {
    mapInstance: mapInstanceRef.current,
    infoWindowInstance: infoWindowRef.current,
  };
}
