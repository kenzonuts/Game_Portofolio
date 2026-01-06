"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
}

export function AchievementToast() {
  const [achievement, setAchievement] = useState<Achievement | null>(null)

  useEffect(() => {
    const handleAchievement = (e: any) => {
      setAchievement(e.detail)
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3")
      audio.volume = 0.2
      audio.play().catch(() => {})

      setTimeout(() => setAchievement(null), 5000)
    }

    window.addEventListener("achievement-unlocked", handleAchievement)
    return () => window.removeEventListener("achievement-unlocked", handleAchievement)
  }, [])

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] min-w-[300px]"
        >
          <div className="bg-zinc-900 border-2 border-yellow-500 p-4 pixel-corners shadow-[0_0_20px_rgba(234,179,8,0.3)] flex items-center gap-4">
            <div className="bg-yellow-500/20 p-2 border border-yellow-500">
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-yellow-500 tracking-widest">Achievement Unlocked!</p>
              <h4 className="text-sm font-[family-name:var(--font-gaming)] text-white">{achievement.title}</h4>
              <p className="text-[10px] text-zinc-400 font-mono mt-1">{achievement.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
