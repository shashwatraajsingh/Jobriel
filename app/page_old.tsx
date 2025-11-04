'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Linkedin, MessageSquare, ArrowRight, Sparkles, Zap, Shield, TrendingUp, Star, FileText, Target, Award, Clock } from 'lucide-react'
import Navbar from '@/components/Navbar'
import MagneticButton from '@/components/ui/MagneticButton'
import AnimatedCard from '@/components/ui/AnimatedCard'
import RevealText from '@/components/ui/RevealText'
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
    // Hero entrance animation
    if (heroRef.current) {
      gsap.from(heroRef.current.querySelectorAll('.hero-item'), {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
      })
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
  }, [])

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-950/40 via-transparent to-transparent" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent-950/20 via-transparent to-transparent" />
      
      {/* Floating gradient orbs */}
      <div
        ref={floatingRef1}
        className="fixed top-1/4 -left-48 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
      />
      <div
        ref={floatingRef2}
        className="fixed top-1/2 -right-48 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"
      />
      <div
        ref={floatingRef3}
        className="fixed bottom-1/4 left-1/2 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"
      />
      
      <Navbar />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-40 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800/50 px-5 py-2 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-gray-300">AI-Powered Career Platform</span>
            </motion.div>

            <h1 className="mb-8 text-7xl md:text-8xl font-bold tracking-tight leading-none">
              Say hello to
              <br />
              <span className="bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 bg-clip-text text-transparent">
                LinkedIn Optimizer
              </span>
            </h1>

            <p className="mx-auto mb-12 max-w-2xl text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              Designed for speed and precision to deliver a powerful
              <br className="hidden md:block" />
              <span className="text-white font-medium">career acceleration experience</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link href="/analyze">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-4 bg-white text-black font-semibold text-lg rounded-full overflow-hidden transition-all hover:shadow-2xl hover:shadow-white/20"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>
              <Link href="/prepare">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 border border-gray-700 text-white font-semibold text-lg rounded-full transition-all hover:bg-gray-800/50 hover:border-gray-600"
                >
                  Interview Prep
                </motion.button>
              </Link>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 text-gray-300">
                <Zap className="inline h-4 w-4 mr-2 text-green-400" />
                Lightning Fast
              </div>
              <div className="px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 text-gray-300">
                <Shield className="inline h-4 w-4 mr-2 text-emerald-400" />
                100% Reliable
              </div>
              <div className="px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 text-gray-300">
                <Star className="inline h-4 w-4 mr-2 text-green-400" />
                AI-Powered
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-32">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Profile Optimization",
                subtitle: "but easy",
                description: "Get comprehensive LinkedIn profile analysis with AI-powered insights. No complex setup, just paste your profile and get actionable recommendations instantly.",
                icon: Linkedin,
                link: "/analyze"
              },
              {
                title: "Resume Checker",
                subtitle: "AI-powered",
                description: "Upload your resume and get detailed analysis with project suggestions, skills to learn, and certifications needed to optimize for your target role.",
                icon: FileText,
                link: "/resume-checker"
              },
              {
                title: "Interview Ready",
                subtitle: "really prepared",
                description: "Practice with AI-powered interview coach. Get personalized roadmaps and role-specific questions to ace your next interview.",
                icon: MessageSquare,
                link: "/prepare"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-gray-600 transition-all backdrop-blur-sm">
                  <div className="mb-6 h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">
                    {feature.title.split(' ')[0]}
                    <br />
                    <span className="text-2xl text-gray-400 font-normal">
                      {feature.subtitle}
                    </span>
                  </h3>
                  <p className="text-gray-400 leading-relaxed mt-4">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Social Proof */}
        <section className="container mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Built for
              <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent"> speed</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get comprehensive profile analysis and career insights in seconds, not hours
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { value: "<5s", label: "Analysis Time", sublabel: "Lightning fast results" },
              { value: "95%", label: "Success Rate", sublabel: "Profile improvement" },
              { value: "4.9★", label: "User Rating", sublabel: "Trusted by thousands" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-3xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center p-16 rounded-[3rem] bg-gradient-to-br from-green-600 to-emerald-700 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Ready to stand out?
              </h2>
              <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
                Join thousands of professionals who've optimized their LinkedIn profiles and accelerated their careers
              </p>
              <Link href="/analyze">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-white text-black font-bold text-lg rounded-full hover:shadow-2xl transition-all"
                >
                  Start Optimizing Now
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}
