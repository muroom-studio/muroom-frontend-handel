import * as React from 'react';
import type { SVGProps } from 'react';

const SvgLockOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <mask
      id='lock-on_svg__a'
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
    <g mask='url(#lock-on_svg__a)'>
      <path
        fill='currentColor'
        d='M6.008 21.987q-.825 0-1.413-.587a1.93 1.93 0 0 1-.587-1.413v-10q0-.825.587-1.412a1.93 1.93 0 0 1 1.413-.588h1v-2q0-2.074 1.462-3.537T12.008.987q2.074 0 3.537 1.463 1.463 1.462 1.463 3.537v2h1q.825 0 1.412.588.588.587.588 1.412v10q0 .825-.588 1.413a1.93 1.93 0 0 1-1.412.587zm6-5q.825 0 1.412-.587.588-.588.588-1.413t-.588-1.412a1.93 1.93 0 0 0-1.412-.588q-.825 0-1.413.588a1.93 1.93 0 0 0-.587 1.412q0 .825.587 1.413.588.587 1.413.587m-3-9h6v-2q0-1.25-.875-2.125a2.9 2.9 0 0 0-2.125-.875q-1.25 0-2.125.875a2.9 2.9 0 0 0-.875 2.125z'
      />
    </g>
  </svg>
);
export default SvgLockOn;
