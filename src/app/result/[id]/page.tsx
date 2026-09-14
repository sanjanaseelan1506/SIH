import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { CheckCircle2, Info, Calculator, MapPin, Building2, Phone, AlertTriangle, ArrowRight, ShieldCheck, PieChart, Sparkles } from 'lucide-react'
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
  
  const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
  const totalRepayment = emi * n
  const totalInterest = totalRepayment - p

  const formatCur = (num: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num)

  // Find partners
  const allPartners = await prisma.channelPartner.findMany({
    where: { active: true }
  })
  
  const eligiblePartners = allPartners.filter(p => p.supportedSchemes.includes(scheme.id))

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 relative pb-32">
      
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header / Top Match */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 font-bold text-sm mb-2 shadow-sm border border-green-200">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Highest Match Found
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            {scheme.name}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Based on your profile, this is the most suitable government scheme.
          </p>
        </div>

        {/* AI Assistant Explanation */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl shadow-xl overflow-hidden text-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="w-48 h-48" />
          </div>
          <div className="p-8 sm:p-10 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 text-center md:text-left border-b md:border-b-0 md:border-r border-blue-500/50 pb-6 md:pb-0 md:pr-8">
              <div className="text-6xl font-black text-white mb-2 tracking-tighter">
                {recommendation.matchScore}<span className="text-4xl">%</span>
              </div>
              <div className="text-blue-100 font-medium uppercase tracking-widest text-sm">Match Score</div>
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-5 h-5 text-blue-200" />
                <h2 className="text-lg font-bold text-blue-50">AI Analysis</h2>
              </div>
              <p className="text-lg leading-relaxed text-blue-100 font-medium mb-6">
                &quot;{recommendation.matchReason}&quot;
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-800/50 text-xs font-semibold text-blue-100 border border-blue-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-green-400" /> Income Verified
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-800/50 text-xs font-semibold text-blue-100 border border-blue-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-green-400" /> Cost Verified
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-800/50 text-xs font-semibold text-blue-100 border border-blue-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-green-400" /> Category: {scheme.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-xl flex items-start">
          <AlertTriangle className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-800 leading-relaxed">
            <span className="font-bold block mb-1">Important Disclaimer</span>
            A high match score indicates eligibility based on prototype data. It does <span className="font-semibold underline">not</span> guarantee loan approval. Final approval is subject to document verification and partner bank policies.
          </p>
        </div>

        {/* Two Column Layout for Finance & Scheme Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Financial Calculator Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Calculator className="h-6 w-6 mr-2 text-blue-600" />
                Financial Estimate
              </h2>
            </div>
            
            <div className="p-8 flex-grow space-y-8">
              
              <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 text-center">
                <p className="text-sm text-blue-600 font-semibold mb-1 uppercase tracking-wide">Estimated EMI</p>
                <div className="text-4xl font-black text-gray-900 mb-2">
                  {formatCur(emi)}<span className="text-xl text-gray-500 font-medium">/mo</span>
                </div>
                <p className="text-xs text-gray-500">For {n} months @ {scheme.interestRate}% p.a.</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Capital Breakdown</h3>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Project Cost</span>
                  <span className="font-medium text-gray-900">{formatCur(projectCost)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Your Contribution</span>
                  <span className="font-medium text-gray-900">{formatCur(applicantContribution)}</span>
                </div>
                <div className="flex justify-between items-center text-base font-bold text-blue-700 bg-blue-50 px-3 py-2 rounded-lg">
                  <span>Eligible Financing</span>
                  <span>{formatCur(estimatedFinancing)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Repayment Summary</h3>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center"><PieChart className="w-4 h-4 mr-1.5" /> Total Interest</span>
                  <span className="font-medium text-gray-900">{formatCur(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Total Amount Payable</span>
                  <span className="font-medium text-gray-900">{formatCur(totalRepayment)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Moratorium Period</span>
                  <span className="font-medium text-gray-900">{scheme.moratoriumMonths} Months</span>
                </div>
              </div>

            </div>
          </div>

          {/* Scheme Details Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Info className="h-6 w-6 mr-2 text-blue-600" />
                Scheme Details
              </h2>
            </div>
            
            <div className="p-8 flex-grow space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{scheme.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Limits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Max Loan Amount: <span className="font-semibold">{formatCur(scheme.maxLoanAmount)}</span></span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Financing up to: <span className="font-semibold">{scheme.financingPercentage}%</span> of project cost</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Income limit: <span className="font-semibold">{formatCur(scheme.maxIncome)} / year</span></span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Required Documents</h3>
                <div className="flex flex-wrap gap-2">
                  {scheme.requiredDocuments.split(',').map((doc, i) => (
                    <span key={i} className="inline-flex px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200">
                      {doc.trim()}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Partner Locator */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 sm:px-8 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <MapPin className="h-7 w-7 mr-2 text-blue-600" />
                Where to Apply
              </h2>
              <p className="text-sm text-gray-500 mt-1">Authorized channel partners for {scheme.name}</p>
            </div>
            <div className="mt-4 sm:mt-0 inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
              Demo Data Mode
            </div>
          </div>
          
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-1 space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {eligiblePartners.length === 0 ? (
                  <div className="text-center p-8 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-500">No demo partners available in this area.</p>
                  </div>
                ) : (
                  eligiblePartners.map(partner => (
                    <div key={partner.id} className="border border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all group bg-white">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {partner.name}
                        </h3>
                      </div>
                      
                      <div className="space-y-2.5 text-sm text-gray-600">
                        <p className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <Building2 className="w-4 h-4 mr-1.5" />
                          {partner.type}
                        </p>
                        <p className="leading-relaxed border-t border-gray-100 pt-2">{partner.address}</p>
                        <div className="flex items-center justify-between pt-2">
                          <p className="flex items-center font-medium text-gray-900">
                            <Phone className="w-4 h-4 mr-1.5 text-blue-600" />
                            {partner.contact}
                          </p>
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-green-100 text-green-800 tracking-wide uppercase">
                            {partner.fundStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="lg:col-span-2 h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-gray-200 shadow-inner bg-gray-50 relative z-0">
                <Map partners={eligiblePartners} />
              </div>
              
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center pt-8">
          <Link href="/" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-2xl text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
            Start New Application
          </Link>
        </div>

      </div>
    </div>
  )
}
