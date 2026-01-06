import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GameCardProps {
  children: ReactNode
  className?: string
  glow?: "cyan" | "pink" | "none"
}

export function GameCard({ children, className, glow = "none" }: GameCardProps) {
  return (
    <div
      className={cn(
        "relative bg-card border-2 border-border p-6 pixel-corners overflow-hidden",
        {
          "box-glow-cyan": glow === "cyan",
          "box-glow-pink": glow === "pink",
        },
        className,
      )}
    >
      <div className="scanline" />
      {children}
    </div>
  )
}
