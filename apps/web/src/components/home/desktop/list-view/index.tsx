import { DUMMY_STUDIO } from '@/app/types/studio';

import CommonStudioCard from '@/components/common/studio-card';

export default function ListView() {
  const DUMMY_DATA = DUMMY_STUDIO;

  return (
    <div className='flex flex-col'>
      {DUMMY_DATA.map((data) => (
        <CommonStudioCard key={data.id} data={data} />
      ))}
    </div>
  );
}
