import { createRoot, type Root } from 'react-dom/client';

import { CustomMarkerProps } from '@/components/common/map/ui/custom-marker';

import { MarkerData, MarkerSize } from '@/types/map/markers';

export function createMarkerWithReactRoot(
  map: naver.maps.Map,
  data: MarkerData,
  onMarkerClick: (id: string) => void,
  CustomMarkerComponent: React.ComponentType<CustomMarkerProps>,
  size: MarkerSize,
  isSelected: boolean,
  isMobile: boolean,
): { marker: naver.maps.Marker; root: Root } {
  const container = document.createElement('div');

  const root = createRoot(container);

  root.render(
    <CustomMarkerComponent
      isMobile={isMobile}
      priceMin={data.priceMin}
      priceMax={data.priceMax}
      name={data.name}
      isAd={data.isAd}
      size={size}
      isSelected={isSelected}
      onClick={() => {
        onMarkerClick(data.id);
      }}
    />,
  );

  const marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(data.lat, data.lng),
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
