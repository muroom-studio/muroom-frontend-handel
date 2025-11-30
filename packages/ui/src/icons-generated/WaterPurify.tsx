import * as React from 'react';
import type { SVGProps } from 'react';

const SvgWaterPurify = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 27 27'
    {...props}
  >
    <rect
      width={2.5}
      height={4.75}
      x={5.125}
      y={3.625}
      stroke='#1E2939'
      strokeWidth={1.25}
      rx={0.875}
    />
    <rect
      width={14.5}
      height={4.75}
      x={0.625}
      y={0.625}
      stroke='#1E2939'
      strokeWidth={1.25}
      rx={0.875}
    />
    <rect
      width={14.5}
      height={4.75}
      x={0.625}
      y={0.625}
      fill='#F3F4F6'
      stroke='#1E2939'
      strokeWidth={1.25}
      rx={0.875}
    />
    <mask id='water-purify_svg__a' fill='#fff'>
      <path d='M25.5 0A1.5 1.5 0 0 1 27 1.5v24a1.5 1.5 0 0 1-1.5 1.5h-24A1.5 1.5 0 0 1 0 25.5V24a1.5 1.5 0 0 1 1.5-1.5h11.25V0z' />
    </mask>
    <path
      fill='#F3F4F6'
      d='M25.5 0A1.5 1.5 0 0 1 27 1.5v24a1.5 1.5 0 0 1-1.5 1.5h-24A1.5 1.5 0 0 1 0 25.5V24a1.5 1.5 0 0 1 1.5-1.5h11.25V0z'
    />
    <path
      fill='#1E2939'
      d='M25.5 0v-1.25zM27 1.5h1.25zm0 24h1.25zM25.5 27v1.25zm-24 0v1.25zM0 25.5h-1.25zm1.5-3v-1.25zm11.25 0v1.25H14V22.5zm0-22.5v-1.25H11.5V0zM25.5 0v1.25a.25.25 0 0 1 .25.25h2.5a2.75 2.75 0 0 0-2.75-2.75zM27 1.5h-1.25v24h2.5v-24zm0 24h-1.25a.25.25 0 0 1-.25.25v2.5a2.75 2.75 0 0 0 2.75-2.75zM25.5 27v-1.25h-24v2.5h24zm-24 0v-1.25a.25.25 0 0 1-.25-.25h-2.5a2.75 2.75 0 0 0 2.75 2.75zM0 25.5h1.25V24h-2.5v1.5zM0 24h1.25a.25.25 0 0 1 .25-.25v-2.5A2.75 2.75 0 0 0-1.25 24zm1.5-1.5v1.25h11.25v-2.5H1.5zm11.25 0H14V0h-2.5v22.5zm0-22.5v1.25H25.5v-2.5H12.75z'
      mask='url(#water-purify_svg__a)'
    />
    <path
      stroke='#1E2939'
      strokeWidth={1.25}
      d='M3.57 13.75h5.61c.525 0 .933.46.869.981l-.92 7.5a.875.875 0 0 1-.867.769H4.488a.875.875 0 0 1-.868-.769l-.919-7.5a.876.876 0 0 1 .87-.981ZM9.75 17.125H3'
    />
  </svg>
);
export default SvgWaterPurify;
