import * as React from 'react';
import type { SVGProps } from 'react';
const SvgDownArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <mask
      id='down-arrow_svg__a'
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits='userSpaceOnUse'
      style={{
        maskType: 'alpha',
      }}
    >
      <path fill='#D9D9D9' d='M24 0v24H0V0z' />
    </mask>
    <g mask='url(#down-arrow_svg__a)'>
      <path fill='#364153' d='M12 12.6 16.6 8 18 9.4l-6 6-6-6L7.4 8z' />
    </g>
  </svg>
);
export default SvgDownArrow;
