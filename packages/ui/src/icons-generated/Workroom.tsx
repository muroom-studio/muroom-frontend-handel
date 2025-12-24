import * as React from 'react';
import type { SVGProps } from 'react';

const SvgWorkroom = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g fill='currentColor' clipPath='url(#workroom_svg__a)'>
      <path d='M9.522 13.45v8.549a.9.9 0 0 1-.38-.066A1 1 0 0 1 9 21.865L2.5 18.093a.99.99 0 0 1-.478-.67 1 1 0 0 1-.022-.2V9.56q0-.103.022-.2a.9.9 0 0 1 .125-.323 1 1 0 0 1 .37-.36l3.988-2.205a.99.99 0 0 1 .983.01l2.013 1.166v5.79z' />
      <path d='M14.195 2.863A.988.988 0 0 0 13 2.715l-3 1.74c-.31.18-.5.511-.5.87v15.091q0 .11.022.212v1.371a1 1 0 0 0 .478-.133l4-2.322c.31-.179.5-.51.5-.87V3.584a1 1 0 0 0-.305-.721' />
      <path d='M21.999 6.778v4.64c0 .36-.19.691-.5.872l-3.065 1.78a1 1 0 0 1-1.5-.832l-.143-3.72a1.01 1.01 0 0 0-.5-.83l-1.793-1.041-4.865-2.825a.97.97 0 0 1 .365-.367l4-2.321c.31-.179.69-.179 1 0l6.5 3.772c.31.181.5.512.5.872' />
    </g>
    <defs>
      <clipPath id='workroom_svg__a'>
        <path fill='#fff' d='M2 2h20v20H2z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgWorkroom;
