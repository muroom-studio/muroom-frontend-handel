<<<<<<< HEAD
import { cn } from '@muroom/lib';

import CommonStudioCard from '@/components/common/studio-card';
import { MapState } from '@/hooks/nuqs/home/useMapState';
import { Studio } from '@/types/studio';
=======
import CommonStudioCard from '@/components/common/studio-card';
import { MapState } from '@/hooks/nuqs/home/useMapState';

import { Studio } from '@/types/studio';
import { cn } from '@muroom/lib';
>>>>>>> upstream/main

interface Props {
  studios: Studio[];
  mapValue: MapState;
  setMapValue: (newState: MapState | ((prev: MapState) => MapState)) => void;
  className?: string;
}
export default function ListView({
  studios,
  mapValue,
  setMapValue,
  className,
}: Props) {
  return (
    <div className={cn('flex flex-col', className)}>
      {studios.map((studio) => (
        <CommonStudioCard
          key={studio.id}
          data={studio}
          currentStudioId={mapValue.studioId || ''}
          setMapValue={setMapValue}
        />
      ))}
    </div>
  );
}
