"use client"

import { useEffect, useRef } from 'react'

interface LiquidEtherProps {
  colors?: string[]
  mouseForce?: number
  cursorSize?: number
  isViscous?: boolean
  viscous?: number
  iterationsViscous?: number
  iterationsPoisson?: number
  resolution?: number
  isBounce?: boolean
  autoDemo?: boolean
  autoSpeed?: number
  autoIntensity?: number
  takeoverDuration?: number
  autoResumeDelay?: number
  autoRampDuration?: number
  className?: string
}

export default function LiquidEther({
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  resolution = 0.5,
  isBounce = false,
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 3000,
  autoRampDuration = 0.6,
  className = '',
}: LiquidEtherProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })
  const autoRef = useRef({ 
    time: 0, 
    isActive: autoDemo,
    lastInteraction: 0,
    targetX: 0,
    targetY: 0
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * resolution
      canvas.height = rect.height * resolution
      ctx.scale(resolution, resolution)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Fluid simulation variables
    const width = Math.floor(canvas.width / 4)
    const height = Math.floor(canvas.height / 4)
    const size = width * height

    let velocityX = new Float32Array(size)
    let velocityY = new Float32Array(size)
    let pressure = new Float32Array(size)
    let divergence = new Float32Array(size)
    let density = new Float32Array(size * 3) // RGB channels

    // Initialize with some base density
    for (let i = 0; i < size; i++) {
      const x = i % width
      const y = Math.floor(i / width)
      const centerX = width / 2
      const centerY = height / 2
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
      const maxDistance = Math.min(width, height) / 4
      
      if (distance < maxDistance) {
        const intensity = 1 - (distance / maxDistance)
        density[i * 3] = intensity * 0.3     // R
        density[i * 3 + 1] = intensity * 0.2 // G  
        density[i * 3 + 2] = intensity * 0.4 // B
      }
    }

    const addForce = (x: number, y: number, forceX: number, forceY: number, radius: number) => {
      const gridX = Math.floor(x * width / canvas.width * resolution)
      const gridY = Math.floor(y * height / canvas.height * resolution)
      
      for (let i = -radius; i <= radius; i++) {
        for (let j = -radius; j <= radius; j++) {
          const px = gridX + i
          const py = gridY + j
          
          if (px >= 0 && px < width && py >= 0 && py < height) {
            const distance = Math.sqrt(i * i + j * j)
            if (distance <= radius) {
              const index = py * width + px
              const force = (1 - distance / radius) * 0.1
              
              velocityX[index] += forceX * force
              velocityY[index] += forceY * force
              
              // Add density
              const colorIndex = Math.floor(Math.random() * colors.length)
              const color = hexToRgb(colors[colorIndex])
              if (color) {
                density[index * 3] += color.r / 255 * force * 2
                density[index * 3 + 1] += color.g / 255 * force * 2
                density[index * 3 + 2] += color.b / 255 * force * 2
              }
            }
          }
        }
      }
    }

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null
    }

    const project = () => {
      // Calculate divergence
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const index = y * width + x
          divergence[index] = -0.5 * (
            velocityX[index + 1] - velocityX[index - 1] +
            velocityY[index + width] - velocityY[index - width]
          )
          pressure[index] = 0
        }
      }

      // Solve pressure
      for (let iter = 0; iter < iterationsPoisson; iter++) {
        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            const index = y * width + x
            pressure[index] = (divergence[index] + 
              pressure[index - 1] + pressure[index + 1] +
              pressure[index - width] + pressure[index + width]) / 4
          }
        }
      }

      // Subtract pressure gradient
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const index = y * width + x
          velocityX[index] -= 0.5 * (pressure[index + 1] - pressure[index - 1])
          velocityY[index] -= 0.5 * (pressure[index + width] - pressure[index - width])
        }
      }
    }

    const advect = (field: Float32Array, velocity: { x: Float32Array, y: Float32Array }, dt: number) => {
      const newField = new Float32Array(field.length)
      
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const index = y * width + x
          
          let prevX = x - dt * velocity.x[index]
          let prevY = y - dt * velocity.y[index]
          
          prevX = Math.max(0.5, Math.min(width - 1.5, prevX))
          prevY = Math.max(0.5, Math.min(height - 1.5, prevY))
          
          const x0 = Math.floor(prevX)
          const x1 = x0 + 1
          const y0 = Math.floor(prevY)
          const y1 = y0 + 1
          
          const s1 = prevX - x0
          const s0 = 1 - s1
          const t1 = prevY - y0
          const t0 = 1 - t1
          
          newField[index] = 
            s0 * (t0 * field[y0 * width + x0] + t1 * field[y1 * width + x0]) +
            s1 * (t0 * field[y0 * width + x1] + t1 * field[y1 * width + x1])
        }
      }
      
      field.set(newField)
    }

    const diffuse = (field: Float32Array, diff: number, dt: number) => {
      const a = dt * diff * width * height
      
      for (let iter = 0; iter < iterationsViscous; iter++) {
        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            const index = y * width + x
            field[index] = (field[index] + a * (
              field[index - 1] + field[index + 1] +
              field[index - width] + field[index + width]
            )) / (1 + 4 * a)
          }
        }
      }
    }

    const render = () => {
      const imageData = ctx.createImageData(canvas.width / resolution, canvas.height / resolution)
      const data = imageData.data
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = y * width + x
          const pixelIndex = (y * width + x) * 4
          
          data[pixelIndex] = Math.min(255, density[index * 3] * 255)     // R
          data[pixelIndex + 1] = Math.min(255, density[index * 3 + 1] * 255) // G
          data[pixelIndex + 2] = Math.min(255, density[index * 3 + 2] * 255) // B
          data[pixelIndex + 3] = Math.min(255, Math.max(
            density[index * 3], 
            density[index * 3 + 1], 
            density[index * 3 + 2]
          ) * 255) // A
        }
      }
      
      ctx.putImageData(imageData, 0, 0)
    }

    const animate = () => {
      const dt = 0.016 // 60fps

      // Auto demo
      if (autoRef.current.isActive) {
        autoRef.current.time += dt * autoSpeed
        
        const x = (Math.sin(autoRef.current.time) * 0.3 + 0.5) * canvas.width / resolution
        const y = (Math.cos(autoRef.current.time * 0.7) * 0.3 + 0.5) * canvas.height / resolution
        
        const forceX = Math.cos(autoRef.current.time * 2) * autoIntensity
        const forceY = Math.sin(autoRef.current.time * 1.5) * autoIntensity
        
        addForce(x, y, forceX, forceY, cursorSize / 8)
      }

      // Physics simulation
      if (isViscous) {
        diffuse(velocityX, viscous, dt)
        diffuse(velocityY, viscous, dt)
      }

      project()
      
      advect(velocityX, { x: velocityX, y: velocityY }, dt)
      advect(velocityY, { x: velocityX, y: velocityY }, dt)
      
      project()
      
      // Advect density
      for (let i = 0; i < 3; i++) {
        const channel = new Float32Array(size)
        for (let j = 0; j < size; j++) {
          channel[j] = density[j * 3 + i]
        }
        advect(channel, { x: velocityX, y: velocityY }, dt)
        for (let j = 0; j < size; j++) {
          density[j * 3 + i] = channel[j] * 0.995 // Fade out
        }
      }

      render()
      animationRef.current = requestAnimationFrame(animate)
    }

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const deltaX = x - mouseRef.current.x
      const deltaY = y - mouseRef.current.y
      
      mouseRef.current.x = x
      mouseRef.current.y = y
      
      if (mouseRef.current.isDown || Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
        addForce(x, y, deltaX * mouseForce, deltaY * mouseForce, cursorSize / 8)
        
        // Disable auto demo temporarily
        autoRef.current.isActive = false
        autoRef.current.lastInteraction = Date.now()
        
        setTimeout(() => {
          if (Date.now() - autoRef.current.lastInteraction >= autoResumeDelay) {
            autoRef.current.isActive = autoDemo
          }
        }, autoResumeDelay)
      }
    }

    const handleMouseDown = () => {
      mouseRef.current.isDown = true
    }

    const handleMouseUp = () => {
      mouseRef.current.isDown = false
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mouseup', handleMouseUp)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [colors, mouseForce, cursorSize, isViscous, viscous, iterationsViscous, iterationsPoisson, resolution, isBounce, autoDemo, autoSpeed, autoIntensity, takeoverDuration, autoResumeDelay, autoRampDuration])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ 
        width: '100%', 
        height: '100%',
        pointerEvents: 'auto'
      }}
    />
  )
}