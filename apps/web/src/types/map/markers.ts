export type MarkerSize = 'S' | 'M' | 'L';

export interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  priceMin: number;
  priceMax: number;
  name: string;
  isAd: boolean;
}
