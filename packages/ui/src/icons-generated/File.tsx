import * as React from 'react';
import type { SVGProps } from 'react';
const SvgFile = (props: SVGProps<SVGSVGElement>) => (
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
      d='M8.465 2a1 1 0 0 1 .832.445l1.406 2.11a1 1 0 0 0 .832.445H21a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm2.695 10.84L9.62 11.3l-.92.92 2 2 .46.46.46-.46 3.5-3.5-.92-.92z'
    />
  </svg>
);
export default SvgFile;
