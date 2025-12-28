import * as React from 'react';
import type { SVGProps } from 'react';

const SvgMoreDot = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <mask
      id='more-dot_svg__a'
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits='userSpaceOnUse'
      style={{
        maskType: 'alpha',
      }}
    >
      <path fill='#D9D9D9' d='M0 0h24v24H0z' />
    </mask>
    <g mask='url(#more-dot_svg__a)'>
      <path
        fill='currentColor'
        d='M20 12q0 .825-.587 1.412A1.93 1.93 0 0 1 18 14q-.824 0-1.413-.588A1.93 1.93 0 0 1 16 12q0-.825.587-1.412A1.93 1.93 0 0 1 18 10q.824 0 1.413.588Q20 11.175 20 12m-6 0q0 .825-.588 1.412A1.93 1.93 0 0 1 12 14q-.825 0-1.412-.588A1.93 1.93 0 0 1 10 12q0-.825.588-1.412A1.93 1.93 0 0 1 12 10q.825 0 1.412.588Q14 11.175 14 12m-6 0q0 .825-.588 1.412A1.93 1.93 0 0 1 6 14q-.824 0-1.412-.588A1.93 1.93 0 0 1 4 12q0-.825.588-1.412A1.93 1.93 0 0 1 6 10q.824 0 1.412.588Q8 11.175 8 12'
      />
    </g>
  </svg>
);
export default SvgMoreDot;
