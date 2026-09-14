'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, CheckCircle2, Building2, User, Wallet, Loader2 } from 'lucide-react'

export default function ApplyForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: 'Demo User',
    income: '280000',
    purpose: 'Start Business',
    business: 'Tailoring',
    projectCost: '120000',
    location: 'Chennai',
    preferredLanguage: 'English'
  })

  const [loading, setLoading] = useState(false)

  const handleNext = () => setStep(s => Math.min(s + 1, 3))
  const handlePrev = () => setStep(s => Math.max(s - 1, 1))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          income: parseFloat(formData.income),
          projectCost: parseFloat(formData.projectCost)
        })
      })
      
      const data = await res.json()
      
      if (data.recommendationId) {
        router.push(`/result/${data.recommendationId}`)
      } else {
        alert("We couldn't find a suitable match based on the information provided. Please review your details or contact an authorized agency.")
        setLoading(false)
      }
    } catch (err) {
      console.error(err)
      alert("An error occurred. Please try again.")
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const steps = [
    { id: 1, name: 'Personal', icon: User },
    { id: 2, name: 'Requirement', icon: Building2 },
    { id: 3, name: 'Financial', icon: Wallet },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-600 z-0 hidden sm:block rounded-b-[4rem]"></div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:text-white">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 sm:text-white">Tell us your needs</h1>
          <p className="text-gray-500 sm:text-blue-100">Answer a few simple questions to find your eligible schemes.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Progress Bar */}
          <div className="bg-gray-50/50 border-b border-gray-100 px-6 py-5 sm:px-10">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0"></div>
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full z-0 transition-all duration-500"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>
              
              {steps.map((s) => (
                <div key={s.id} className="relative z-10 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step > s.id ? 'bg-blue-600 text-white' : step === s.id ? 'bg-white border-2 border-blue-600 text-blue-600 shadow-md' : 'bg-white border-2 border-gray-200 text-gray-400'
                  }`}>
                    {step > s.id ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs font-medium mt-2 hidden sm:block ${step >= s.id ? 'text-gray-900' : 'text-gray-400'}`}>
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext() }} className="p-6 sm:p-10">
            
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Personal Details</h3>
                  <p className="text-gray-500 text-sm mt-1">Basic information to check your baseline eligibility.</p>
                </div>
                
                <div className="space-y-5 mt-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Applicant Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Annual Family Income (₹)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                      <input required type="number" name="income" value={formData.income} onChange={handleChange} 
                        className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">Combined annual income of your family from all sources.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">City / Location</label>
                      <input required type="text" name="location" value={formData.location} onChange={handleChange} 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Language</label>
                      <select name="preferredLanguage" value={formData.preferredLanguage} onChange={handleChange} 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all">
                        <option value="English">English</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Hindi">Hindi</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Requirement Details</h3>
                  <p className="text-gray-500 text-sm mt-1">What do you need the financial assistance for?</p>
                </div>
                
                <div className="space-y-5 mt-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Purpose of Assistance</label>
                    <div className="relative">
                      <select required name="purpose" value={formData.purpose} onChange={handleChange} 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all appearance-none">
                        <option value="">Select Purpose...</option>
                        <option value="Start Business">Start Business</option>
                        <option value="Expand Business">Expand Business</option>
                        <option value="Education">Education</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>

                  {(formData.purpose === 'Start Business' || formData.purpose === 'Expand Business') && (
                    <div className="animate-in fade-in duration-300">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Business Category / Industry</label>
                      <input required type="text" name="business" value={formData.business} onChange={handleChange} 
                        placeholder="e.g. Tailoring, Retail, Manufacturing" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" />
                      <p className="text-xs text-gray-500 mt-1.5">Helps us match you with sector-specific schemes.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Financial Details</h3>
                  <p className="text-gray-500 text-sm mt-1">Estimate the capital required for your project.</p>
                </div>
                
                <div className="space-y-5 mt-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Total Project / Education Cost (₹)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                      <input required type="number" name="projectCost" value={formData.projectCost} onChange={handleChange} 
                        className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-lg font-medium" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">The total estimated cost to complete your requirement.</p>
                  </div>

                  <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl mt-6 flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-blue-800 font-medium leading-relaxed">
                      Almost done! We will now cross-reference your profile against the scheme database to find the highest-matching financial assistance program.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-10 flex justify-between pt-6 border-t border-gray-100">
              {step > 1 ? (
                <button type="button" onClick={handlePrev} className="px-6 py-3.5 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 flex items-center transition-all">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
              ) : <div></div>}
              
              <button type="submit" disabled={loading} className="px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 flex items-center transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0 hover:-translate-y-0.5">
                {loading ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                ) : step === 3 ? (
                  'Find Match'
                ) : (
                  <>Next Step <ArrowRight className="w-5 h-5 ml-2" /></>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
