import * as React from 'react';
import type { SVGProps } from 'react';

const SvgTarget = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <mask
      id='target_svg__a'
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
    <g mask='url(#target_svg__a)'>
      <path
        fill='currentColor'
        d='M11 22.95v-2q-3.124-.35-5.362-2.587T3.051 13h-2v-2h2q.35-3.124 2.587-5.362t5.363-2.588v-2h2v2q3.124.35 5.362 2.588T20.951 11h2v2h-2q-.35 3.124-2.588 5.363-2.237 2.237-5.362 2.587v2zM12 19q2.901 0 4.95-2.05T19 12q0-2.9-2.05-4.95T12 5 7.05 7.05 5 12t2.05 4.95T12 19m0-3q-1.649 0-2.824-1.175T8 12q0-1.65 1.175-2.825T12 8t2.825 1.175T16 12t-1.175 2.825T12 16'
      />
    </g>
  </svg>
);
export default SvgTarget;
