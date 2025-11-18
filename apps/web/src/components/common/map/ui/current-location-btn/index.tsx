'use client';

type Props = {
  onClick: () => void;
  className?: string;
};

export default function CurrentLocationBtn({ onClick, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 ${className} `} // 2. 전달받은 className을 병합
      aria-label='현재 위치로 이동'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='h-5 w-5 text-gray-700'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 20.25c5.182 0 9.375-4.193 9.375-9.375s-4.193-9.375-9.375-9.375-9.375 4.193-9.375 9.375 4.193 9.375 9.375 9.375Z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M19.5 12h.008m-15.016 0h.008m7.492 7.492v.008m0-15.016v.008'
        />
      </svg>
    </button>
  );
}
