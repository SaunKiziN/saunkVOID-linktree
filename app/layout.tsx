import React from 'react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { AudioProvider } from '@/components/audio-provider'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'S a u n K',
  description: 'Todos os links do SaunK em um só lugar.',
  icons: {
    icon: '/saunk-favicon-512.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <AudioProvider>
          {children}
          <Analytics />
        </AudioProvider>
      </body>
    </html>
  )
}
