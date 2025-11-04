import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Smooth scroll reveal animation
export const revealOnScroll = (element: HTMLElement, options?: gsap.TweenVars) => {
  return gsap.from(element, {
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
}

// Staggered text reveal
export const staggerText = (elements: HTMLElement[], delay: number = 0.1) => {
  return gsap.from(elements, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: delay,
    ease: 'power3.out',
  })
}

// Magnetic button effect
export const magneticButton = (button: HTMLElement, strength: number = 0.5) => {
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
}

// Parallax effect
export const parallaxScroll = (element: HTMLElement, speed: number = 0.5) => {
  return gsap.to(element, {
    y: () => -window.scrollY * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

// Smooth entrance animation
export const smoothEnter = (elements: HTMLElement | HTMLElement[], options?: gsap.TweenVars) => {
  const targets = Array.isArray(elements) ? elements : [elements]
  
  return gsap.from(targets, {
    opacity: 0,
    y: 40,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out',
    ...options,
  })
}

// Scale on scroll
export const scaleOnScroll = (element: HTMLElement, fromScale: number = 0.8, toScale: number = 1) => {
  return gsap.fromTo(
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
}

// Rotate on scroll
export const rotateOnScroll = (element: HTMLElement, rotation: number = 360) => {
  return gsap.to(element, {
    rotation,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  })
}

// Fade slide animation
export const fadeSlide = (element: HTMLElement, direction: 'left' | 'right' | 'up' | 'down' = 'up') => {
  const directionMap = {
    left: { x: 100, y: 0 },
    right: { x: -100, y: 0 },
    up: { x: 0, y: 100 },
    down: { x: 0, y: -100 },
  }

  const { x, y } = directionMap[direction]

  return gsap.from(element, {
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
  })
}

// Clip path reveal
export const clipReveal = (element: HTMLElement) => {
  return gsap.fromTo(
    element,
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.5,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  )
}

// Hover scale effect
export const hoverScale = (element: HTMLElement, scale: number = 1.05) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale,
      duration: 0.3,
      ease: 'power2.out',
    })
  })

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
  })
}
