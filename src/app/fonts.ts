// src/app/fonts.ts
import localFont from 'next/font/local'

export const NeueMontreal = localFont({
  src: [
    {
      path: 'fonts/NeueMontreal-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: 'fonts/NeueMontreal-Light-Italic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: 'fonts/NeueMontreal-Regular.woff2',        // ← вот здесь
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/NeueMontreal-Regular-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: 'fonts/NeueMontreal-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'fonts/NeueMontreal-Medium-Italic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: 'fonts/NeueMontreal-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'fonts/NeueMontreal-Bold-Italic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-neue-montreal',
  display: 'swap',
})
