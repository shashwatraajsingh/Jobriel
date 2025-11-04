"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function SmoothCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Check if we're on desktop
    const isDesktop = window.innerWidth >= 769
    if (!isDesktop) return

    setIsMounted(true)
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    // Initialize cursor position at center
    cursorX.set(window.innerWidth / 2 - 16)
    cursorY.set(window.innerHeight / 2 - 16)
    
    document.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseover", handleMouseOver)

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [cursorX, cursorY])

  // Don't render on mobile or before mounting
  if (!isMounted || typeof window !== 'undefined' && window.innerWidth < 769) {
    return null
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full border-2 border-black bg-white"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          width: 32,
          height: 32,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          scale: { duration: 0.2, ease: "easeOut" },
        }}
      />
      
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full bg-black"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          width: 8,
          height: 8,
          x: 12,
          y: 12,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          scale: { duration: 0.2, ease: "easeOut" },
        }}
      />

      <style jsx global>{`
        @media (min-width: 769px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}