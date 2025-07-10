// app/layout.tsx (или src/app/layout.tsx)
import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { NeueMontreal } from './fonts'

export const metadata: Metadata = {
  title: 'IZIGRAM – messenger, social network, and cryptocurrency',
  description: 'IZIGRAM – a secure messenger and social network with a crypto wallet and Web3 technologies. Freedom of communication and earning.',
  keywords: 'IZIGRAM, messenger, cryptocurrency, Web3, social network, anonymity, security',
  openGraph: {
    title: 'IZIGRAM – messenger, cryptocurrency, and social network in one',
    description: 'Secure social network and messenger with Web3 technologies and cryptocurrency wallet',
    url: 'https://izigram.com/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IZIGRAM – freedom to communicate and earn money',
    description: 'Secure social network and messenger with Web3 technologies and cryptocurrency wallet',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={NeueMontreal.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RX2NN0PRHN"
          strategy="afterInteractive"
        />

        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RX2NN0PRHN');
          `}
        </Script>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
