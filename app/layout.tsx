import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolioterm - Bharath Vadlamannati',
  description: 'Terminal-style portfolio of Bharath Vadlamannati - Software Development Engineering Leader',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

