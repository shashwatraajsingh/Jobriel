'use client'

import { useRef, useEffect, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

export default function AnimatedCard({ 
  children, 
  className = '',
  delay = 0,
  hover = true
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const card = cardRef.current

    // Initial reveal animation with proper cleanup
    const animation = gsap.fromTo(
      card,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        clearProps: 'all', // Clear inline styles after animation
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Hover effect
    if (hover) {
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          duration: 0.4,
          ease: 'power2.out',
        })
      }

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        })
      }

      card.addEventListener('mouseenter', handleMouseEnter)
      card.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter)
        card.removeEventListener('mouseleave', handleMouseLeave)
        animation.kill()
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }

    return () => {
      animation.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [delay, hover])

  return (
    <div ref={cardRef} className={`transform-gpu ${className}`}>
      {children}
    </div>
  )
}
