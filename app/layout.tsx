import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '猫判定アプリ',
  description: '画像から猫かどうかを判別します',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* headタグとその中にアイコンやテーマカラー、manifestを記述する */}
      <head>
        <link rel="icon" href="/icon-192x192.png" type="image/x-icon" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#4D411F" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
