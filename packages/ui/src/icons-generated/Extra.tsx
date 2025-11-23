import * as React from 'react';
import type { SVGProps } from 'react';
const SvgExtra = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <rect
      width={9}
      height={9}
      x={2.5}
      y={2.588}
      fill='currentColor'
      rx={1.25}
    />
    <rect
      width={9}
      height={9}
      x={2.5}
      y={12.588}
      fill='currentColor'
      rx={1.25}
    />
    <rect
      width={9}
      height={9}
      x={12.5}
      y={2.588}
      fill='currentColor'
      rx={1.25}
    />
    <rect
      width={9}
      height={9}
      x={12.5}
      y={12.588}
      fill='currentColor'
      rx={1.25}
    />
  </svg>
);
export default SvgExtra;
