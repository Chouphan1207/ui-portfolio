import Image from "next/image"
import Hero from "@/components/home/Hero"
import Grid from "@/components/home/grid/Grid"
import RecentProjects from "@/components/home/RecentProjects"
import { DraggableCardBody, DraggableCardContainer } from "@/components/blog/DraggableCard"
import { blogItems } from "@/components/data"

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen w-full bg-background overflow-x-hidden">

      {/* 1. BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <Image
          src="/hero-bg.JPEG"
          alt="Hero Background"
          fill
          priority
          quality={100}
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-background/40 md:bg-background/40 md:backdrop-blur-[5px] dark:bg-black/40 md:dark:bg-black/40" />
        </div>

      {/* 2. FOREGROUND CONTENT LAYER */}
      <div className="relative z-10 w-full flex flex-col items-center">

        {/* Header Section */}
        <section className="w-full max-w-7xl px-4 mt-10">
          <Hero />
          <Grid />
        </section>

        <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-20">
          <DraggableCardContainer className="relative w-full h-150 flex items-center justify-center">
            {blogItems.map((item, index) => (
              <DraggableCardBody key={index} className={item.className}>
                <div className="relative h-64 w-64 overflow-hidden rounded-lg shadow-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 text-center text-2xl font-bold text-card">
                  {item.title}
                </h3>
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
          <div
            className="absolute bottom-0 left-0 right-0 h-32"
            style={{
              background: "linear-gradient(to top, var(--background) 0%, transparent 100%)"
            }}
          />
        </section>

        {/* Projects Section */}
        <section className="w-full">

          <RecentProjects />
        </section>

      </div>
    </main>
  )
}
