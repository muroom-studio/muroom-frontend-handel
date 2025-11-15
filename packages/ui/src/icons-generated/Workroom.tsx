import * as React from 'react';
import type { SVGProps } from 'react';
const SvgWorkroom = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 20 20'
    {...props}
  >
    <g fill='#fff' clipPath='url(#workroom_svg__a)'>
      <path d='M7.522 11.45V20a.9.9 0 0 1-.38-.067A1 1 0 0 1 7 19.866L.5 16.094a.99.99 0 0 1-.478-.67 1 1 0 0 1-.022-.2V7.559a1 1 0 0 1 .022-.2.9.9 0 0 1 .125-.322 1 1 0 0 1 .37-.36l3.988-2.206a.99.99 0 0 1 .983.01l2.013 1.167v5.79z' />
      <path d='M12.195.863A.988.988 0 0 0 11 .715l-3 1.74c-.31.18-.5.511-.5.87v15.091q0 .11.022.212v1.371A1 1 0 0 0 8 19.866l4-2.322c.31-.179.5-.51.5-.87V1.584a1 1 0 0 0-.305-.721' />
      <path d='M20 4.778V9.42c0 .36-.19.69-.5.872l-3.065 1.779a1 1 0 0 1-1.5-.831l-.143-3.72a1.01 1.01 0 0 0-.5-.831l-1.793-1.041-4.865-2.824a.97.97 0 0 1 .365-.367l4-2.322c.31-.178.69-.178 1 0l6.5 3.772c.31.181.5.513.5.872' />
    </g>
    <defs>
      <clipPath id='workroom_svg__a'>
        <path fill='currentColor' d='M0 0h20v20H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgWorkroom;
