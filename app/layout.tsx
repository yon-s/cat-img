import type { Metadata } from 'next'

import './globals.css'
import { SEO_DEFAULT } from "@/utils/seo-config";
export const metadata: Metadata = SEO_DEFAULT;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      {children}
    </html>
  )
}
