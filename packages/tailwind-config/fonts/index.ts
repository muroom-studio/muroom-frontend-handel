import localFont from 'next/font/local';

export const roboto = localFont({
  src: './AnyConv.com__RobotoFlex-VariableFont_GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.woff2',
  display: 'swap',
  weight: '400',
  variable: '--font-roboto',
});

export const pretendard = localFont({
  src: './PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});
