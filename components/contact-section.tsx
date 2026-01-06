import { ArcadeHeading } from "@/components/arcade-heading"
import { GameCard } from "@/components/game-card"
import { Github, Instagram, Mail, XIcon } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-12 sm:py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 sm:mb-12">
          <ArcadeHeading level={2} glow="pink" className="mb-2 sm:mb-4">
            CONNECT
          </ArcadeHeading>
          <p className="text-muted-foreground text-base sm:text-lg">Ready to start a new co-op session?</p>
        </div>

        <GameCard glow="cyan" className="max-w-2xl mx-auto p-4 sm:p-6">
          <div className="space-y-6 sm:space-y-8">
            <p className="text-center text-sm sm:text-base text-muted-foreground leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              Let's team up and create something amazing together!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <a
                href="mailto:Yudhothepublic@gmail.com"
                className="flex items-center gap-3 p-3 sm:p-4 bg-background border border-border pixel-corners hover:border-primary transition-all group overflow-hidden"
              >
                <Mail className="w-5 h-5 flex-shrink-0 text-primary group-hover:text-glow-cyan" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-xs text-muted-foreground">EMAIL</div>
                  <div className="text-xs sm:text-sm font-[family-name:var(--font-gaming)] truncate">
                    Yudhothepublic@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://github.com/kenzonuts"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 sm:p-4 bg-background border border-border pixel-corners hover:border-primary transition-all group overflow-hidden"
              >
                <Github className="w-5 h-5 flex-shrink-0 text-primary group-hover:text-glow-cyan" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-xs text-muted-foreground">GITHUB</div>
                  <div className="text-xs sm:text-sm font-[family-name:var(--font-gaming)] truncate">@kenzonuts</div>
                </div>
              </a>

              <a
                href="https://www.instagram.com/yudho_oo/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 sm:p-4 bg-background border border-border pixel-corners hover:border-primary transition-all group overflow-hidden"
              >
                <Instagram className="w-5 h-5 flex-shrink-0 text-primary group-hover:text-glow-cyan" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-xs text-muted-foreground">INSTAGRAM</div>
                  <div className="text-xs sm:text-sm font-[family-name:var(--font-gaming)] truncate">@yudho_oo</div>
                </div>
              </a>

              <a
                href="https://x.com/yudho_oo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 sm:p-4 bg-background border border-border pixel-corners hover:border-primary transition-all group overflow-hidden"
              >
                <XIcon className="w-5 h-5 flex-shrink-0 text-primary group-hover:text-glow-cyan" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-xs text-muted-foreground">X (TWITTER)</div>
                  <div className="text-xs sm:text-sm font-[family-name:var(--font-gaming)] truncate">@yudho_oo</div>
                </div>
              </a>
            </div>
          </div>
        </GameCard>

        <div className="text-center mt-12">
          <p className="text-xs font-[family-name:var(--font-gaming)] text-muted-foreground">
            © 2026 DEVELOPER PORTFOLIO. PRESS START TO CONTINUE.
          </p>
        </div>
      </div>
    </section>
  )
}
