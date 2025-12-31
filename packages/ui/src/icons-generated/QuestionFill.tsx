import * as React from 'react';
import type { SVGProps } from 'react';

const SvgQuestionFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 44 44'
    {...props}
  >
    <path fill='currentColor' d='M19.707 28.875h4.583v4.583h-4.583z' />
    <path
      fill='#fff'
      fillRule='evenodd'
      d='M22.001 14.667c-2.19 0-3.666 1.99-3.666 3.666h-3.667c0-3.303 2.743-7.333 7.333-7.333 4.576 0 7.334 3.927 7.334 7.333 0 2.893-2.032 4.36-3.29 5.268l-.212.154c-1.384 1.012-1.998 1.587-1.998 2.828h-3.667c0-3.23 2.129-4.785 3.496-5.784l.006-.003c1.525-1.117 1.998-1.54 1.998-2.463 0-1.741-1.46-3.666-3.667-3.666'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgQuestionFill;
