'use client';

import { useEffect, useState } from 'react';

import { TargetPlace } from '@/components/home/components/detail-tab-section/variants/near-facility';

export interface PlaceData {
  id: string;
  name: string;
  distance: number;
  lat: number;
  lng: number;
}

interface Props {
  lat: number;
  lng: number;
  category: TargetPlace;
}

export const useNearbyFetch = ({ lat, lng, category }: Props) => {
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!lat || !lng) return;

    const fetchPlaces = async () => {
      setIsLoading(true);

      try {
        let queryParams = '';

        switch (category) {
          case '편의점':
            queryParams = 'category=CS2';
            break;
          case '카페':
            queryParams = 'category=CE7';
            break;
          case '식당':
            queryParams = 'category=FD6';
            break;
          case '빨래방':
            queryParams = 'keyword=빨래방';
            break;
          default:
            setIsLoading(false);
            return;
        }

        const res = await fetch(
          `/api/kakao/place?lat=${lat}&lng=${lng}&${queryParams}`,
        );

        if (!res.ok) {
          setIsLoading(false);
          return;
        }

        const data = await res.json();

        const loadedPlaces = (data.documents || [])
          .slice(0, 3)
          .map((item: any) => ({
            id: item.id,
            name: item.place_name,
            distance: Number(item.distance),
            lat: Number(item.y),
            lng: Number(item.x),
          }));

        setPlaces(loadedPlaces);
      } catch (error) {
        console.error('Failed to fetch nearby places:', error);
        setPlaces([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, [lat, lng, category]);

  return { places, isLoading };
};
