import * as React from 'react';
import type { SVGProps } from 'react';

const SvgComment = (props: SVGProps<SVGSVGElement>) => (
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
      d='M20 5h1zm-4.2 12v-1h-.82l-.16.804zm-.59 2.948.98.197zm-.88.214-.78.625zM11.8 17l.78-.625-.3-.375h-.48zM19 4v1h2a2 2 0 0 0-2-2zm1 1h-1v11h2V5zm0 11h-1v2a2 2 0 0 0 2-2zm-1 1v-1h-3.2v2H19zm-3.2 0-.98-.196-.59 2.948.98.196.98.196.59-2.948zm-.59 2.948-.98-.197a.5.5 0 0 1 .88-.214l-.78.625-.78.625c.796.995 2.39.607 2.64-.642zm-.88.214.78-.625-2.53-3.162-.78.625-.781.625 2.53 3.162zM11.8 17v-1H5v2h6.8zM5 17v-1H3a2 2 0 0 0 2 2zm-1-1h1V5H3v11zM4 5h1V3a2 2 0 0 0-2 2zm1-1v1h14V3H5z'
    />
  </svg>
);
export default SvgComment;
