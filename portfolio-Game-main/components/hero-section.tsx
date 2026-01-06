"use client"

import { ArcadeHeading } from "@/components/arcade-heading"
import { PixelButton } from "@/components/pixel-button"
import { StatusBar } from "@/components/status-bar"
import { Github, Instagram, Mail, XIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ProfileImage from "@/app/Image/Profil.png"

const PROFILE_LEVELS = [
  {
    level: 77,
    title: "Fullstack Web3 Developer",
    image: ProfileImage,
    description: "",
    stats: { skills: 99, experience: 95, creativity: 99 },
  },
]

export function HeroSection() {
  const currentProfile = PROFILE_LEVELS[0]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Pixel grid background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, oklch(0.75 0.18 195) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.75 0.18 195) 1px, transparent 1px)
          `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Animated floating elements */}
      <div className="absolute top-20 left-10 text-primary text-6xl animate-bounce opacity-30">▲</div>
      <div
        className="absolute bottom-20 right-10 text-secondary text-6xl animate-bounce opacity-30"
        style={{ animationDelay: "0.5s" }}
      >
        ●
      </div>
      <div className="absolute top-1/3 right-20 text-accent text-6xl animate-pulse opacity-20">■</div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <div className="relative inline-block mb-4">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-75 blur-sm animate-pulse" />
          <div className="relative flex items-center gap-4">
            <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden border-4 border-white pixel-border bg-muted">
              <Image
                src={currentProfile.image || "/placeholder.svg"}
                alt={`Profile Level ${currentProfile.level}`}
                width={160}
                height={160}
                className="object-cover transition-transform hover:scale-110"
              />
            </div>
          </div>

          {/* Level Badge Overlay */}
          <div className="absolute -bottom-2 right-0 bg-accent text-accent-foreground px-2 py-1 font-[family-name:var(--font-gaming)] text-xs border-2 border-white shadow-lg z-20">
            LVL {currentProfile.level}
          </div>
        </div>

        {/* Game UI Header */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-primary text-2xl">♥</span>
            <span className="text-primary text-2xl">♥</span>
            <span className="text-primary text-2xl">♥</span>
          </div>
          <div className="text-muted-foreground font-[family-name:var(--font-gaming)] text-sm">
            LVL {currentProfile.level} (LEVEL MAX)
          </div>
        </div>

        {/* Main heading */}
        <div className="space-y-4">
          <div className="text-muted-foreground font-[family-name:var(--font-gaming)] text-[10px] md:text-sm tracking-widest glitch">
            &gt; [{currentProfile.title}]
          </div>
          <ArcadeHeading level={1} glow="cyan" className="mb-4 leading-tight">
            {currentProfile.title}
          </ArcadeHeading>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
            {currentProfile.description}
          </p>
        </div>

        {/* Status bars */}
        <div className="max-w-md mx-auto space-y-3 pt-8">
          <StatusBar label="SKILLS" value={currentProfile.stats.skills} color="cyan" />
          <StatusBar label="EXPERIENCE" value={currentProfile.stats.experience} color="pink" />
          <StatusBar label="CREATIVITY" value={currentProfile.stats.creativity} color="yellow" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
          <Link href="/projects">
            <PixelButton variant="primary">VIEW PROJECTS</PixelButton>
          </Link>
          <Link href="/contact">
            <PixelButton variant="secondary">CONTACT ME</PixelButton>
          </Link>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6 pt-8">
          <a
            href="https://github.com/kenzonuts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/yudho_oo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="https://x.com/yudho_oo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <XIcon className="w-6 h-6" />
          </a>
          <a
            href="mailto:Yudhothepublic@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>

        <Link href="/about" className="pt-12 animate-bounce block">
          <div className="text-primary text-2xl">▼</div>
          <p className="text-xs text-muted-foreground font-[family-name:var(--font-gaming)] mt-2">CLICK TO CONTINUE</p>
        </Link>
      </div>
    </section>
  )
}
