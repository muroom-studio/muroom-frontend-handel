'use client';

type Props = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  className?: string;
};

export default function ZoomControls({
  onZoomIn,
  onZoomOut,
  className,
}: Props) {
  return (
    <div className={`flex flex-col rounded-lg bg-white shadow-md ${className}`}>
      {/* 줌 인 버튼 (+) */}
      <button
        onClick={onZoomIn}
        className='flex h-9 w-9 items-center justify-center rounded-t-lg border-b border-gray-200 text-gray-700 hover:bg-gray-50'
        aria-label='지도 확대'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 4.5v15m7.5-7.5h-15'
          />
        </svg>
      </button>
      {/* 줌 아웃 버튼 (-) */}
      <button
        onClick={onZoomOut}
        className='flex h-9 w-9 items-center justify-center rounded-b-lg text-gray-700 hover:bg-gray-50'
        aria-label='지도 축소'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>
    </div>
  );
}
