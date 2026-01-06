import { Navigation } from "@/components/navigation"
import { ProjectGame } from "@/components/project-game"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <ProjectGame />
      </div>
    </main>
  )
}
