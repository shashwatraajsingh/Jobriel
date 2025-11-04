"use client"

import { SmoothCursor } from "@/components/ui/SmoothCursor"

export function SmoothCursorDemo() {
  return (
    <>
      <span className="hidden md:block text-sm text-gray-500">Move your mouse around</span>
      <span className="block md:hidden text-sm text-gray-500">Tap anywhere to see the cursor</span>
    </>
  )
}