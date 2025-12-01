'use client';

import Lottie from 'lottie-react';

import spinnerAnimation from '../../../assets/spinner.json';

export interface Props {
  size?: number;
}

export default function PageSpinner({ size = 150 }: Props) {
  return (
    <Lottie
      animationData={spinnerAnimation}
      loop={true}
      style={{ width: size, height: size }}
    />
  );
}
