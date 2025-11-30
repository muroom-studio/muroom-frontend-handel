import * as React from 'react';
import type { SVGProps } from 'react';

const SvgBottomDot = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 20 20'
    {...props}
  >
    <mask
      id='bottom-dot_svg__a'
      width={20}
      height={20}
      x={0}
      y={0}
      maskUnits='userSpaceOnUse'
      style={{
        maskType: 'alpha',
      }}
    >
      <path fill='#D9D9D9' d='M0 0h20v20H0z' />
    </mask>
    <g mask='url(#bottom-dot_svg__a)'>
      <path fill='#364153' d='M9.999 12.5 5.832 8.333h8.333z' />
    </g>
  </svg>
);
export default SvgBottomDot;
