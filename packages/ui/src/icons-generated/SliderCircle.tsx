import * as React from 'react';
import type { SVGProps } from 'react';

const SvgSliderCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 32 32'
    {...props}
  >
    <g filter='url(#slider-circle_svg__a)'>
      <rect width={24} height={24} x={4} y={2} fill='#fff' rx={12} />
      <rect width={23} height={23} x={4.5} y={2.5} stroke='#D1D5DC' rx={11.5} />
    </g>
    <defs>
      <filter
        id='slider-circle_svg__a'
        width={32}
        height={32}
        x={0}
        y={0}
        colorInterpolationFilters='sRGB'
        filterUnits='userSpaceOnUse'
      >
        <feFlood floodOpacity={0} result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          result='hardAlpha'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0' />
        <feBlend
          in2='BackgroundImageFix'
          result='effect1_dropShadow_40001654_71713'
        />
        <feBlend
          in='SourceGraphic'
          in2='effect1_dropShadow_40001654_71713'
          result='shape'
        />
      </filter>
    </defs>
  </svg>
);
export default SvgSliderCircle;
