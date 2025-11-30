import * as React from 'react';
import type { SVGProps } from 'react';

const SvgHeartOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      stroke='#364153'
      strokeWidth={2}
      d='M16.5 4C19.029 4 21 5.963 21 8.5c0 1.556-.693 3.052-2.118 4.795-1.436 1.757-3.51 3.641-6.104 5.994l-.002.001-.776.707-.776-.707h-.002c-2.595-2.354-4.668-4.238-6.104-5.995C3.693 11.552 3 10.056 3 8.5 3 5.963 4.971 4 7.5 4c1.438 0 2.834.675 3.741 1.731l.759.884.759-.884C13.666 4.675 15.062 4 16.5 4Z'
    />
  </svg>
);
export default SvgHeartOutline;
