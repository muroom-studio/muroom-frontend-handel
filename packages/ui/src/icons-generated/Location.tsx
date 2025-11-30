import * as React from 'react';
import type { SVGProps } from 'react';

const SvgLocation = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    className='location_svg__w-5 location_svg__h-5'
    viewBox='0 0 20 20'
    width='1em'
    height='1em'
    {...props}
  >
    <mask
      id='location_svg__a'
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
    <g mask='url(#location_svg__a)'>
      <path
        fill='currentColor'
        d='M9.999 10q.687 0 1.177-.49t.49-1.177-.49-1.177a1.6 1.6 0 0 0-1.177-.49q-.688 0-1.177.49t-.49 1.177.49 1.177q.489.49 1.177.49m0 8.333q-3.355-2.854-5.01-5.302Q3.331 10.583 3.331 8.5q0-3.125 2.01-4.98Q7.352 1.668 10 1.668q2.646 0 4.656 1.854t2.01 4.979q0 2.084-1.656 4.531-1.656 2.448-5.01 5.302'
      />
    </g>
  </svg>
);
export default SvgLocation;
