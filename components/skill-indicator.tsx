import { cn } from "@/lib/utils"

interface SkillIndicatorProps {
  label: string
  value: number
  maxValue?: number
  color?: "cyan" | "pink" | "yellow"
  className?: string
}

export function SkillIndicator({ label, value, maxValue = 100, color = "cyan", className }: SkillIndicatorProps) {
  const percentage = Math.min((value / maxValue) * 100, 100)
  const stars = Math.round((percentage / 100) * 5) // Convert to 5-star rating
  const isCritical = percentage < 20

  const starColorClasses = {
    cyan: "text-primary",
    pink: "text-secondary",
    yellow: "text-accent",
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-xs font-[family-name:var(--font-gaming)]">
        <span className={cn("text-muted-foreground", isCritical && "text-destructive animate-pulse")}>
          {label} {isCritical && "!!"}
        </span>
        <div className="flex gap-2 items-center">
          <span
            className={cn({
              "text-primary": color === "cyan" && !isCritical,
              "text-secondary": color === "pink" && !isCritical,
              "text-accent": color === "yellow" && !isCritical,
              "text-destructive animate-pulse": isCritical,
            })}
          >
            {percentage}%
          </span>
        </div>
      </div>
      
      {/* Star Rating Display */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => {
          const isFilled = index < stars
          return (
            <span
              key={index}
              className={cn(
                "text-2xl transition-all duration-300",
                isFilled
                  ? {
                      [starColorClasses[color]]: !isCritical,
                      "text-destructive": isCritical,
                    }
                  : "text-muted-foreground/30"
              )}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              ★
            </span>
          )
        })}
      </div>
      
      {/* Pixel grid indicator as alternative visual */}
      <div className="flex gap-1">
        {Array.from({ length: 10 }).map((_, index) => {
          const isFilled = index < Math.round((percentage / 100) * 10)
          return (
            <div
              key={index}
              className={cn(
                "w-6 h-6 border-2 border-border transition-all duration-300",
                isFilled
                  ? {
                      "bg-primary border-primary": color === "cyan" && !isCritical,
                      "bg-secondary border-secondary": color === "pink" && !isCritical,
                      "bg-accent border-accent": color === "yellow" && !isCritical,
                      "bg-destructive border-destructive": isCritical,
                    }
                  : "bg-muted/30 border-muted"
              )}
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

