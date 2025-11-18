import { useRef, useEffect } from 'react';

type Props = {
  mapRef: React.RefObject<HTMLDivElement | null>;
  center: { lat: number; lng: number };
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  // ⭐️ [추가] 1. onCenterChange prop 추가
  onCenterChange: (coords: { lat: number; lng: number }) => void;
};

// 1. ⭐️ 지도 생성과 업데이트 로직을 통합한 훅
export function useNaverMap({
  mapRef,
  center,
  zoom,
  setZoom,
  onCenterChange,
}: Props) {
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);
  const infoWindowRef = useRef<naver.maps.InfoWindow | null>(null);

  // 2. [지도 초기화 훅] (변경 없음)
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

      // ⭐️ [Cleanup] 컴포넌트가 Unmount될 때 지도 파괴
      return () => {
        // ⭐️ InfoWindow 닫기
        infoWindowRef.current?.close();
        // ⭐️ 지도 인스턴스 파괴 (메모리 해제)
        map.destroy();
        mapInstanceRef.current = null; // Ref 초기화
      };
    }

    // 만약 초기화 조건이 충족되지 않으면 정리할 것이 없음을 반환
    return () => {};
  }, [mapRef, center, zoom]);

  // 3. [지도 이동 훅] (변경 없음)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setCenter(
      new naver.maps.LatLng(center.lat, center.lng),
    );
  }, [center]);

  // 4. [지도 확대/축소 훅] (변경 없음)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setZoom(zoom);
  }, [zoom]);

  // 5. [줌 이벤트 훅] (변경 없음 - Map -> React Zoom 동기화)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const listener = naver.maps.Event.addListener(map, 'zoom_changed', () => {
      const newZoom = map.getZoom();
      setZoom(newZoom);
    });

    return () => {
      naver.maps.Event.removeListener(listener);
    };
  }, [mapInstanceRef.current, setZoom]);

  // 6. ⭐️ [새 훅] 중심 좌표 동기화 (Map -> React Center 동기화)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // 'idle' 이벤트는 드래그나 줌이 끝나고 지도가 멈췄을 때 호출됩니다.
    // 무한 루프를 방지하면서 중심 좌표를 동기화하는 가장 안정적인 방법입니다.
    const listener = naver.maps.Event.addListener(map, 'idle', () => {
      const newCenter = map.getCenter() as naver.maps.LatLng;
      // 2. 이제 .lat()과 .lng() 메서드를 안전하게 호출합니다.
      onCenterChange({ lat: newCenter.lat(), lng: newCenter.lng() });
    });

    // Cleanup
    return () => {
      naver.maps.Event.removeListener(listener);
    };
  }, [mapInstanceRef.current, onCenterChange]); // ⭐️ onCenterChange를 의존성에 포함

  // 7. 생성된 인스턴스들을 반환
  return {
    mapInstance: mapInstanceRef.current,
    infoWindowInstance: infoWindowRef.current,
  };
}
