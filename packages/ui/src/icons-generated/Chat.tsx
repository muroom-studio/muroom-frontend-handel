import * as React from 'react';
import type { SVGProps } from 'react';
const SvgChat = (props: SVGProps<SVGSVGElement>) => (
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
      d='M12.765 21.584A.5.5 0 0 1 12 21.16v-4.222a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 1-.5-.5v-12.5a.5.5 0 0 1 .5-.5h17a.5.5 0 0 1 .5.5V16.16a.5.5 0 0 1-.235.424z'
    />
  </svg>
);
export default SvgChat;
