import * as React from 'react';
import type { SVGProps } from 'react';

const SvgColLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 1 8'
    {...props}
  >
    <path stroke='#D1D5DC' d='M.5 0v8' />
  </svg>
);
export default SvgColLine;
