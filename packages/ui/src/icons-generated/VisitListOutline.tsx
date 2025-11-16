import * as React from 'react';
import type { SVGProps } from 'react';
const SvgVisitListOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <mask id='visit-list-outline_svg__a' fill='#fff'>
      <path d='M20 2c.552 0 1.001.448 1.001 1v16c0 .552-.449 1-1.001 1h-4.822a1 1 0 0 0-.835.45l-1.508 2.284a1 1 0 0 1-1.669.001L9.657 20.45A1 1 0 0 0 8.823 20H4.001A1 1 0 0 1 3 19V3a1 1 0 0 1 1.001-1z' />
    </mask>
    <path
      fill='#364153'
      d='M20 2V0zm1.001 1h2zm0 16h2zM20 20v2zm-5.657.45 1.67 1.1zm-1.508 2.284-1.67-1.101zm-1.669.001-1.67 1.102h.001zM9.657 20.45l1.67-1.101zM8.823 20l.001-2zM3 19H1zM3 3H1zm17-1v2A1 1 0 0 1 19 3h4c0-1.66-1.347-3-3-3zm1.001 1h-2v16h4V3zm0 16h-2c0-.555.45-1 .998-1L20 20v2c1.654 0 3.001-1.34 3.001-3zM20 20v-2h-4.822v4H20zm-4.822 0v-2a3 3 0 0 0-2.505 1.348l1.67 1.101 1.67 1.102a1 1 0 0 1-.835.449zm-.835.45-1.67-1.102-1.507 2.285 1.669 1.101 1.67 1.102 1.507-2.285zm-1.508 2.284-1.67-1.1a1 1 0 0 1 1.67 0l-1.669 1.101-1.669 1.102c1.187 1.798 3.823 1.794 5.007-.001zm-1.669.001 1.67-1.101-1.51-2.286-1.669 1.101-1.669 1.102 1.509 2.286zM9.657 20.45l1.67-1.102A3 3 0 0 0 8.823 18v2l-.002 2a1 1 0 0 1-.834-.449zM8.823 20v-2H4.001v4h4.822zm-4.822 0v-2A1 1 0 0 1 5 19H1a3 3 0 0 0 3.001 3zM3 19h2V3H1v16zM3 3h2a1 1 0 0 1-.999 1V0A3 3 0 0 0 1 3zm1.001-1v2H20V0H4.001z'
      mask='url(#visit-list-outline_svg__a)'
    />
    <rect
      width={3.47}
      height={3.47}
      x={10.27}
      y={9.059}
      fill='#364153'
      stroke='#364153'
      rx={0.5}
    />
  </svg>
);
export default SvgVisitListOutline;
