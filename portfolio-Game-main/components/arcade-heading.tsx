import type React from "react"
import { cn } from "@/lib/utils"
import type { JSX } from "react"

interface ArcadeHeadingProps {
  children: React.ReactNode
  level?: 1 | 2 | 3
  glow?: "cyan" | "pink" | "yellow" | "none"
  className?: string
}

export function ArcadeHeading({ children, level = 1, glow = "cyan", className }: ArcadeHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Tag
      className={cn(
        "font-[family-name:var(--font-gaming)] uppercase tracking-wider text-balance",
        {
          "text-xl sm:text-2xl md:text-4xl lg:text-5xl": level === 1,
          "text-lg sm:text-xl md:text-2xl lg:text-3xl": level === 2,
          "text-base sm:text-lg md:text-xl lg:text-2xl": level === 3,
          "text-glow-cyan text-primary": glow === "cyan",
          "text-glow-pink text-secondary": glow === "pink",
          "text-glow-yellow text-accent": glow === "yellow",
        },
        className,
      )}
    >
      {children}
    </Tag>
  )
}
