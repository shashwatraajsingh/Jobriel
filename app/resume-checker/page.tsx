'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import ResumeCheckerUpload from '@/components/ResumeCheckerUpload'
import ResumeAnalysisResult from '@/components/ResumeAnalysisResult'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function ResumeCheckerPage() {
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white">
        {/* Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />
        
        <Navbar />
        
        <main className="relative z-10 container mx-auto px-4 pt-32 pb-12">
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-6xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 bg-clip-text text-transparent">
                Resume Checker
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Upload your resume and get AI-powered feedback with project, skill, and certification recommendations
            </p>
          </div>

          <div className="mx-auto max-w-6xl space-y-10">
            <ResumeCheckerUpload 
              onAnalysisComplete={(data) => {
                console.log('Resume analysis received:', data)
                setAnalysisResult(data.analysis)
              }}
            />
            {analysisResult && <ResumeAnalysisResult result={analysisResult} />}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
