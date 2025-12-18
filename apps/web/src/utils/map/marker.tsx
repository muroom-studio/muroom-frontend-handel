import { type Root, createRoot } from 'react-dom/client';

import { CustomMarkerProps } from '@/components/common/map/ui/custom-marker';
import { MarkerSize, StudiosMapSearchItem } from '@/types/studios';

export function createMarkerWithReactRoot(
  map: naver.maps.Map,
  data: StudiosMapSearchItem,
  onMarkerClick: (id: string) => void,
  CustomMarkerComponent: React.ComponentType<CustomMarkerProps>,
  size: MarkerSize,
  isSelected: boolean,
  isMobile: boolean,
): { marker: naver.maps.Marker; root: Root } {
  const container = document.createElement('div');
  const root = createRoot(container);

  let marker: naver.maps.Marker;

  const handleHoverChange = (isHovered: boolean) => {
    if (marker) {
      const zIndex = isHovered ? 9999 : isSelected ? 100 : 10;
      marker.setZIndex(zIndex);
    }
  };

  root.render(
    <CustomMarkerComponent
      isMobile={isMobile}
      minPrice={data.minPrice}
      maxPrice={data.maxPrice}
      name={data.name}
      isAd={data.isAd}
      size={size}
      isSelected={isSelected}
      onClick={() => {
        onMarkerClick(data.id);
      }}
      onHoverChange={handleHoverChange}
    />,
  );

  // marker 인스턴스 생성 및 할당
  marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(data.latitude, data.longitude),
    map: map,
    icon: {
      content: container,
      anchor: new naver.maps.Point(0, 0),
    },
    title: data.name,
    clickable: false,
    zIndex: isSelected ? 100 : 10,
  });

  return { marker, root };
}

export function cleanupMarkers(markers: naver.maps.Marker[], roots: Root[]) {
  setTimeout(() => {
    roots.forEach((root) => root.unmount());
    markers.forEach((marker) => marker.setMap(null));
  }, 0);
}
