import React from 'react';

interface ToggleSliderProps {
  flag: boolean;
  setter: (newFlag: boolean) => void;
  label: string;
  className?: string;
  disabled?: boolean;
}

const ToggleSlider = ({
  flag,
  setter,
  label,
  className,
  disabled = false,
}: ToggleSliderProps) => {
  const id = React.useId();

  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-x-2 ${className} ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
    >
      <div className='relative'>
        <input
          id={id}
          type='checkbox'
          className='peer sr-only'
          checked={flag}
          disabled={disabled}
          onChange={(e) => setter(e.target.checked)}
        />

        <div
          className={
            'rounded-1000 h-6 w-9 bg-gray-400 transition-colors ' +
            'peer-checked:bg-primary-400'
          }
        />

        <div
          className={
            'rounded-1000 absolute left-0.5 top-0.5 h-5 w-5 bg-white ' +
            'transition-transform peer-checked:translate-x-3'
          }
        />
      </div>

      <span
        className={`${flag ? 'text-base-l-16-2 text-primary-400' : 'text-base-l-16-1 text-gray-400'}`}
      >
        {label}
      </span>
    </label>
  );
};

export default ToggleSlider;
