import * as React from 'react';
import type { SVGProps } from 'react';

const SvgVisitList = (props: SVGProps<SVGSVGElement>) => (
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
      d='M20 2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-5.213a1 1 0 0 0-.866.5l-1.053 1.823a1 1 0 0 1-1.731 0L10.083 20.5a1 1 0 0 0-.865-.5H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm-9.733 6.588a.5.5 0 0 0-.5.5v3.47a.5.5 0 0 0 .5.5h3.47a.5.5 0 0 0 .5-.5v-3.47a.5.5 0 0 0-.5-.5z'
    />
  </svg>
);
export default SvgVisitList;
