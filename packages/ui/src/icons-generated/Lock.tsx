import * as React from 'react';
import type { SVGProps } from 'react';

const SvgLock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <mask
      id='lock_svg__a'
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
    <g mask='url(#lock_svg__a)'>
      <path
        fill='currentColor'
        d='M6 20h12V10H6zm6-3q.825 0 1.412-.587Q14 15.825 14 15t-.588-1.412A1.93 1.93 0 0 0 12 13q-.825 0-1.412.588A1.93 1.93 0 0 0 10 15q0 .824.588 1.413Q11.175 17 12 17m-6 5q-.824 0-1.412-.587A1.93 1.93 0 0 1 4 20V10q0-.825.588-1.412A1.93 1.93 0 0 1 6 8h7V6q0-2.075 1.463-3.537Q15.926 1 18 1q2.075 0 3.538 1.463Q23 3.925 23 6h-2q0-1.25-.875-2.125A2.9 2.9 0 0 0 18 3q-1.25 0-2.125.875A2.9 2.9 0 0 0 15 6v2h3q.824 0 1.413.588Q20 9.175 20 10v10q0 .824-.587 1.413A1.93 1.93 0 0 1 18 22z'
      />
    </g>
  </svg>
);
export default SvgLock;
