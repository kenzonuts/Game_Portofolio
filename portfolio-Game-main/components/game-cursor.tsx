"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function GameCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      const target = e.target as HTMLElement
      setIsPointer(window.getComputedStyle(target).cursor === "pointer")
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 z-[9999] pointer-events-none mix-blend-difference hidden md:block"
      animate={{
        x: mousePos.x - 12,
        y: mousePos.y - 12,
        rotate: isPointer ? 135 : 0,
        scale: isPointer ? 1.8 : 1,
      }}
      transition={{ type: "spring", damping: 15, stiffness: 300, mass: 0.4 }}
    >
      <div className="w-full h-full border-2 border-primary relative flex items-center justify-center">
        <div className="absolute w-full h-0.5 bg-primary/40" />
        <div className="absolute h-full w-0.5 bg-primary/40" />
        <div className="w-1.5 h-1.5 bg-primary box-glow-cyan shadow-[0_0_10px_#00f2ff]" />
      </div>
    </motion.div>
  )
}
