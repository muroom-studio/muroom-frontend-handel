import CommonStudioCard from '@/components/common/studio-card';

import { Studio } from '@/types/studio';

interface Props {
  studios: Studio[];
  studioId: string;
  setStudioId: (id: string) => void;
}
export default function ListView({ studios, studioId, setStudioId }: Props) {
  return (
    <div className='flex flex-col'>
      {studios.map((studio) => (
        <CommonStudioCard
          key={studio.id}
          data={studio}
          studioId={studioId}
          setStudioId={setStudioId}
        />
      ))}
    </div>
  );
}
