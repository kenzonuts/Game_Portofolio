import { cn } from "@/lib/utils"

interface StatusBarProps {
  label: string
  value: number
  maxValue?: number
  color?: "cyan" | "pink" | "yellow"
  className?: string
}

export function StatusBar({ label, value, maxValue = 100, color = "cyan", className }: StatusBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100)
  const isCritical = percentage < 20

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between text-xs font-[family-name:var(--font-gaming)]">
        <span className={cn("text-muted-foreground", isCritical && "text-destructive animate-pulse")}>
          {label} {isCritical && "!!"}
        </span>
        <div className="flex gap-2">
          <span className="text-muted-foreground/60">{percentage}%</span>
          <span
            className={cn({
              "text-primary": color === "cyan",
              "text-secondary": color === "pink",
              "text-accent": color === "yellow",
              "text-destructive animate-pulse": isCritical,
            })}
          >
            {value}/{maxValue}
          </span>
        </div>
      </div>
      <div
        className={cn(
          "h-4 bg-muted border border-border pixel-corners overflow-hidden",
          isCritical && "border-destructive",
        )}
      >
        <div
          className={cn("h-full transition-all duration-500 relative overflow-hidden", {
            "bg-primary": color === "cyan",
            "bg-secondary": color === "pink",
            "bg-accent": color === "yellow",
            "bg-destructive": isCritical,
          })}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  )
}
