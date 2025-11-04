'use client'

import { useRef, useEffect, ReactNode } from 'react'
import gsap from 'gsap'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  disabled?: boolean
}

export default function MagneticButton({ 
  children, 
  className = '', 
  strength = 0.4,
  onClick,
  disabled = false
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const magneticRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!buttonRef.current || !magneticRef.current || disabled) return

    const button = buttonRef.current
    const magnetic = magneticRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(magnetic, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out',
      })

      gsap.to(button, {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(magnetic, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      })

      gsap.to(button, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength, disabled])

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span ref={magneticRef} className="relative inline-block">
        {children}
      </span>
    </button>
  )
}
