"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef } from "react"

export interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent"
}

const PixelButton = forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant = "primary", children, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3")
      audio.volume = 0.1
      audio.play().catch(() => {})
      if (onClick) onClick(e)
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          "relative px-6 py-3 font-[family-name:var(--font-gaming)] text-xs uppercase tracking-wider transition-all",
          "pixel-corners disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1",
          {
            "bg-primary text-primary-foreground box-glow-cyan hover:box-glow-cyan": variant === "primary",
            "bg-secondary text-secondary-foreground box-glow-pink hover:box-glow-pink": variant === "secondary",
            "bg-accent text-accent-foreground hover:brightness-110": variant === "accent",
          },
          className,
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pixel-corners" />
      </button>
    )
  },
)
PixelButton.displayName = "PixelButton"

export { PixelButton }
