import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quack 🦆 - Neel Phadke Portfolio',
  description: 'Full-Stack Developer Portfolio - Slack-style workspace',
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