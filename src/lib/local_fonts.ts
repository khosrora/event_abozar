import localFont from 'next/font/local';

export const iransans = localFont({
  src: [
    {
    path: '../../public/font/IRANSansX-Thin.ttf',
    weight: '100',
   },
   {
    path: '../../public/font/IRANSansX-UltraLight.ttf',
    weight: '200',
   },
   {
    path: '../../public/font/IRANSansX-Light.ttf',
    weight: '300',
   },
    {
    path: '../../public/font/IRANSansX-Medium.ttf',
    weight: '500',
   },
     {
     path: '../../public/font/IRANSansX-DemiBold.ttf',
     weight: '600',
    },
    {
     path: '../../public/font/IRANSansX-Bold.ttf',
     weight: '700',
    },
  {
     path: '../../public/font/IRANSansX-ExtraBold.ttf',
     weight: '800',
    },
       {
     path: '../../public/font/IRANSansX-Black.ttf',
     weight: '900',
    },
  ],
    variable: '--font-iransans',
    display: 'swap',
    preload: true,
    adjustFontFallback: false,
});

export const kalameh = localFont({
  src: [
    { path: '../../public/font/KalamehRegular.otf', weight: '400' },
    { path: '../../public/font/KalamehBlack.ttf', weight: '900' },
  ],
  variable: '--font-kalameh',
  display: 'swap',
  preload: true,
})