import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Baby Spa',
  description: 'Sistema de gestion de citas'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased`}> {children}</body>
    </html>
  )
}
