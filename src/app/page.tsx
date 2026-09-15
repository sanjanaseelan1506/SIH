import Link from 'next/link'
import { ArrowRight, CheckCircle2, ChevronRight, FileText, Search, Calculator, MapPin, BarChart3, Users, Landmark } from 'lucide-react'
import prisma from '@/lib/prisma'

export default async function Home() {
  const schemes = await prisma.scheme.findMany()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
            Empowering Marginalized Entrepreneurs
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Find the right government <span className="text-blue-600">financial scheme</span> for your needs.
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our smart system helps you understand which scheme suits your business, estimates your potential financing and repayment, and locates the nearest authorized channel partners.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/apply"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Find My Scheme
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-2xl transition-all hover:bg-gray-50"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-white -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="p-4">
                <div className="mx-auto w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-blue-600">
                  <Landmark className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Multiple</h3>
                <p className="text-gray-500 font-medium">Government Schemes</p>
              </div>
              <div className="p-4">
                <div className="mx-auto w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-blue-600">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Real-time</h3>
                <p className="text-gray-500 font-medium">EMI & Loan Estimates</p>
              </div>
              <div className="p-4">
                <div className="mx-auto w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-blue-600">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Verified</h3>
                <p className="text-gray-500 font-medium">Channel Partners Map</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">A simple, transparent four-step process to connect you with financial assistance.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: FileText, title: "1. Tell us your need", desc: "Share basic details about your business, income, and project cost." },
              { icon: Search, title: "2. Check eligibility", desc: "Our engine automatically evaluates rules to find your best matches." },
              { icon: Calculator, title: "3. Get financials", desc: "Instantly see estimated financing amounts and your potential EMI." },
              { icon: MapPin, title: "4. Find a partner", desc: "Locate authorized channel partners on a map to submit your application." }
            ].map((step, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative group">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                {i !== 3 && <ChevronRight className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-300" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scheme Explorer */}
      <section id="schemes" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Supported Schemes</h2>
              <p className="text-lg text-gray-600">Browse the demonstration database of financial assistance programs available in the platform.</p>
            </div>
            <Link href="/apply" className="mt-6 md:mt-0 inline-flex items-center font-medium text-blue-600 hover:text-blue-700">
              Find my match <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schemes.map(scheme => (
              <div key={scheme.id} className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                    {scheme.category}
                  </span>
                  <span className="text-sm font-medium text-gray-500">{scheme.interestRate}% Interest</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{scheme.name}</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">{scheme.description.split('.')[0]}.</p>
                
                <div className="space-y-3 pt-6 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Max Loan</span>
                    <span className="font-semibold text-gray-900">₹{scheme.maxLoanAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Financing</span>
                    <span className="font-semibold text-gray-900">Up to {scheme.financingPercentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to find your financial support?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">Answer a few simple questions and we&apos;ll instantly match you with the best government scheme for your future.</p>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-blue-600 bg-white hover:bg-gray-50 rounded-2xl transition-all shadow-xl hover:-translate-y-1"
          >
            Start Your Application
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
