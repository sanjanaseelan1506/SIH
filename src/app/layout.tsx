import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { ShieldCheck, BookOpen, Map, Calculator } from 'lucide-react'

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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased flex flex-col min-h-screen`}>
        <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="font-extrabold text-xl tracking-tight text-gray-900">Scheme Matcher</span>
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/#how-it-works" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">How it works</Link>
                <Link href="/#schemes" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Schemes</Link>
                <Link href="/apply" className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Find My Scheme
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-100 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2 space-y-4">
                <Link href="/" className="flex items-center space-x-2 text-blue-600">
                  <ShieldCheck className="w-6 h-6" />
                  <span className="font-bold text-lg text-gray-900">Scheme Matcher</span>
                </Link>
                <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                  A prototype decision-support tool designed for the SIH problem statement to help marginalized entrepreneurs find suitable government financial assistance.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Features</h4>
                <ul className="space-y-3 text-sm text-gray-500">
                  <li className="flex items-center"><Calculator className="w-4 h-4 mr-2" /> Financial Calculator</li>
                  <li className="flex items-center"><BookOpen className="w-4 h-4 mr-2" /> Scheme Explorer</li>
                  <li className="flex items-center"><Map className="w-4 h-4 mr-2" /> Partner Locator</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Disclaimer</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Scheme information, eligibility, interest rates, loan limits, and partner availability shown use prototype/demo data and must be verified with the authorized agency. Recommendation does not guarantee loan approval.
                </p>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
              © {new Date().getFullYear()} Scheme Matcher Demo. Built for SIH.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
