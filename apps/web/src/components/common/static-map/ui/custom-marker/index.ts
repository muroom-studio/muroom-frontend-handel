const HOME_MARKER_HTML = `
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_40002966_63683)">
<rect x="6" y="4" width="24" height="24" rx="12" fill="#F9FAFB" shape-rendering="crispEdges"/>
<rect x="6.5" y="4.5" width="23" height="23" rx="11.5" stroke="#8E51FF" shape-rendering="crispEdges"/>
<path d="M16.5132 16.8699V21.9987C16.4354 22.0015 16.3586 21.988 16.2853 21.9593C16.255 21.9486 16.227 21.9351 16.1996 21.9188L12.3002 19.6558C12.2716 19.6395 12.2448 19.6209 12.219 19.6001C12.1126 19.5128 12.0392 19.389 12.0134 19.2533C12.0045 19.2156 12 19.1751 12 19.134V14.536C12 14.4955 12.0045 14.4544 12.0134 14.4156C12.0252 14.3474 12.051 14.2816 12.0885 14.2225C12.1411 14.1335 12.2162 14.0598 12.3103 14.0069L14.703 12.6834C14.8873 12.581 15.1108 12.5838 15.2928 12.6896L16.5003 13.3894V16.8626L16.5138 16.8699H16.5132Z" fill="url(#paint0_linear_40002966_63683)"/>
<path d="M19.3173 10.5154C19.2887 10.4884 19.259 10.4642 19.2271 10.4428C19.0484 10.3268 18.8098 10.3043 18.6003 10.4264L16.8002 11.4712C16.6143 11.5782 16.5 11.7775 16.5 11.9931V21.046C16.5 21.0899 16.5045 21.1321 16.5134 21.1727V21.9957C16.6126 21.994 16.7117 21.967 16.8002 21.9157L19.2002 20.5225C19.3862 20.4155 19.5004 20.2163 19.5004 20.0007V10.9483C19.5004 10.7732 19.4282 10.6229 19.3173 10.5154Z" fill="url(#paint1_linear_40002966_63683)"/>
<path d="M24.0016 12.8661V15.6504C24.0016 15.866 23.8873 16.0647 23.7014 16.1733L21.8626 17.2406C21.4711 17.4669 20.9804 17.1956 20.9625 16.7419L20.8768 14.5104C20.8679 14.3038 20.7553 14.1153 20.5766 14.0117L19.5012 13.3874L16.582 11.693C16.633 11.6024 16.7081 11.5258 16.801 11.4729L19.2016 10.0802C19.3875 9.97326 19.6155 9.97326 19.8014 10.0802L23.7014 12.3432C23.8873 12.4518 24.0016 12.6505 24.0016 12.8661Z" fill="url(#paint2_linear_40002966_63683)"/>
</g>
<defs>
<filter id="filter0_d_40002966_63683" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="2"/>
<feGaussianBlur stdDeviation="3"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_40002966_63683"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_40002966_63683" result="shape"/>
</filter>
<linearGradient id="paint0_linear_40002966_63683" x1="14.2569" y1="12.6084" x2="14.2569" y2="21.9991" gradientUnits="userSpaceOnUse">
<stop stop-color="#9E4AFC"/>
<stop offset="1" stop-color="#6D34E0"/>
</linearGradient>
<linearGradient id="paint1_linear_40002966_63683" x1="18.0002" y1="10.3447" x2="18.0002" y2="21.9957" gradientUnits="userSpaceOnUse">
<stop stop-color="#9044F4"/>
<stop offset="1" stop-color="#6D34E0"/>
</linearGradient>
<linearGradient id="paint2_linear_40002966_63683" x1="20.2918" y1="10" x2="20.2918" y2="17.322" gradientUnits="userSpaceOnUse">
<stop stop-color="#A44DFF"/>
<stop offset="1" stop-color="#7136E2"/>
</linearGradient>
</defs>
</svg>
`;

const PARKING_MARKER_HTML = `
<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 5C6 3.89543 6.89543 3 8 3H28C29.1046 3 30 3.89543 30 5V23.9296C30 24.5983 29.6658 25.2228 29.1094 25.5937L19.1094 32.2604C18.4376 32.7083 17.5624 32.7083 16.8906 32.2604L6.8906 25.5937C6.3342 25.2228 6 24.5983 6 23.9296V5Z" fill="#7F22FE"/>
<path d="M13.5 9H18.986C20.0257 9 20.9218 9.19336 21.6743 9.58008C22.4313 9.9624 23.0081 10.4985 23.4049 11.1885C23.8016 11.8784 24 12.6694 24 13.5615C24 14.458 23.7993 15.249 23.398 15.9346C22.9967 16.6201 22.413 17.1541 21.6469 17.5364C20.8853 17.9143 19.9778 18.1033 18.9244 18.1033H16.4072V22.5H13.5V9ZM18.4524 15.8423C19.0134 15.8423 19.4853 15.7478 19.8684 15.5588C20.2515 15.3699 20.5365 15.104 20.7235 14.7612C20.915 14.4185 21.0107 14.0186 21.0107 13.5615C21.0107 12.8628 20.7941 12.3113 20.3609 11.907C19.9277 11.5027 19.2893 11.3005 18.4456 11.3005H16.4072V15.8423H18.4524Z" fill="white"/>
</svg>
`;

const CONVENIENCE_MARKER_HTML = `
<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_40001821_232233)">
<rect x="6" y="4" width="24" height="24" rx="12" fill="#7008E7" shape-rendering="crispEdges"/>
<path d="M11.9979 15.7687C11.9327 15.2464 12.3399 14.7852 12.8662 14.7852H23.1338C23.6601 14.7852 24.0673 15.2464 24.0021 15.7687L23.5374 19.4857C23.3732 20.7994 22.2565 21.7852 20.9327 21.7852H15.0673C13.7435 21.7852 12.6268 20.7994 12.4626 19.4857L11.9979 15.7687Z" fill="white"/>
<path d="M16.457 10.374C16.6706 10.1607 17.017 10.1605 17.2305 10.374C17.4439 10.5875 17.4438 10.9339 17.2305 11.1475L15.7783 12.5996H20.2197L18.7812 11.1611C18.5677 10.9476 18.5677 10.6013 18.7812 10.3877C18.9948 10.1744 19.3412 10.1742 19.5547 10.3877L21.7666 12.5996H24.125C24.6082 12.5996 24.9999 12.9915 25 13.4746C25 13.9579 24.6082 14.3496 24.125 14.3496H11.875C11.3918 14.3496 11 13.9579 11 13.4746C11.0001 12.9915 11.3918 12.5996 11.875 12.5996H14.2314L16.457 10.374Z" fill="white"/>
<rect x="14.5" y="16" width="1" height="4" rx="0.5" fill="#7F22FE"/>
<rect x="16.5" y="16" width="1" height="4" rx="0.5" fill="#7F22FE"/>
<rect x="18.5" y="16" width="1" height="4" rx="0.5" fill="#7F22FE"/>
<rect x="20.5" y="16" width="1" height="4" rx="0.5" fill="#7F22FE"/>
</g>
<defs>
<filter id="filter0_d_40001821_232233" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="2"/>
<feGaussianBlur stdDeviation="3"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_40001821_232233"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_40001821_232233" result="shape"/>
</filter>
</defs>
</svg>
`;

const CAFE_MARKER_HTML = `
<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_40001821_232234)">
<rect x="6" y="4" width="24" height="24" rx="12" fill="#FF6467" shape-rendering="crispEdges"/>
<path d="M11.5 12.5C11.5 11.3954 12.3954 10.5 13.5 10.5H20.6289C21.7335 10.5 22.6289 11.3954 22.6289 12.5V18.8467C22.6289 20.3833 21.3833 21.6289 19.8467 21.6289H14.2822C12.7456 21.6289 11.5 20.3833 11.5 18.8467V12.5Z" fill="#FFC9C9"/>
<path d="M25.4111 13.2822C25.9232 13.2824 26.3379 13.6979 26.3379 14.21V17.9189C26.3379 18.431 25.9232 18.8465 25.4111 18.8467H22.6289V13.2822H25.4111ZM24.0195 14.6738C23.7638 14.6741 23.5568 14.8819 23.5566 15.1377V16.9932C23.5568 17.2489 23.7638 17.4558 24.0195 17.4561C24.2755 17.4561 24.4832 17.2491 24.4834 16.9932V15.1377C24.4832 14.8817 24.2755 14.6738 24.0195 14.6738Z" fill="#FFC9C9"/>
<rect x="12.5" y="11.2188" width="9.00817" height="2.77734" rx="1.38867" fill="white"/>
</g>
<defs>
<filter id="filter0_d_40001821_232234" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="2"/>
<feGaussianBlur stdDeviation="3"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_40001821_232234"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_40001821_232234" result="shape"/>
</filter>
</defs>
</svg>
`;

const RESTRAUNT_MARKER_HTML = `
<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_40001821_232235)">
<rect x="6" y="4" width="24" height="24" rx="12" fill="#F0B100" shape-rendering="crispEdges"/>
<mask id="mask0_40001821_232235" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="12" y="9" width="12" height="6">
<rect x="12" y="9.59961" width="12" height="4.8" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_40001821_232235)">
<path d="M17.7805 9.67741C17.9225 9.62708 18.0775 9.62708 18.2195 9.67741L18.7387 9.86149C18.8178 9.88953 18.9016 9.90216 18.9854 9.89868L19.5359 9.87583C19.6864 9.86958 19.8345 9.91526 19.9553 10.0052L20.3973 10.3342C20.4646 10.3843 20.5409 10.421 20.622 10.4424L21.1548 10.5828C21.3004 10.6212 21.4285 10.7085 21.5174 10.8301L21.8428 11.2747C21.8923 11.3424 21.9544 11.4 22.0257 11.4444L22.4933 11.7356C22.6212 11.8152 22.7178 11.9364 22.767 12.0788L22.9468 12.5995C22.9742 12.6788 23.0166 12.7522 23.0716 12.8156L23.4326 13.2317C23.5314 13.3455 23.588 13.4897 23.593 13.6403L23.6114 14.1909C23.6141 14.2748 23.633 14.3573 23.6669 14.4341L23.8892 14.9382C23.95 15.076 23.9616 15.2305 23.922 15.3759L23.7773 15.9075C23.7552 15.9884 23.7489 16.0729 23.7586 16.1563L23.8226 16.7035C23.84 16.8531 23.8055 17.0042 23.7249 17.1314L23.4299 17.5967C23.3849 17.6675 23.354 17.7464 23.3387 17.8289L23.2385 18.3707C23.2111 18.5188 23.1336 18.653 23.019 18.7508L22.6 19.1084C22.5362 19.1629 22.4834 19.2291 22.4444 19.3035L22.189 19.7916C22.1192 19.9251 22.0056 20.0305 21.8672 20.0902L21.3614 20.3084C21.2843 20.3417 21.2144 20.3894 21.1552 20.449L20.7673 20.8401C20.6612 20.9471 20.5216 21.0143 20.3718 21.0305L19.8241 21.09C19.7407 21.0991 19.6597 21.124 19.5857 21.1635L19.0997 21.423C18.9668 21.4939 18.8135 21.517 18.6656 21.4884L18.1247 21.3837C18.0423 21.3678 17.9577 21.3678 17.8753 21.3837L17.3344 21.4884C17.1865 21.517 17.0332 21.4939 16.9003 21.423L16.4143 21.1635C16.3403 21.124 16.2593 21.0991 16.1759 21.09L15.6282 21.0305C15.4784 21.0143 15.3388 20.9471 15.2327 20.8401L14.8448 20.449C14.7856 20.3894 14.7157 20.3417 14.6386 20.3084L14.1328 20.0902C13.9944 20.0305 13.8808 19.9251 13.811 19.7916L13.5556 19.3035C13.5166 19.2291 13.4638 19.1629 13.4 19.1084L12.981 18.7508C12.8664 18.653 12.7889 18.5188 12.7615 18.3707L12.6613 17.8289C12.646 17.7464 12.6151 17.6675 12.5701 17.5967L12.2751 17.1314C12.1945 17.0042 12.16 16.8531 12.1774 16.7035L12.2414 16.1563C12.2511 16.0729 12.2448 15.9884 12.2227 15.9075L12.078 15.3759C12.0384 15.2305 12.05 15.076 12.1108 14.9382L12.3331 14.4341C12.367 14.3573 12.3859 14.2748 12.3886 14.1909L12.407 13.6403C12.412 13.4897 12.4686 13.3455 12.5674 13.2317L12.9284 12.8156C12.9834 12.7522 13.0258 12.6788 13.0532 12.5995L13.233 12.0788C13.2822 11.9364 13.3788 11.8152 13.5067 11.7356L13.9744 11.4444C14.0456 11.4 14.1077 11.3424 14.1572 11.2747L14.4826 10.8301C14.5715 10.7085 14.6996 10.6212 14.8452 10.5828L15.378 10.4424C15.4591 10.421 15.5354 10.3843 15.6027 10.3342L16.0447 10.0052C16.1655 9.91526 16.3136 9.86958 16.4641 9.87583L17.0146 9.89868C17.0984 9.90216 17.1822 9.88953 17.2613 9.86149L17.7805 9.67741Z" fill="white"/>
</g>
<path d="M23.5 14.3994C23.7761 14.3994 24 14.6233 24 14.8994V18.3994C24 20.0563 22.6569 21.3994 21 21.3994V21.8994C21 22.1756 20.7761 22.3994 20.5 22.3994H15.5C15.2239 22.3994 15 22.1756 15 21.8994V21.3994C13.3431 21.3994 12 20.0563 12 18.3994V14.8994C12 14.6233 12.2239 14.3994 12.5 14.3994H23.5Z" fill="#FFF085"/>
</g>
<defs>
<filter id="filter0_d_40001821_232235" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="2"/>
<feGaussianBlur stdDeviation="3"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_40001821_232235"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_40001821_232235" result="shape"/>
</filter>
</defs>
</svg>
`;

const LAUNDRY_MARKER_HTML = `
<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_40001821_232236)">
<rect x="6" y="4" width="24" height="24" rx="12" fill="#2B7FFF" shape-rendering="crispEdges"/>
<path d="M12.5 10.2204C12.5 9.85488 12.7963 9.55859 13.1618 9.55859H22.8382C23.2037 9.55859 23.5 9.85488 23.5 10.2204V10.8968C23.5 11.2623 23.2037 11.5586 22.8382 11.5586H13.1618C12.7963 11.5586 12.5 11.2623 12.5 10.8968V10.2204Z" fill="white"/>
<path d="M12.5 12.6618C12.5 12.2963 12.7963 12 13.1618 12H22.8382C23.2037 12 23.5 12.2963 23.5 12.6618V21.1765C23.5 21.9074 22.9074 22.5 22.1765 22.5H13.8235C13.0926 22.5 12.5 21.9074 12.5 21.1765V12.6618Z" fill="white"/>
<rect x="14.5" y="13.5586" width="7" height="7" rx="3.5" fill="#2B7FFF"/>
<circle cx="22" cy="10.5" r="0.5" fill="#51A2FF"/>
</g>
<defs>
<filter id="filter0_d_40001821_232236" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="2"/>
<feGaussianBlur stdDeviation="3"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_40001821_232236"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_40001821_232236" result="shape"/>
</filter>
</defs>
</svg>
`;

export {
  HOME_MARKER_HTML,
  PARKING_MARKER_HTML,
  CONVENIENCE_MARKER_HTML,
  CAFE_MARKER_HTML,
  RESTRAUNT_MARKER_HTML,
  LAUNDRY_MARKER_HTML,
};
