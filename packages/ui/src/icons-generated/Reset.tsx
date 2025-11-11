import * as React from 'react';
import type { SVGProps } from 'react';
const SvgReset = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 16 16'
    width='1em'
    height='1em'
    {...props}
  >
    <mask
      id='reset_svg__a'
      width={16}
      height={16}
      x={0}
      y={0}
      maskUnits='userSpaceOnUse'
      style={{
        maskType: 'alpha',
      }}
    >
      <path fill='#D9D9D9' d='M0 0h16v16H0z' />
    </mask>
    <g mask='url(#reset_svg__a)'>
      <path
        fill='currentColor'
        d='M8.035 13.335q-2.235 0-3.8-1.55Q2.668 10.235 2.668 8v-.116L1.601 8.95l-.933-.933 2.667-2.667L6 8.018l-.933.933-1.067-1.066V8q0 1.667 1.175 2.834Q6.351 12 8.035 12q.433 0 .85-.1.416-.099.816-.3l1 1a5.5 5.5 0 0 1-1.3.55q-.667.184-1.366.184m4.633-2.684-2.667-2.666.934-.934L12 8.118v-.117q0-1.665-1.175-2.833-1.175-1.167-2.858-1.167a3.6 3.6 0 0 0-.85.1q-.417.1-.817.3l-1-1a5.5 5.5 0 0 1 1.3-.55 5.1 5.1 0 0 1 1.367-.183q2.233 0 3.8 1.55t1.567 3.783v.117L14.4 7.051l.934.934z'
      />
    </g>
  </svg>
);
export default SvgReset;
