'use client'

import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import ResumeUpload from '@/components/ResumeUpload'
import LinkedInAnalysisResult from '@/components/LinkedInAnalysisResult'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Linkedin, Sparkles, TrendingUp } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AnalyzePage() {
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
          className="fixed top-1/3 left-0 w-96 h-96 bg-violet/8 rounded-full blur-3xl"
        />
        <div className="fixed bottom-1/4 right-0 w-96 h-96 bg-violet-light/10 rounded-full blur-3xl" />
        
        <Navbar />
        
        <main className="relative z-10">
          {/* Hero Section */}
          <section ref={heroRef} className="container mx-auto px-6 lg:px-8 pt-32 pb-20">
            <div className="max-w-5xl mx-auto text-center">
              {/* Badge */}
              <div className="hero-item mb-8 inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet-pale/40 backdrop-blur-sm px-6 py-3 shadow-soft">
                <TrendingUp className="h-4 w-4 text-violet" />
                <span className="text-sm font-semibold text-violet">AI-Powered Profile Analysis</span>
              </div>

              {/* Title */}
              <div className="hero-item mb-8">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
                  <span className="bg-gradient-to-r from-violet to-violet-light bg-clip-text text-transparent">
                    Profile Optimizer
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <div className="hero-item max-w-3xl mx-auto mb-12">
                <p className="text-xl md:text-2xl text-text-body leading-relaxed">
                  Get <span className="text-text-heading font-medium">comprehensive LinkedIn profile analysis</span> with AI-powered insights and actionable recommendations
                </p>
              </div>

              {/* Features */}
              <div className="hero-item flex flex-wrap items-center justify-center gap-4 text-sm">
                <div className="px-5 py-2.5 rounded-full bg-white border border-luxe-border text-text-body flex items-center gap-2 hover:border-violet/30 hover:shadow-soft transition-all">
                  <Linkedin className="h-4 w-4 text-violet" />
                  LinkedIn Optimized
                </div>
                <div className="px-5 py-2.5 rounded-full bg-white border border-luxe-border text-text-body flex items-center gap-2 hover:border-violet/30 hover:shadow-soft transition-all">
                  <Sparkles className="h-4 w-4 text-violet" />
                  GPT-4o Analysis
                </div>
                <div className="px-5 py-2.5 rounded-full bg-white border border-luxe-border text-text-body flex items-center gap-2 hover:border-violet/30 hover:shadow-soft transition-all">
                  <TrendingUp className="h-4 w-4 text-violet" />
                  Real-time Feedback
                </div>
              </div>
            </div>
          </section>

          {/* Upload & Results Section */}
          <section className="container mx-auto px-6 lg:px-8 pb-20">
            <div className="mx-auto max-w-6xl space-y-12">
              <ResumeUpload 
                onAnalysisComplete={(data) => {
                  console.log('Analysis data received:', data)
                  setAnalysisResult(data.analysis)
                }}
              />
              {analysisResult && <LinkedInAnalysisResult result={analysisResult} />}
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  )
}
