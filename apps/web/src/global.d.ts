// .css 파일을 모듈로 선언합니다.
declare module '*.css';

export class Map {
  constructor(mapDiv: string | HTMLElement, mapOptions?: any);
  setCenter(latlng: LatLng): void;
  setZoom(zoom: number): void;
  fitBounds(bounds: LatLngBounds, margin?: number[]): void;
  getCenter(): LatLng;
  getZoom(): number;
}

export class LatLng {
  constructor(lat: number, lng: number);
  lat(): number;
  lng(): number;
}

export class Marker {
  constructor(options?: any);
  setMap(map: Map | null): void;
  getTitle(): string;
  getPosition(): LatLng;
}

export class InfoWindow {
  constructor(options?: any);
  open(map: Map, anchor?: Map | Marker | LatLng): void;
  close(): void;
  setContent(content: string | HTMLElement): void;
}

export class Point {
  constructor(x: number, y: number);
}

export class Size {
  constructor(width: number, height: number);
}

export const Event: any;
export const LatLngBounds: any;
