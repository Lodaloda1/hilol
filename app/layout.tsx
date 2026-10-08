import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/next'
import { Anton } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const displayFont = Anton({
  variable: '--font-hilol-display',
  weight: '400',
  display: 'swap',
  preload: true,
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
  return <html lang="en"><body className={displayFont.variable}><ClerkProvider>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</ClerkProvider></body></html>
}
