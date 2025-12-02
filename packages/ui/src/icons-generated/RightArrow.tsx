import * as React from 'react';
import type { SVGProps } from 'react';

const SvgRightArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      fill='currentColor'
      d='m12.9 12-4.6 4.6L9.7 18l6-6-3-3-3-3-1.4 1.4z'
    />
  </svg>
);
export default SvgRightArrow;
