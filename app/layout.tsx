import type React from "react"
import type { Metadata } from "next"
import { Press_Start_2P, Space_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GameCursor } from "@/components/game-cursor"
import { CRTOverlay } from "@/components/crt-overlay"
import { AchievementToast } from "@/components/achievement-toast"
import { KonamiCode } from "@/components/konami-code" // Added KonamiCode to layout for global access
import "./globals.css"

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gaming",
})
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Kenzonuts - Web3 Developer Portfolio",
  description:
    "Web developer portfolio with a retro gaming theme - showcasing projects, skills, and adventures in code",
 

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceMono.className} ${pressStart.variable} antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground`}
      >
        <CRTOverlay />
        <GameCursor />
        <KonamiCode />
        <AchievementToast />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
