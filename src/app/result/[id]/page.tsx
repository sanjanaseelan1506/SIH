import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { CheckCircle, Info, Calculator, MapPin, Building2, Phone } from 'lucide-react'
import Link from 'next/link'

const Map = dynamic(() => import('@/components/Map'), { ssr: false })
const prisma = new PrismaClient()

export default async function ResultPage({ params }: { params: { id: string } }) {
  const recommendation = await prisma.recommendation.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      scheme: true
    }
  })

  if (!recommendation) return notFound()

  const { user, scheme } = recommendation

  // Financial Calculations
  const projectCost = user.projectCost
  const maxFinancingAllowed = (projectCost * scheme.financingPercentage) / 100
  const estimatedFinancing = Math.min(maxFinancingAllowed, scheme.maxLoanAmount)
  const applicantContribution = projectCost - estimatedFinancing
  
  const p = estimatedFinancing
  const r = (scheme.interestRate / 12) / 100
  const n = scheme.tenureMonths
  
  // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
  const totalRepayment = emi * n
  const totalInterest = totalRepayment - p

  // Format currency
  const formatCur = (num: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num)

  // Find partners
  const allPartners = await prisma.channelPartner.findMany({
    where: { active: true }
  })
  
  const eligiblePartners = allPartners.filter(p => p.supportedSchemes.includes(scheme.id))

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">🎯 Best Match For You</p>
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {scheme.name}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            {recommendation.matchScore}% Match
          </p>
        </div>

        {/* AI Explanation Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-100 text-blue-600">
                <Info className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Why this scheme?</h2>
              <div className="mt-2 text-gray-600">
                <p>{recommendation.matchReason}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Income eligibility verified
                  </div>
                  <div className="flex items-center text-sm text-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Project cost fits scheme limits
                  </div>
                  <div className="flex items-center text-sm text-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Requirement matches {scheme.category.toLowerCase()} category
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Calculator */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-600 p-6 sm:px-8 text-white flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center">
              <Calculator className="h-6 w-6 mr-2" />
              Estimated Financials
            </h2>
          </div>
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Project Cost</span>
                  <span className="font-semibold text-gray-900">{formatCur(projectCost)}</span>
                </div>
                <div className="flex justify-between border-b pb-2 text-blue-700">
                  <span className="font-medium">Estimated Financing ({scheme.financingPercentage}%)</span>
                  <span className="font-bold text-lg">{formatCur(estimatedFinancing)}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Your Contribution</span>
                  <span className="font-semibold text-gray-900">{formatCur(applicantContribution)}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Interest Rate</span>
                  <span className="font-semibold text-gray-900">{scheme.interestRate}% p.a.</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Tenure</span>
                  <span className="font-semibold text-gray-900">{scheme.tenureMonths} Months</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Moratorium</span>
                  <span className="font-semibold text-gray-900">{scheme.moratoriumMonths} Months</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border">
                  <span className="font-semibold text-gray-700">Estimated EMI</span>
                  <span className="font-bold text-2xl text-blue-600">{formatCur(emi)}<span className="text-sm font-normal text-gray-500">/mo</span></span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-6 text-center">
              Estimated values — final loan terms are determined by the authorized channel partner.
            </p>
          </div>
        </div>

        {/* Partner Locator */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 sm:px-8 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <MapPin className="h-6 w-6 mr-2 text-blue-600" />
              Eligible Channel Partners
            </h2>
            <p className="text-sm text-gray-500 mt-1">Demo partner availability data</p>
          </div>
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {eligiblePartners.map(partner => (
                  <div key={partner.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-lg text-gray-900 flex items-center">
                      <Building2 className="w-5 h-5 mr-2 text-gray-400" />
                      {partner.name}
                    </h3>
                    <div className="mt-2 space-y-2 text-sm text-gray-600">
                      <p><span className="font-medium text-gray-900">Type:</span> {partner.type}</p>
                      <p><span className="font-medium text-gray-900">Address:</span> {partner.address}</p>
                      <p className="flex items-center text-blue-600">
                        <Phone className="w-4 h-4 mr-1" />
                        {partner.contact}
                      </p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {partner.fundStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-[400px] rounded-xl overflow-hidden border bg-gray-50">
                <Map partners={eligiblePartners} />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bottom */}
        <div className="text-center pb-12">
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-blue-700 bg-blue-100 hover:bg-blue-200">
            Start New Application
          </Link>
        </div>

      </div>
    </div>
  )
}
