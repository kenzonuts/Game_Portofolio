"use client"

import { useState, useEffect } from "react"
import { ArcadeHeading } from "@/components/arcade-heading"
import { GameCard } from "@/components/game-card"
import { PixelButton } from "@/components/pixel-button"
import { PixelBadge } from "@/components/pixel-badge"
import { Sword, Zap, ChevronLeft, ChevronRight, Target, Cpu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const projects = [
  {
    id: 1,
    title: "Warehouse Management System",
    boss: "Inventory Overlord",
    icon: <Target className="w-12 h-12" />,
    description: "Orchestrate real-time inventory flow and defeat supply chain bottlenecks.",
    tags: ["C#", "Swagger", "SQL Server"],
    hp: 1200,
    maxHp: 1200,
    github: "https://github.com/kenzonuts/Warehouse-Management-System",
    demo: "#",
    color: "cyan",
    attacks: [
      { name: "SQL Query Slash", power: 150, type: "speed" },
      { name: "Backend Logic Smash", power: 250, type: "strength" },
      { name: "API Endpoint Burst", power: 200, type: "magic" },
    ],
  },
  {
    id: 2,
    title: "TaskManager",
    boss: "Deadline Daemon",
    icon: <Cpu className="w-12 h-12" />,
    description: "Crush the productivity blocks with an efficient task orchestration engine.",
    tags: ["TypeScript", "C#", "SQL Server"],
    hp: 800,
    maxHp: 800,
    github: "https://github.com/kenzonuts/TaskManager",
    demo: "#",
    color: "pink",
    attacks: [
      { name: "Async Pierce", power: 120, type: "speed" },
      { name: "Schema Purge", power: 180, type: "strength" },
      { name: "Typed Flare", power: 150, type: "magic" },
    ],
  },
  {
    id: 3,
    title: "Umkm_Alumunium",
    boss: "Production Titan",
    icon: <Zap className="w-12 h-12" />,
    description: "Forge a digital storefront for local aluminum crafts with sleek performance.",
    tags: ["TypeScript", "CSS"],
    hp: 1500,
    maxHp: 1500,
    github: "https://github.com/kenzonuts/Umkm_Alumunium",
    demo: "https://gesphengalumunium.vercel.app/",
    color: "yellow",
    attacks: [
      { name: "Style Strike", power: 100, type: "speed" },
      { name: "Render Slam", power: 300, type: "strength" },
      { name: "State Pulse", power: 250, type: "magic" },
    ],
  },
  {
    id: 4,
    title: "Gesture Scroll",
    boss: "Motion Guardian",
    icon: <Zap className="w-12 h-12" />,
    description: "Control scrolling using real-time hand gesture recognition via camera input.",
    tags: ["Python"],
    hp: 950,
    maxHp: 950,
    github: "#",
    demo: "#",
    color: "cyan",
    attacks: [
      { name: "Gesture Detect", power: 140, type: "speed" },
      { name: "Computer Vision Crash", power: 220, type: "strength" },
      { name: "AI Neural Burst", power: 180, type: "magic" },
    ],
  },
]

export function ProjectGame() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [bossHp, setBossHp] = useState(projects[0].hp)
  const [playerHp, setPlayerHp] = useState(100)
  const [isAttacking, setIsAttacking] = useState(false)
  const [battleLog, setBattleLog] = useState<string[]>(["Battle started! Select your move."])
  const [battleOutcome, setBattleOutcome] = useState<"win" | "lose" | null>(null)
  const [damageNumbers, setDamageNumbers] = useState<{ id: number; value: number; x: number; y: number }[]>([])
  const [isShaking, setIsShaking] = useState(false)

  const currentProject = projects[currentIndex]

  // Function to trigger achievements
  const triggerAchievement = (title: string, description: string) => {
    window.dispatchEvent(
      new CustomEvent("achievement-unlocked", {
        detail: { id: Date.now().toString(), title, description },
      }),
    )
  }

  useEffect(() => {
    setBossHp(currentProject.hp)
    setPlayerHp(100)
    setBattleLog([`Boss detected: ${currentProject.boss}! Ready your tools.`])
    setBattleOutcome(null)
  }, [currentIndex, currentProject.hp, currentProject.boss])

  const playSound = (type: "attack" | "hit" | "win") => {
    const urls = {
      attack: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
      hit: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
      win: "https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3",
    }
    const audio = new Audio(urls[type])
    audio.volume = 0.1
    audio.play().catch(() => {})
  }

  const handleAttack = (power: number, name: string) => {
    if (isAttacking || battleOutcome) return

    setIsAttacking(true)
    playSound("attack")

    // Player attacks boss
    setTimeout(() => {
      const damage = Math.floor(power * (0.8 + Math.random() * 0.4))

      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 300)

      setDamageNumbers((prev) => [
        ...prev,
        {
          id: Date.now(),
          value: damage,
          x: Math.random() * 100 - 50,
          y: Math.random() * -50 - 50,
        },
      ])
      setTimeout(() => setDamageNumbers((prev) => prev.filter((d) => d.id !== Date.now())), 1000)

      setBossHp((prev) => Math.max(0, prev - damage))
      setBattleLog((prev) => [`You used ${name} for ${damage} DMG!`, ...prev].slice(0, 4))
      playSound("hit")

      if (bossHp - damage <= 0) {
        setBattleOutcome("win")
        playSound("win")
        setIsAttacking(false)
        // Trigger achievement on win
        triggerAchievement("Boss Slayer", `You defeated ${currentProject.boss}!`)
        return
      }

      // Boss counter-attacks
      setTimeout(() => {
        const bossDamage = Math.floor(Math.random() * 15) + 5
        setPlayerHp((prev) => Math.max(0, prev - bossDamage))
        setBattleLog((prev) => [`${currentProject.boss} counters for ${bossDamage} DMG!`, ...prev].slice(0, 4))

        if (playerHp - bossDamage <= 0) {
          setBattleOutcome("lose")
        }
        setIsAttacking(false)
      }, 600)
    }, 500)
  }

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden bg-zinc-950">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Side Info Panel */}
          <div className="w-full lg:w-1/3 space-y-6 flex flex-col">
            <ArcadeHeading level={2} glow="cyan" className="text-left text-lg sm:text-2xl">
              Quest Log
            </ArcadeHeading>

            <GameCard glow="cyan" className="bg-black/60 backdrop-blur-md order-1">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-cyan-500">
                  <span>Current Mission</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)}
                      className="hover:text-white transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentIndex((prev) => (prev + 1) % projects.length)}
                      className="hover:text-white transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-[family-name:var(--font-gaming)]">{currentProject.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{currentProject.description}</p>
                <div className="flex flex-wrap gap-2">
                  {currentProject.tags.map((tag) => (
                    <PixelBadge key={tag}>{tag}</PixelBadge>
                  ))}
                </div>
                <div className="pt-4 flex gap-4">
                  <a href={currentProject.github} className="flex-1">
                    <PixelButton variant="primary" className="w-full text-[10px] sm:text-xs">
                      SOURCE
                    </PixelButton>
                  </a>
                  <a href={currentProject.demo} className="flex-1">
                    <PixelButton variant="accent" className="w-full text-[10px] sm:text-xs">
                      DEMO
                    </PixelButton>
                  </a>
                </div>
              </div>
            </GameCard>

            <div className="space-y-2 order-3 lg:order-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Battle History</span>
              <div className="bg-black/80 border-2 border-zinc-800 p-4 font-mono text-xs space-y-2 h-32 overflow-hidden pixel-corners">
                {battleLog.map((log, i) => (
                  <div key={i} className={i === 0 ? "text-cyan-400" : "text-zinc-500"}>
                    {">"} {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Battle Stage */}
          <div className="w-full lg:w-2/3 order-2 lg:order-2">
            <GameCard
              glow={currentProject.color as any}
              className="aspect-square sm:aspect-video relative p-0 overflow-hidden border-2 sm:border-4"
            >
              <div className="absolute inset-0 bg-[url('/pixel-art-dungeon-background.jpg')] bg-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none animate-pulse" />

              {/* Battle HUD Top */}
              <div className="absolute top-0 left-0 w-full p-2 sm:p-6 flex justify-between items-start z-20">
                <div className="w-24 sm:w-48 space-y-1">
                  <div className="text-[7px] sm:text-[10px] font-bold text-white uppercase tracking-widest">
                    Player HP
                  </div>
                  <div className="h-2 sm:h-4 bg-zinc-900 border border-white sm:border-2 pixel-corners overflow-hidden shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                    <motion.div
                      className="h-full bg-green-500"
                      initial={{ width: "100%" }}
                      animate={{ width: `${playerHp}%` }}
                    />
                  </div>
                </div>

                <div className="w-24 sm:w-48 space-y-1 text-right">
                  <div className="text-[7px] sm:text-[10px] font-bold text-accent uppercase tracking-widest">
                    {currentProject.boss} HP
                  </div>
                  <div className="h-2 sm:h-4 bg-zinc-900 border border-accent sm:border-2 pixel-corners overflow-hidden shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                    <motion.div
                      className="h-full bg-red-500"
                      initial={{ width: "100%" }}
                      animate={{ width: `${(bossHp / currentProject.maxHp) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Character Sprites */}
              <motion.div
                animate={isShaking ? { x: [-5, 5, -5, 5, 0] } : {}}
                className="absolute inset-0 flex items-center justify-around px-2 sm:px-12 pb-16 sm:pb-12 z-10"
              >
                {/* Player Sprite placeholder */}
                <motion.div
                  animate={isAttacking ? { x: [0, 80, 0], scale: [1, 1.2, 1] } : { y: [0, -10, 0] }}
                  transition={
                    isAttacking
                      ? { duration: 0.5, ease: "easeInOut" }
                      : { repeat: Number.POSITIVE_INFINITY, duration: 2 }
                  }
                  className="w-12 h-12 sm:w-24 sm:h-24 bg-cyan-500/20 border-2 sm:border-4 border-cyan-500 flex items-center justify-center relative shadow-[0_0_20px_rgba(6,182,212,0.5)] pixel-corners"
                >
                  <Sword className="w-6 h-6 sm:w-12 sm:h-12 text-cyan-500" />
                  <div className="absolute -bottom-4 bg-black/80 px-1 text-[7px] sm:text-[10px] border border-cyan-500 whitespace-nowrap">
                    WEB_DEV
                  </div>
                </motion.div>

                {/* Boss Sprite placeholder */}
                <motion.div
                  key={currentIndex}
                  animate={{
                    y: [0, -15, 0],
                    scale: bossHp === 0 ? 0 : 1,
                    filter: isAttacking ? ["brightness(1)", "brightness(3)", "brightness(1)"] : "brightness(1)",
                  }}
                  transition={{
                    y: { repeat: Number.POSITIVE_INFINITY, duration: 3 },
                    scale: { duration: 0.5 },
                  }}
                  className={`w-16 h-16 sm:w-32 sm:h-32 bg-${currentProject.color}-500/20 border-2 sm:border-4 border-${currentProject.color}-500 flex items-center justify-center relative shadow-[0_0_30px_rgba(0,0,0,0.5)] pixel-corners overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-[length:4px_4px]" />
                  <div className={`text-${currentProject.color}-500`}>{currentProject.icon}</div>
                  <div
                    className={`absolute -bottom-4 bg-black/80 px-1 text-[7px] sm:text-[10px] border border-${currentProject.color}-500 whitespace-nowrap`}
                  >
                    {currentProject.boss}
                  </div>
                </motion.div>
              </motion.div>

              {/* Damage Numbers */}
              {damageNumbers.map((damage) => (
                <motion.div
                  key={damage.id}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: damage.y, opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute text-lg font-bold text-white"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) translate(${damage.x}px, ${damage.y}px)`,
                  }}
                >
                  {damage.value}
                </motion.div>
              ))}

              {/* Outcome Overlay */}
              <AnimatePresence>
                {battleOutcome && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-center items-center justify-center p-8 text-center"
                  >
                    <div className="space-y-6">
                      <ArcadeHeading
                        level={2}
                        glow={battleOutcome === "win" ? "cyan" : "pink"}
                        className="text-lg sm:text-2xl"
                      >
                        {battleOutcome === "win" ? "VICTORY!" : "GAME OVER"}
                      </ArcadeHeading>
                      <p className="font-mono text-[10px] sm:text-sm text-zinc-400">
                        {battleOutcome === "win"
                          ? `You defeated the ${currentProject.boss} and successfully deployed ${currentProject.title}!`
                          : "Your code failed to compile. Rebuild your stack and try again."}
                      </p>
                      <PixelButton
                        onClick={() => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)}
                        variant="accent"
                        className="mx-auto"
                        onClickCapture={() => {
                          setBossHp(currentProject.hp)
                          setPlayerHp(100)
                          setBattleOutcome(null)
                        }}
                      >
                        RETRY BATTLE
                      </PixelButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Battle HUD Bottom / Controls */}
              <div className="absolute bottom-0 left-0 w-full p-2 sm:p-6 flex flex-wrap sm:flex-nowrap gap-2 z-20 bg-gradient-to-t from-black/90 to-transparent">
                {currentProject.attacks.map((attack) => (
                  <PixelButton
                    key={attack.name}
                    variant={attack.type === "speed" ? "primary" : attack.type === "strength" ? "secondary" : "accent"}
                    className="flex-1 min-w-[30%] sm:min-w-0 text-[7px] sm:text-[10px] h-9 sm:h-12 flex flex-col items-center justify-center gap-0 sm:gap-1 group px-1"
                    onClick={() => handleAttack(attack.power, attack.name)}
                    disabled={isAttacking || !!battleOutcome}
                  >
                    <span className="group-hover:animate-bounce truncate w-full text-center leading-tight">
                      {attack.name}
                    </span>
                    <span className="opacity-50 font-mono text-[5px] sm:text-[8px]">{attack.power} ATK</span>
                  </PixelButton>
                ))}
              </div>
            </GameCard>
          </div>
        </div>
      </div>
    </section>
  )
}
