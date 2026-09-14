import Link from 'next/link'
import { ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-8">
      <main className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-8 sm:p-12 text-center">
          <ShieldCheck className="w-16 h-16 mx-auto text-white mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Find the right financial assistance for your future.
          </h1>
          <p className="text-blue-100 text-lg">
            A citizen financial-assistance service to match you with the right government-backed schemes.
          </p>
        </div>

        <div className="p-8 sm:p-12 flex flex-col items-center space-y-8">
          <div className="space-y-4 w-full max-w-sm">
            <div className="flex items-center space-x-3 text-gray-700">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span className="text-lg">Find suitable schemes</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span className="text-lg">Estimate your loan & EMI</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span className="text-lg">Locate the right partner</span>
            </div>
          </div>

          <Link
            href="/apply"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-lg hover:shadow-xl"
          >
            Find My Scheme
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>

          <p className="text-xs text-gray-400 text-center mt-8">
            This platform is a prototype decision-support tool. Scheme information, eligibility, interest rates, loan limits and partner availability shown in this demonstration use prototype/demo data and must be verified with the authorized agency. Recommendation does not guarantee loan approval.
          </p>
        </div>
      </main>
    </div>
  )
}
