import { createRoot, type Root } from 'react-dom/client';

type MarkerComponentProps = {
  label: string;
  onClick: () => void;
};

type MarkerData = {
  id: string;
  lat: number;
  lng: number;
  label: string;
};

export function createMarkerWithReactRoot(
  map: naver.maps.Map,
  data: MarkerData,
  onMarkerClick: (id: string) => void,
  CustomMarkerComponent: React.ComponentType<MarkerComponentProps>,
): { marker: naver.maps.Marker; root: Root } {
  const container = document.createElement('div');
  const root = createRoot(container);

  root.render(
    <CustomMarkerComponent
      label={data.label}
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
    title: String(data.id),
    clickable: false,
  });

  return { marker, root };
}

export function cleanupMarkers(markers: naver.maps.Marker[], roots: Root[]) {
  setTimeout(() => {
    roots.forEach((root) => root.unmount());
    markers.forEach((marker) => marker.setMap(null));
  }, 0);
}
