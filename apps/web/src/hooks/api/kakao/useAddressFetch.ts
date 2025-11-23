'use client';

import { useState, useEffect } from 'react';

interface Props {
  lat: number;
  lng: number;
}

export const useAddressFetch = ({ lat, lng }: Props) => {
  const [regionName, setRegionName] = useState<string>('');

  useEffect(() => {
    if (!lat || !lng) return;

    const fetchAddress = async () => {
      try {
        const res = await fetch(`/api/kakao/address?lat=${lat}&lng=${lng}`);

        if (!res.ok) return;

        const data = await res.json();
        setRegionName(data.regionName || '');
      } catch (error) {
        console.error(error);
      }
    };

    fetchAddress();
  }, [lat, lng]);

  return { regionName };
};
