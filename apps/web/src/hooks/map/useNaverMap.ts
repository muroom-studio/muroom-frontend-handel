import { useEffect, useState, useRef } from 'react';

type Props = {
  mapRef: React.RefObject<HTMLDivElement | null>;
  center: { lat: number; lng: number };
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  onCenterChange: (coords: { lat: number; lng: number }) => void;
  minZoom?: number;
  maxZoom?: number;
};

export function useNaverMap({
  mapRef,
  center,
  zoom,
  setZoom,
  onCenterChange,
  minZoom,
  maxZoom,
}: Props) {
  const [mapInstance, setMapInstance] = useState<naver.maps.Map | null>(null);

  const isInitializedRef = useRef(false);
  const isMapMovingRef = useRef(false);

  useEffect(() => {
    if (!mapRef.current || isInitializedRef.current) return;

    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(center.lat, center.lng),
      zoom: zoom,
      minZoom: minZoom,
      maxZoom: maxZoom,
    });

    setMapInstance(map);
    isInitializedRef.current = true;

    return () => {
      map.destroy();
      isInitializedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef]);

  useEffect(() => {
    if (!mapInstance) return;

    const currentCenter = mapInstance.getCenter() as naver.maps.LatLng;
    const newCenter = new naver.maps.LatLng(center.lat, center.lng);

    const dist =
      Math.abs(currentCenter.lat() - newCenter.lat()) +
      Math.abs(currentCenter.lng() - newCenter.lng());

    if (dist > 0.0001) {
      isMapMovingRef.current = true;
      mapInstance.panTo(newCenter, { duration: 300 });
    }
  }, [mapInstance, center.lat, center.lng]);

  useEffect(() => {
    if (!mapInstance) return;

    if (mapInstance.getZoom() !== zoom) {
      isMapMovingRef.current = true;
      mapInstance.setZoom(zoom, true);
    }
  }, [mapInstance, zoom]);

  useEffect(() => {
    if (!mapInstance) return;

    const listener = naver.maps.Event.addListener(mapInstance, 'idle', () => {
      const newCenter = mapInstance.getCenter() as naver.maps.LatLng;
      const newZoom = mapInstance.getZoom();

      onCenterChange({ lat: newCenter.lat(), lng: newCenter.lng() });

      if (newZoom !== zoom) {
        setZoom(newZoom);
      }

      isMapMovingRef.current = false;
    });

    return () => {
      naver.maps.Event.removeListener(listener);
    };
  }, [mapInstance, onCenterChange, setZoom, zoom]);

  return {
    mapInstance,
  };
}
