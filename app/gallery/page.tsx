import { Navigation } from "@/components/navigation"
import { ActivityGallery } from "@/components/activity-gallery"

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <ActivityGallery />
      </div>
    </main>
  )
}
