'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Linkedin, MessageSquare, ArrowRight, Sparkles, Zap, Shield, Star, FileText, Target, Award, Clock } from 'lucide-react'
import Navbar from '@/components/Navbar'
import MagneticButton from '@/components/ui/MagneticButton'
import AnimatedCard from '@/components/ui/AnimatedCard'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const floatingRef1 = useRef<HTMLDivElement>(null)
  const floatingRef2 = useRef<HTMLDivElement>(null)
  const floatingRef3 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Small delay to ensure DOM is ready
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
            clearProps: 'all', // Clear inline styles after animation
          }
        )
      }

      // Parallax floating elements
      const floatElements = [floatingRef1.current, floatingRef2.current, floatingRef3.current]
      floatElements.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: -30,
            duration: 3 + index,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        }
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const features = [
    {
      title: 'Profile Optimization',
      subtitle: 'but easy',
      description: 'Get comprehensive LinkedIn profile analysis with AI-powered insights. No complex setup, just paste your profile and get actionable recommendations instantly.',
      icon: Linkedin,
      link: '/analyze',
    },
    {
      title: 'Resume Checker',
      subtitle: 'AI-powered',
      description: 'Upload your resume and get brutal honest analysis with project suggestions, skills to learn, and certifications needed to optimize for your target role.',
      icon: FileText,
      link: '/resume-checker',
    },
    {
      title: 'Interview Ready',
      subtitle: 'really prepared',
      description: 'Practice with AI-powered interview coach. Get personalized roadmaps and role-specific questions to ace your next interview.',
      icon: MessageSquare,
      link: '/prepare',
    },
  ]

  const stats = [
    { value: '<5s', label: 'Analysis Time', sublabel: 'Lightning fast results', icon: Clock },
    { value: '95%', label: 'Success Rate', sublabel: 'Profile improvement', icon: Target },
    { value: '4.9★', label: 'User Rating', sublabel: 'Trusted by thousands', icon: Award },
  ]

  return (
    <div className="relative min-h-screen bg-luxe-bg text-text-heading overflow-hidden">
      {/* Luxe Mist Soft Background */}
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
      
      {/* Floating soft gradient orbs */}
      <div
        ref={floatingRef1}
        className="fixed top-1/4 -left-48 w-[500px] h-[500px] bg-violet/8 rounded-full blur-3xl"
      />
      <div
        ref={floatingRef2}
        className="fixed top-1/2 -right-48 w-[500px] h-[500px] bg-violet-light/10 rounded-full blur-3xl"
      />
      <div
        ref={floatingRef3}
        className="fixed bottom-1/4 left-1/2 w-96 h-96 bg-violet-pale/20 rounded-full blur-3xl"
      />
      
      <Navbar />

      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="container mx-auto px-6 lg:px-8 pt-40 pb-32">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <div className="hero-item mb-8 inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet-pale/40 backdrop-blur-sm px-6 py-3 shadow-soft">
              <Sparkles className="h-4 w-4 text-violet" />
              <span className="text-sm font-semibold text-violet">AI-Powered Career Acceleration</span>
            </div>

            {/* Headline */}
            <div className="hero-item mb-8">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none mb-6 text-text-heading">
                Say hello to
              </h1>
              <h2 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none bg-gradient-to-r from-violet to-violet-light bg-clip-text text-transparent">
                Career Growth
              </h2>
            </div>

            {/* Subheadline */}
            <div className="hero-item mx-auto mb-16 max-w-3xl">
              <p className="text-xl md:text-2xl text-text-body font-light leading-relaxed">
                Designed for speed and precision to deliver a powerful
                <br className="hidden md:block" />
                <span className="text-text-heading font-medium"> career acceleration experience</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-item flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link href="/analyze">
                <MagneticButton className="group relative px-10 py-4 bg-gradient-to-r from-violet to-violet-light text-white font-bold text-lg rounded-full overflow-hidden shadow-soft-lg hover:shadow-soft-xl transition-all">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </MagneticButton>
              </Link>
              <Link href="/prepare">
                <button className="px-10 py-4 border-2 border-violet/30 bg-white backdrop-blur-sm text-violet font-semibold text-lg rounded-full transition-all hover:bg-violet/5 hover:border-violet/50 hover:shadow-violet-glow">
                  Interview Prep
                </button>
              </Link>
            </div>

            {/* Feature Pills */}
            <div className="hero-item flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="px-5 py-2.5 rounded-full bg-white border border-luxe-border text-text-body flex items-center gap-2 hover:border-violet/30 hover:shadow-soft transition-all">
                <Zap className="h-4 w-4 text-violet" />
                Lightning Fast
              </div>
              <div className="px-5 py-2.5 rounded-full bg-white border border-luxe-border text-text-body flex items-center gap-2 hover:border-violet/30 hover:shadow-soft transition-all">
                <Shield className="h-4 w-4 text-violet" />
                100% Reliable
              </div>
              <div className="px-5 py-2.5 rounded-full bg-white border border-luxe-border text-text-body flex items-center gap-2 hover:border-violet/30 hover:shadow-soft transition-all">
                <Star className="h-4 w-4 text-violet" />
                AI-Powered
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-6 lg:px-8 py-32">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, i) => (
              <AnimatedCard key={i} delay={i * 0.15}>
                <Link href={feature.link} className="block group">
                  <div className="h-full p-8 lg:p-10 rounded-large bg-white border border-luxe-border hover:border-violet/30 hover:shadow-card-hover transition-all">
                    <div className="mb-6 h-16 w-16 rounded-xl2 bg-gradient-to-br from-violet to-violet-light flex items-center justify-center shadow-soft group-hover:shadow-violet-glow transition-all">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-4xl font-bold mb-2 text-text-heading">
                      {feature.title.split(' ')[0]}
                    </h3>
                    <p className="text-2xl text-text-body font-normal mb-4">
                      {feature.subtitle}
                    </p>
                    <p className="text-text-body leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-violet group-hover:text-violet-hover transition-colors">
                      <span className="text-sm font-semibold">Learn more</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-6 lg:px-8 py-32">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-text-heading">
              Built for{' '}
              <span className="bg-gradient-to-r from-violet to-violet-light bg-clip-text text-transparent">
                speed
              </span>
            </h2>
            <p className="text-xl text-text-body max-w-2xl mx-auto">
              Get comprehensive profile analysis and career insights in seconds, not hours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, i) => (
              <AnimatedCard key={i} delay={i * 0.1}>
                <div className="text-center p-10 rounded-large bg-white border border-luxe-border hover:border-violet/30 hover:shadow-card-hover transition-all">
                  <div className="flex justify-center mb-6">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-violet/20 to-violet-light/20 flex items-center justify-center">
                      <stat.icon className="h-7 w-7 text-violet" />
                    </div>
                  </div>
                  <div className="text-6xl font-bold bg-gradient-to-r from-violet to-violet-light bg-clip-text text-transparent mb-3">
                    {stat.value}
                  </div>
                  <div className="text-xl font-semibold text-text-heading mb-2">{stat.label}</div>
                  <div className="text-sm text-text-body">{stat.sublabel}</div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 lg:px-8 py-32">
          <AnimatedCard>
            <div className="max-w-5xl mx-auto text-center p-16 lg:p-24 rounded-large bg-gradient-to-br from-violet to-violet-light relative overflow-hidden shadow-soft-xl">
              <div className="absolute inset-0 bg-white/5" />
              <div className="absolute inset-0 bg-gradient-to-t from-violet/20 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white">
                  Ready to stand out?
                </h2>
                <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of professionals who've optimized their profiles and accelerated their careers
                </p>
                <Link href="/analyze">
                  <MagneticButton className="px-12 py-5 bg-white text-violet font-bold text-lg rounded-full shadow-soft-xl hover:shadow-violet-glow transition-all">
                    Start Optimizing Now
                  </MagneticButton>
                </Link>
              </div>
            </div>
          </AnimatedCard>
        </section>
      </main>
    </div>
  )
}
