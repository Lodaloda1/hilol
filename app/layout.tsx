import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { Anton } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const displayFont = Anton({
  variable: '--font-hilol-display',
  weight: '400',
  display: 'swap',
  preload: true,
  fallback: ['Arial Narrow', 'Arial', 'sans-serif'],
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: 'hi lol. — wear your humor.',
  description: 'Indian meme streetwear for people who are chronically online.',
  generator: 'HILOL',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'light',
  themeColor: '#e8ff00',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><meta name="color-scheme" content="light" /><meta name="supported-color-schemes" content="light" /></head><body className={displayFont.variable}><ClerkProvider>{children}{process.env.NODE_ENV === 'production' && <><Analytics /><Script src="https://www.googletagmanager.com/gtag/js?id=G-9XWLC9NHPW" strategy="afterInteractive" /><Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments)} gtag('js', new Date()); gtag('config', 'G-9XWLC9NHPW');`}</Script><Script id="meta-pixel" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init','1649634006762709'); fbq('track','PageView');`}</Script></>}</ClerkProvider></body></html>
}
