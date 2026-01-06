import { Navigation } from "@/components/navigation"
import { ContactSection } from "@/components/contact-section"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <ContactSection />
      </div>
    </main>
  )
}
