'use client'

import { useRef, useEffect, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface RevealTextProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
  splitBy?: 'word' | 'char' | 'line'
}

export default function RevealText({ 
  children, 
  className = '',
  delay = 0,
  stagger = 0.03,
  splitBy = 'word'
}: RevealTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const element = textRef.current
    const text = element.textContent || ''
    
    // Split text based on type
    let parts: string[]
    if (splitBy === 'word') {
      parts = text.split(' ')
    } else if (splitBy === 'char') {
      parts = text.split('')
    } else {
      parts = text.split('\n')
    }

    // Clear and rebuild with spans
    element.innerHTML = parts
      .map((part, i) => `<span class="inline-block" style="opacity: 0; transform: translateY(20px);">${part}${splitBy === 'word' && i < parts.length - 1 ? '&nbsp;' : ''}</span>`)
      .join('')

    const spans = element.querySelectorAll('span')

    // Animate
    gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [delay, stagger, splitBy])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}
