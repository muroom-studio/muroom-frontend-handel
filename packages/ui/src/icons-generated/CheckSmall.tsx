import * as React from 'react';
import type { SVGProps } from 'react';

const SvgCheckSmall = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 12 10'
    {...props}
  >
    <path fill='currentColor' d='m4 9.4-4-4L1.4 4 4 6.6 10.6 0 12 1.4z' />
  </svg>
);
export default SvgCheckSmall;
