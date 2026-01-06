import type React from "react"
import { cn } from "@/lib/utils"

interface PixelBadgeProps {
  children: React.ReactNode
  variant?: "default" | "primary" | "secondary" | "accent"
  className?: string
}

export function PixelBadge({ children, variant = "default", className }: PixelBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-xs font-[family-name:var(--font-gaming)] pixel-corners",
        {
          "bg-muted text-muted-foreground border border-border": variant === "default",
          "bg-primary/20 text-primary border border-primary": variant === "primary",
          "bg-secondary/20 text-secondary border border-secondary": variant === "secondary",
          "bg-accent/20 text-accent border border-accent": variant === "accent",
        },
        className,
      )}
    >
      {children}
    </span>
  )
}
