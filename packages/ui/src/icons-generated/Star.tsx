import * as React from 'react';
import type { SVGProps } from 'react';

const SvgStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 16 16'
    {...props}
  >
    <path
      fill='currentColor'
      d='m3.882 14 1.083-4.683-3.633-3.15 4.8-.417 1.867-4.417L9.865 5.75l4.8.417-3.633 3.15L12.115 14 8 11.517z'
    />
  </svg>
);
export default SvgStar;
