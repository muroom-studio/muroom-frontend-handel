import { useState } from 'react';

export type RangeState = {
  minValue: number;
  maxValue: number;
};

type UseRangeInputProps = {
  initialMin: number;
  initialMax: number;
  minBoundary: number;
  maxBoundary: number;
};

export const useRangeInput = ({
  initialMin,
  initialMax,
  minBoundary,
  maxBoundary,
}: UseRangeInputProps) => {
  const [rangeValue, setRangeValue] = useState<RangeState>({
    minValue: initialMin,
    maxValue: initialMax,
  });

  const handleSliderChange = (newValue: number[]) => {
    setRangeValue({
      minValue: newValue[0] as number,
      maxValue: newValue[1] as number,
    });
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const stateKey = name as keyof RangeState;

    const sanitizedValue = value.replace(/[^0-9]/g, '');

    let newNumericValue: number;

    if (sanitizedValue === '') {
      newNumericValue = 0;
    } else {
      newNumericValue = parseInt(sanitizedValue, 10);
    }

    if (isNaN(newNumericValue)) {
      newNumericValue = 0;
    }

    if (newNumericValue > maxBoundary) {
      newNumericValue = maxBoundary;
    }
    if (newNumericValue < minBoundary) {
      newNumericValue = minBoundary;
    }

    setRangeValue((prev) => {
      const currentMin = prev.minValue;
      const currentMax = prev.maxValue;

      const newValue = newNumericValue;

      if (stateKey === 'minValue') {
        if (newValue > currentMax) {
          return { minValue: newValue, maxValue: newValue };
        }
        return { ...prev, minValue: newValue };
      }

      if (stateKey === 'maxValue') {
        if (newValue < currentMin) {
          return { minValue: newValue, maxValue: newValue };
        }
        return { ...prev, maxValue: newValue };
      }
      return prev;
    });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (Number(e.target.value) === 0) {
      e.target.select();
    }
  };

  return {
    rangeValue,
    setRangeValue,
    handleSliderChange,
    handleRangeChange,
    handleFocus,
  };
};
