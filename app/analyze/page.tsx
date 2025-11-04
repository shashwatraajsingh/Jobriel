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
      <div className="min-h-screen bg-neutral-950 text-white overflow-hidden">
        {/* Premium Gradient Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-950/40 via-transparent to-transparent" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent-950/20 via-transparent to-transparent" />
        
        {/* Floating gradient orbs */}
        <div
          ref={floatingRef}
          className="fixed top-1/3 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
        />
        <div className="fixed bottom-1/4 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        
        <Navbar />
        
        <main className="relative z-10">
          {/* Hero Section */}
          <section ref={heroRef} className="container mx-auto px-6 lg:px-8 pt-32 pb-20">
            <div className="max-w-5xl mx-auto text-center">
              {/* Badge */}
              <div className="hero-item mb-8 inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/5 backdrop-blur-xl px-6 py-3 shadow-glow-sm">
                <TrendingUp className="h-4 w-4 text-primary-400" />
                <span className="text-sm font-semibold text-primary-300">AI-Powered Profile Analysis</span>
              </div>

              {/* Title */}
              <div className="hero-item mb-8">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
                  <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                    Profile Optimizer
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <div className="hero-item max-w-3xl mx-auto mb-12">
                <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed">
                  Get <span className="text-white font-medium">comprehensive LinkedIn profile analysis</span> with AI-powered insights and actionable recommendations
                </p>
              </div>

              {/* Features */}
              <div className="hero-item flex flex-wrap items-center justify-center gap-4 text-sm">
                <div className="px-5 py-2.5 rounded-full bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 text-neutral-300 flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-primary-400" />
                  LinkedIn Optimized
                </div>
                <div className="px-5 py-2.5 rounded-full bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 text-neutral-300 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary-400" />
                  GPT-4o Analysis
                </div>
                <div className="px-5 py-2.5 rounded-full bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 text-neutral-300 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary-400" />
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
