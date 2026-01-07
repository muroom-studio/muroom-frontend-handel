import * as React from 'react';
import type { SVGProps } from 'react';

const SvgReplyArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <mask
      id='reply-arrow_svg__a'
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
    <g mask='url(#reply-arrow_svg__a)'>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth={2}
        d='M12 4v8h8'
      />
    </g>
  </svg>
);
export default SvgReplyArrow;
