import type { Metadata } from 'next'
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
      <body >
        {children}
      </body>
    </html>
  )
}