'use client';

import { SyncLoader } from 'react-spinners';

export interface Props {
  size?: number;
}

export default function ComponentSpinner({ size = 8 }: Props) {
  return (
    <SyncLoader size={size} margin={3} color='#a684ff' speedMultiplier={0.7} />
  );
}
