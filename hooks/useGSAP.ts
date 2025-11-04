'use client'

import { useEffect, useRef, MutableRefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Hook for smooth scroll reveal
export const useScrollReveal = (options?: gsap.TweenVars) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    gsap.from(element, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      ...options,
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [options])

  return ref
}

// Hook for staggered children animation
export const useStagger = (delay: number = 0.1) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const children = ref.current.children
    gsap.from(children, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: delay,
      ease: 'power3.out',
    })
  }, [delay])

  return ref
}

// Hook for magnetic button effect
export const useMagnetic = (strength: number = 0.5) => {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const button = ref.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return ref
}

// Hook for parallax effect
export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    gsap.to(element, {
      y: () => -window.scrollY * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [speed])

  return ref
}

// Hook for smooth entrance animation
export const useSmoothEnter = (options?: gsap.TweenVars) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.from(ref.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      ...options,
    })
  }, [options])

  return ref
}

// Hook for scale on scroll
export const useScaleOnScroll = (fromScale: number = 0.8, toScale: number = 1) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    gsap.fromTo(
      element,
      { scale: fromScale, opacity: 0 },
      {
        scale: toScale,
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [fromScale, toScale])

  return ref
}

// Hook for fade slide animation
export const useFadeSlide = (direction: 'left' | 'right' | 'up' | 'down' = 'up', options?: gsap.TweenVars) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const directionMap = {
      left: { x: 100, y: 0 },
      right: { x: -100, y: 0 },
      up: { x: 0, y: 100 },
      down: { x: 0, y: -100 },
    }

    const { x, y } = directionMap[direction]
    const element = ref.current

    gsap.from(element, {
      x,
      y,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      ...options,
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [direction, options])

  return ref
}

// Hook for hover scale effect
export const useHoverScale = (scale: number = 1.05) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [scale])

  return ref
}
