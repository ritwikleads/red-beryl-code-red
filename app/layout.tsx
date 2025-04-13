import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({ searchParams }: { searchParams: { firstName?: string } }): Promise<Metadata> {
  const firstName = searchParams?.firstName
  return {
    title: firstName ? `${firstName}'s Meeting Scheduler` : 'Meeting Scheduler',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}