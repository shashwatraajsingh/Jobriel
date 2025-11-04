"use client"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Search, Github, Star, User, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import AuthModal from "./AuthModal"

export default function Navbar() {
  const { user, logout } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 z-50 w-full border-b border-gray-800 bg-black/50 backdrop-blur-xl"
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">JobPrep AI</span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/analyze"
              className="text-sm font-semibold text-gray-300 transition-colors hover:text-white"
            >
              Profile Optimizer
            </Link>
            <Link
              href="/resume-checker"
              className="text-sm font-semibold text-gray-300 transition-colors hover:text-white"
            >
              Resume Checker
            </Link>
            <Link
              href="/prepare"
              className="text-sm font-semibold text-gray-300 transition-colors hover:text-white"
            >
              Interview Prep
            </Link>
            <Link
              href="/dsa"
              className="text-sm font-semibold text-gray-300 transition-colors hover:text-white"
            >
              DSA
            </Link>
            
            <div className="flex items-center gap-4 ml-4">
              
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800/50 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700/50 transition-all"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:block">{user.name}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-gray-700 bg-gray-900/95 backdrop-blur-xl py-2 shadow-2xl">
                      <div className="px-4 py-3 text-sm text-gray-400 border-b border-gray-800">
                        {user.email}
                      </div>
                      <button
                        onClick={() => {
                          logout()
                          setShowUserMenu(false)
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="rounded-full px-5 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black hover:shadow-lg hover:shadow-white/20 transition-all"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  )
}
