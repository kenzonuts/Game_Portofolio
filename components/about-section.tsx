import { ArcadeHeading } from "@/components/arcade-heading"
import { GameCard } from "@/components/game-card"
import { SkillIndicator } from "@/components/skill-indicator"

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <ArcadeHeading level={2} glow="cyan" className="mb-4">
            CHARACTER INFO
          </ArcadeHeading>
          <p className="text-muted-foreground text-lg">Stats and abilities unlocked through countless coding battles</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <GameCard glow="cyan">
            <div className="space-y-6">
              <div>
                <h3 className="font-[family-name:var(--font-gaming)] text-primary text-sm mb-4">ABOUT PLAYER</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I’m a web developer focused on Web3, working on decentralized applications, smart contracts, and web
                  interfaces that interact with blockchain systems. I’m also a co-founder of Block Alpha Insaider, where
                  I’m involved in building and growing Web3-focused initiatives.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Outside of coding, I spend time exploring new Web3 technologies, contributing to open-source projects,
                  and learning about different blockchain ecosystems.
                </p>
              </div>
            </div>
          </GameCard>

          <GameCard glow="pink">
            <div className="space-y-6">
              <div>
                <h3 className="font-[family-name:var(--font-gaming)] text-secondary text-sm mb-4">SKILL TREE</h3>
                <div className="space-y-4">
                  <SkillIndicator label="MOVE SMART CONTRACT" value={80} color="cyan" />
                  <SkillIndicator label="FRONTEND (JS/TS)" value={85} color="pink" />
                  <SkillIndicator label="NESTJS BACKEND" value={65} color="yellow" />
                  <SkillIndicator label="C# BACKEND" value={90} color="cyan" />
                </div>
              </div>
            </div>
          </GameCard>
        </div>
      </div>
    </section>
  )
}
