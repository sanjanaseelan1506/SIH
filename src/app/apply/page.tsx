'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft } from 'lucide-react'

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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Find Your Scheme</h2>
          <div className="mt-2 flex space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-2 flex-1 rounded-full ${step >= i ? 'bg-white' : 'bg-blue-400'}`} />
            ))}
          </div>
        </div>

        <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext() }} className="p-6 sm:p-8">
          
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Applicant Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Family Income (₹)</label>
                <input required type="number" name="income" value={formData.income} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City / Location</label>
                <input required type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
                <select name="preferredLanguage" value={formData.preferredLanguage} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                  <option value="English">English</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Requirement Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Assistance</label>
                <select required name="purpose" value={formData.purpose} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                  <option value="">Select Purpose...</option>
                  <option value="Start Business">Start Business</option>
                  <option value="Expand Business">Expand Business</option>
                  <option value="Education">Education</option>
                </select>
              </div>

              {(formData.purpose === 'Start Business' || formData.purpose === 'Expand Business') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Category</label>
                  <input required type="text" name="business" value={formData.business} onChange={handleChange} placeholder="e.g. Tailoring, Retail, Manufacturing" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Financial Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project / Education Cost (₹)</label>
                <input required type="number" name="projectCost" value={formData.projectCost} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-6">
                <p className="text-sm text-blue-800 font-medium text-center">
                  Almost there! We will now find the best government-backed scheme for your profile.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between pt-4 border-t">
            {step > 1 ? (
              <button type="button" onClick={handlePrev} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 flex items-center transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
            ) : <div />}
            
            <button type="submit" disabled={loading} className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center transition-colors disabled:opacity-70">
              {loading ? 'Processing...' : step === 3 ? 'Find Match' : 'Next'}
              {!loading && step < 3 && <ArrowRight className="w-4 h-4 ml-2" />}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
