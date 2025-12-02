import * as React from 'react';
import type { SVGProps } from 'react';

const SvgDoubleRightArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <mask
      id='double-right-arrow_svg__a'
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits='userSpaceOnUse'
      style={{
        maskType: 'alpha',
      }}
    >
      <path fill='currentColor' d='M0 0h24v24H0z' />
    </mask>
    <g mask='url(#double-right-arrow_svg__a)'>
      <path
        fill='#364153'
        d='M9.575 12 5 16.6 6.4 18l6-6-6-6L5 7.4zm6.6 0L11.6 16.6 13 18l6-6-6-6-1.4 1.4z'
      />
    </g>
  </svg>
);
export default SvgDoubleRightArrow;
