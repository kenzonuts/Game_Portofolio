"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArcadeHeading } from "./arcade-heading"

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

export function KonamiCode() {
  const [input, setInput] = useState<string[]>([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = [...input, e.key].slice(-KONAMI_CODE.length)
      setInput(newInput)

      if (newInput.join(",") === KONAMI_CODE.join(",")) {
        setIsActive(true)
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3")
        audio.volume = 0.3
        audio.play().catch(() => {})

        document.body.classList.add("animate-shake")
        setTimeout(() => {
          setIsActive(false)
          document.body.classList.remove("animate-shake")
        }, 5000)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [input])

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/20 backdrop-blur-md pointer-events-none"
        >
          <div className="text-center p-12 bg-black border-4 border-primary pixel-corners box-glow-cyan">
            <ArcadeHeading level={1} glow="cyan" className="mb-4">
              GOD MODE ENABLED
            </ArcadeHeading>
            <p className="text-primary font-mono animate-pulse">UNLIMITED PROJECTS UNLOCKED</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
