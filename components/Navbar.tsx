'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Sparkles, User, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import AuthModal from './AuthModal'
import MagneticButton from './ui/MagneticButton'
import gsap from 'gsap'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (navRef.current) {
        gsap.fromTo(
          navRef.current,
          {
            y: -100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'all',
          }
        )
      }

      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          {
            scale: 0,
            rotation: -180,
          },
          {
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)',
            delay: 0.3,
            clearProps: 'all',
          }
        )
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [])

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const navLinks = [
    { href: '/analyze', label: 'Profile Optimizer' },
    { href: '/resume-checker', label: 'Resume Checker' },
    { href: '/prepare', label: 'Interview Prep' },
    { href: '/dsa', label: 'DSA Practice' },
  ]

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? 'border-b border-luxe-border bg-white/80 backdrop-blur-2xl shadow-soft-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative">
              <div
                ref={logoRef}
                className="relative flex h-11 w-11 items-center justify-center rounded-xl2 bg-gradient-to-br from-violet to-violet-light shadow-soft group-hover:shadow-violet-glow transition-all duration-300"
              >
                <Sparkles className="h-6 w-6 text-white" />
                <div className="absolute inset-0 rounded-xl2 bg-gradient-to-br from-violet-pale to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              </div>
              <span className="text-xl font-bold text-text-heading">
                Jobriel
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-text-body hover:text-violet transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet to-violet-light group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Auth & User Menu */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 rounded-full border border-luxe-border bg-white backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-text-heading hover:border-violet/30 hover:shadow-soft transition-all duration-300"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:block">{user.name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-3 w-64 rounded-large border border-luxe-border bg-white backdrop-blur-2xl py-2 shadow-soft-lg animate-slide-down">
                      <div className="px-4 py-3 text-sm text-text-body border-b border-luxe-border">
                        {user.email}
                      </div>
                      <button
                        onClick={() => {
                          logout()
                          setShowUserMenu(false)
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-text-body hover:bg-violet/5 hover:text-violet transition-all duration-200"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-3">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="rounded-full px-6 py-2.5 text-sm font-semibold text-text-body hover:text-violet transition-colors duration-300"
                  >
                    Sign in
                  </button>
                  <MagneticButton
                    onClick={() => handleAuthClick('signup')}
                    className="rounded-full bg-gradient-to-r from-violet to-violet-light px-7 py-3 text-sm font-bold text-white shadow-soft-md hover:shadow-soft-lg transition-all duration-300"
                  >
                    Get Started
                  </MagneticButton>
                </div>
              )}
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden rounded-xl p-2 text-text-body hover:text-violet hover:bg-violet/5 transition-all"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-luxe-border py-4 space-y-2 animate-slide-down">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-text-body hover:text-violet hover:bg-violet/5 rounded-xl transition-all"
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <div className="flex flex-col gap-2 px-4 pt-4 border-t border-luxe-border">
                  <button
                    onClick={() => {
                      handleAuthClick('login')
                      setMobileMenuOpen(false)
                    }}
                    className="rounded-xl px-6 py-3 text-sm font-semibold text-text-body hover:text-violet hover:bg-violet/5 transition-all"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => {
                      handleAuthClick('signup')
                      setMobileMenuOpen(false)
                    }}
                    className="rounded-xl bg-gradient-to-r from-violet to-violet-light px-6 py-3 text-sm font-bold text-white shadow-soft-md transition-all"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  )
}
