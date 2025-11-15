'use client';

import Lottie from 'lottie-react';

import spinnerAnimation from '../assets/spinner.json';

interface SpinnerProps {
  size?: number;
}

const Spinner = ({ size = 150 }: SpinnerProps) => {
  return (
    <Lottie
      animationData={spinnerAnimation}
      loop={true}
      style={{ width: size, height: size }}
    />
  );
};

export default Spinner;
