import * as React from 'react';
import type { SVGProps } from 'react';

const SvgThumbsupOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 20 20'
    {...props}
  >
    <mask
      id='thumbsup-on_svg__a'
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
    <g mask='url(#thumbsup-on_svg__a)'>
      <path
        fill='currentColor'
        d='M15.001 17.5H6.668V6.666L12.501.833l1.042 1.042q.145.146.24.396.093.25.093.479v.291l-.916 3.625H17.5q.667 0 1.167.5.5.501.5 1.167V10a1.7 1.7 0 0 1-.125.625l-2.5 5.875a1.7 1.7 0 0 1-.625.708 1.63 1.63 0 0 1-.917.292m-10-10.834V17.5H1.668V6.666z'
      />
    </g>
  </svg>
);
export default SvgThumbsupOn;
