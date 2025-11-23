import * as React from 'react';
import type { SVGProps } from 'react';
const SvgMail = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path fill='currentColor' d='M2 20V4h20v16zm10-7 8-5V6l-8 5-8-5v2z' />
  </svg>
);
export default SvgMail;
