import * as React from 'react';
import type { SVGProps } from 'react';

const SvgShare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <mask
      id='share_svg__a'
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
    <g mask='url(#share_svg__a)'>
      <path
        fill='#1E2939'
        d='M6 23q-.824 0-1.412-.587A1.93 1.93 0 0 1 4 21V10q0-.825.588-1.412A1.93 1.93 0 0 1 6 8h3v2H6v11h12V10h-3V8h3q.824 0 1.413.588Q20 9.175 20 10v11q0 .824-.587 1.413A1.93 1.93 0 0 1 18 23zm5-7V4.825l-1.6 1.6L8 5l4-4 4 4-1.4 1.425-1.6-1.6V16z'
      />
    </g>
  </svg>
);
export default SvgShare;
