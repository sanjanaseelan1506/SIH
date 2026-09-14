import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Scheme Matcher',
  description: 'AI-Driven Scheme Matching for Marginalized Entrepreneurs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                <ShieldCheck className="w-8 h-8" />
                <span className="font-bold text-xl tracking-tight">Scheme Matcher</span>
              </Link>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 hidden sm:inline-block">GovAssist Demo</span>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
