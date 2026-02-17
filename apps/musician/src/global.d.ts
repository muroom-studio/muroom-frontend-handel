declare global {
  interface Window {
    naver: any;
  }

  namespace naver {
    namespace maps {
      class Map {
        constructor(mapDiv: string | HTMLElement, mapOptions?: any);
        setCenter(latlng: LatLng | LatLngLiteral): void;
        setZoom(zoom: number, effect?: boolean): void;
        fitBounds(
          bounds: LatLngBounds | LatLngBoundsLiteral,
          margin?: number[],
        ): void;
        getCenter(): LatLng;
        getZoom(): number;
        getBounds(): LatLngBounds;
        panTo(latlng: LatLng | LatLngLiteral, transitionOptions?: any): void; // panTo 추가
        destroy(): void; // destroy 추가
      }

      class LatLng {
        constructor(lat: number, lng: number);
        lat(): number;
        lng(): number;
      }

      interface LatLngLiteral {
        lat: number;
        lng: number;
      }

      class LatLngBounds {
        getSW(): LatLng; // SW 좌표 가져오기
        getNE(): LatLng; // NE 좌표 가져오기
      }

      interface LatLngBoundsLiteral {
        sw: LatLngLiteral;
        ne: LatLngLiteral;
      }

      class Marker {
        constructor(options?: any);
        setMap(map: Map | null): void;
        setPosition(latlng: LatLng | LatLngLiteral): void; // 위치 업데이트용
        setZIndex(zIndex: number): void; // 마커 겹침 제어용
        setOptions(options: any): void;
        getTitle(): string;
        setTitle(title: string): void;
        getPosition(): LatLng;
      }

      class InfoWindow {
        constructor(options?: any);
        open(map: Map, anchor?: Map | Marker | LatLng): void;
        close(): void;
        setContent(content: string | HTMLElement): void;
      }

      class Point {
        constructor(x: number, y: number);
      }
      class Size {
        constructor(width: number, height: number);
      }

      const Event: {
        addListener(
          target: any,
          eventName: string,
          handler: (e: any) => void,
        ): any;
        removeListener(listener: any): void;
      };
    }
  }
}

export {};
