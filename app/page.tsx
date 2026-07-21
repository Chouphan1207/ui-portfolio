import Hero from "@/components/home/Hero"
import Grid from "@/components/home/grid/Grid"
import RecentProjects from "@/components/sections/RecentProjects"
import ContactPage from "../components/sections/Contact"
import HomeBackground from "@/components/sections/HomeBackground"
import Footer from "@/components/sections/Footer"
import ServicesSection from "@/components/sections/ServiceSection"

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen w-full bg-background overflow-x-hidden">
      {/* 1. BACKGROUND LAYER */}
      <HomeBackground />

      {/* 2. FOREGROUND CONTENT LAYER */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <section id="hero" className="w-full max-w-7xl px-4 mt-6">
          <Hero />
          <Grid />
        </section>

        <section id="services" className="w-full">
          <ServicesSection />
        </section>

        <section id="projects" className="w-full">
          <RecentProjects />
        </section>
      </div>

      <section id="contact" className="w-full">
        <ContactPage />
      </section>
      <Footer />
    </main>
  )
}
