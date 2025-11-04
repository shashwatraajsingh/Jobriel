'use client'

import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import ResumeCheckerUpload from '@/components/ResumeCheckerUpload'
import ResumeAnalysisResult from '@/components/ResumeAnalysisResult'
import ProtectedRoute from '@/components/ProtectedRoute'
import RevealText from '@/components/ui/RevealText'
import { FileText, Sparkles, Target } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ResumeCheckerPage() {
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const floatingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      // Hero entrance animation
      if (heroRef.current) {
        const heroItems = heroRef.current.querySelectorAll('.hero-item')
        gsap.fromTo(
          heroItems,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            clearProps: 'all',
          }
        )
      }

      // Floating animation
      if (floatingRef.current) {
        gsap.to(floatingRef.current, {
          y: -20,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-luxe-bg text-text-heading overflow-hidden">
        {/* Luxe Mist Background */}
        <div className="fixed inset-0 bg-luxe-bg" />
        
        {/* Grid Pattern */}
        <div className="fixed inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(106, 77, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(106, 77, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
        
        {/* Gradient Overlays */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-pale/30 via-transparent to-transparent" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-violet/5 via-transparent to-transparent" />
        
        {/* Floating gradient orbs */}
        <div
          ref={floatingRef}
          className="fixed top-1/3 right-0 w-96 h-96 bg-violet/8 rounded-full blur-3xl"
        />
        <div className="fixed bottom-1/4 left-0 w-96 h-96 bg-violet-light/10 rounded-full blur-3xl" />
        
        <Navbar />
        
        <main className="relative z-10">
          {/* Hero Section */}
          <section ref={heroRef} className="container mx-auto px-6 lg:px-8 pt-32 pb-20">
            <div className="max-w-5xl mx-auto text-center">
              {/* Badge */}
              <div className="hero-item mb-8 inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet-pale/40 backdrop-blur-sm px-6 py-3 shadow-soft">
                <Target className="h-4 w-4 text-violet" />
                <span className="text-sm font-semibold text-violet">Brutally Honest AI Analysis</span>
              </div>

              {/* Title */}
              <div className="hero-item mb-8">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
                  <span className="bg-gradient-to-r from-violet to-violet-light bg-clip-text text-transparent">
                    Resume Checker
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <div className="hero-item max-w-3xl mx-auto mb-12">
                <p className="text-xl md:text-2xl text-text-body leading-relaxed">
                  Upload your resume and get <span className="text-text-heading font-medium">unfiltered AI-powered feedback</span> with project suggestions, skills to learn, and certifications needed
                </p>
              </div>

              {/* Features */}
              <div className="hero-item flex flex-wrap items-center justify-center gap-4 text-sm">
                <div className="px-5 py-2.5 rounded-full bg-white border border-luxe-border text-text-body flex items-center gap-2 hover:border-violet/30 hover:shadow-soft transition-all">
                  <FileText className="h-4 w-4 text-violet" />
                  PDF Support
                </div>
                <div className="px-5 py-2.5 rounded-full bg-white border border-luxe-border text-text-body flex items-center gap-2 hover:border-violet/30 hover:shadow-soft transition-all">
                  <Sparkles className="h-4 w-4 text-violet" />
                  GPT-4o Analysis
                </div>
                <div className="px-5 py-2.5 rounded-full bg-white border border-luxe-border text-text-body flex items-center gap-2 hover:border-violet/30 hover:shadow-soft transition-all">
                  <Target className="h-4 w-4 text-violet" />
                  No Sugarcoating
                </div>
              </div>
            </div>
          </section>

          {/* Upload & Results Section */}
          <section className="container mx-auto px-6 lg:px-8 pb-20">
            <div className="mx-auto max-w-6xl space-y-12">
              <ResumeCheckerUpload 
                onAnalysisComplete={(data) => {
                  console.log('Resume analysis received:', data)
                  setAnalysisResult(data.analysis)
                }}
              />
              {analysisResult && <ResumeAnalysisResult result={analysisResult} />}
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  )
}
