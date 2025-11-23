import * as React from 'react';
import type { SVGProps } from 'react';
const SvgFilter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 20 20'
    {...props}
  >
    <path
      fill='currentColor'
      d='M8 3a3 3 0 0 0-2.83 2H2v2h3.17a3.001 3.001 0 0 0 5.66 0H18V5h-7.17A3 3 0 0 0 8 3m4 8a3 3 0 0 0-2.83 2H2v2h7.17a3 3 0 0 0 5.66 0H18v-2h-3.17A3 3 0 0 0 12 11'
    />
  </svg>
);
export default SvgFilter;
