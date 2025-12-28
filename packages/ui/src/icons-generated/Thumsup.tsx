import * as React from 'react';
import type { SVGProps } from 'react';

const SvgThumsup = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 20 20'
    {...props}
  >
    <mask
      id='thumsup_svg__a'
      width={20}
      height={20}
      x={0}
      y={0}
      maskUnits='userSpaceOnUse'
      style={{
        maskType: 'alpha',
      }}
    >
      <path fill='#D9D9D9' d='M0 0h20v20H0z' />
    </mask>
    <g mask='url(#thumsup_svg__a)'>
      <path
        fill='currentColor'
        d='M15.001 17.5H5.835V6.668L11.668.834l1.042 1.042q.145.146.24.395.093.25.093.48v.291l-.917 3.625h5.375q.667 0 1.167.5.5.501.5 1.167v1.667q0 .146-.042.312-.04.166-.083.313l-2.5 5.875a1.7 1.7 0 0 1-.625.708 1.63 1.63 0 0 1-.917.292m-7.5-1.666h7.5l2.5-5.833V8.334h-7.5l1.125-4.583-3.625 3.625zM5.835 6.667v1.667h-2.5v7.5h2.5v1.667H1.668V6.667z'
      />
    </g>
  </svg>
);
export default SvgThumsup;
