"use client"

import { useState } from "react"
import { ArcadeHeading } from "@/components/arcade-heading"
import { GameCard } from "@/components/game-card"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { PixelButton } from "./pixel-button"
import BestFriendImage from "@/app/Image/BestFriend.jpeg"
import LiveCodingImage from "@/app/Image/LiveCoding.png"
import RewardBulutangkisImage from "@/app/Image/RewardBulutangkis.png"
import SetUpImage from "@/app/Image/SetUp.png"

const activities = [
  {
    id: 1,
    title: "BestFriend",
    image: BestFriendImage,
    description: "BestFriend",
    rarity: "RARE",
    color: "cyan",
  },
  {
    id: 2,
    title: "LiveCoding",
    image: LiveCodingImage,
    description: "LiveCoding",
    rarity: "EPIC",
    color: "pink",
  },
  {
    id: 3,
    title: "RewardBulutangkis",
    image: RewardBulutangkisImage,
    description: "RewardBulutangkis",
    rarity: "LEGENDARY",
    color: "yellow",
  },
  {
    id: 4,
    title: "SetUp",
    image: SetUpImage,
    description: "SetUp",
    rarity: "EPIC",
    color: "pink",
  },
]

export function ActivityGallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof activities)[0] | null>(null)
  const [unlockedIds, setUnlockedIds] = useState<number[]>([])
  const [isOpening, setIsOpening] = useState(false)

  const unlockRandom = () => {
    if (isOpening) return
    setIsOpening(true)

    // Simulate loot box opening
    setTimeout(() => {
      const locked = activities.filter((a) => !unlockedIds.includes(a.id))
      if (locked.length > 0) {
        const random = locked[Math.floor(Math.random() * locked.length)]
        setUnlockedIds([...unlockedIds, random.id])
        setSelectedImage(random)
      }
      setIsOpening(false)
    }, 1500)
  }

  return (
    <section id="gallery" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,255,0.1),transparent)] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <ArcadeHeading level={2} glow="pink" className="mb-4">
            COLLECTION VAULT
          </ArcadeHeading>
          <div className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground text-lg">Unlock rare memories from your dev journey</p>
            <PixelButton
              onClick={unlockRandom}
              disabled={isOpening || unlockedIds.length === activities.length}
            >
              {isOpening
                ? "OPENING..."
                : unlockedIds.length === activities.length
                  ? "COLLECTION COMPLETE"
                  : "OPEN LOOT BOX"}
            </PixelButton>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {activities.map((activity) => {
            const isUnlocked = unlockedIds.includes(activity.id)
            return (
              <motion.div
                key={activity.id}
                layoutId={`card-${activity.id}`}
                onClick={() => isUnlocked && setSelectedImage(activity)}
                className={`group relative aspect-[3/4] overflow-hidden pixel-corners border-2 sm:border-4 transition-all holographic-shine
                  ${
                    isUnlocked
                      ? `cursor-pointer hover:scale-[1.02] sm:hover:scale-105 bg-card border-${activity.color}-500 shadow-lg`
                      : "grayscale brightness-50 border-dashed border-muted-foreground bg-muted"
                  }`}
              >
                {isUnlocked ? (
                  <>
                    <Image
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-background/80 backdrop-blur-md pixel-corners border border-border">
                      <span className={`text-[8px] sm:text-[10px] font-bold text-${activity.color}-500`}>
                        {activity.rarity}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
                      <h3 className="font-[family-name:var(--font-gaming)] text-[10px] sm:text-xs text-primary truncate">
                        {activity.title}
                      </h3>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-pink-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-[family-name:var(--font-gaming)] text-2xl text-muted-foreground opacity-20">
                      ?
                    </span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, rotateY: 180 }}
                animate={{ scale: 1, rotateY: 0 }}
                exit={{ scale: 0.8, rotateY: 180 }}
                transition={{ type: "spring", damping: 15 }}
                className="max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <GameCard glow={selectedImage.color as any}>
                  <div className="relative aspect-[3/4] w-full mb-6 overflow-hidden pixel-corners border-4 border-primary/20">
                    <Image
                      src={selectedImage.image || "/placeholder.svg"}
                      alt={selectedImage.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-background/90 pixel-corners border-2 border-primary">
                      <span className={`text-xs font-bold text-${selectedImage.color}-500 animate-pulse`}>
                        {selectedImage.rarity}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4 text-center">
                    <ArcadeHeading level={3} glow={selectedImage.color as any}>
                      {selectedImage.title}
                    </ArcadeHeading>
                    <p className="text-muted-foreground leading-relaxed">{selectedImage.description}</p>
                    <PixelButton onClick={() => setSelectedImage(null)} className="w-full">
                      CLOSE DATA
                    </PixelButton>
                  </div>
                </GameCard>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
