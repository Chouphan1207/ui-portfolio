import Image from "next/image"
import Hero from "@/components/home/Hero"
import Grid from "@/components/home/grid/Grid"
import RecentProjects from '@/components/home/RecentProjects'

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen overflow-x-hidden w-full px-1 bg-background">

      {/* 1. BACKGROUND CONTAINER LAYER */}
      <div className="absolute top-0 left-0 right-0 h-screen lg:h-screen pointer-events-none select-none z-0 overflow-hidden">
        <Image
          src="/hero-bg.jpeg"
          alt="Hero Background"
          fill
          priority
          quality={100}
          className="object-cover object-center scale-105"
        />

        {/* Ambient Dark Overlay Tint */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[5px] dark:bg-black/50 z-10" />

        {/* This overrides utility parsing bugs by pulling your exact theme variable natively */}
        <div
          className="absolute bottom-0 left-0 right-0 h-30 z-20 backdrop-blur-[3px]"
          style={{
            background: `linear-gradient(
              to top,
              var(--background) 0%,
              var(--background) 35%,
              rgba(11, 15, 25, 0.9) 65%,
              rgba(11, 15, 25, 0.4) 85%,
              transparent 100%
            )`
          }}
        />
      </div>

      {/* 2. FOREGROUND CONTENT LAYER */}
      <div className="relative z-30 w-full flex flex-col items-center mt-10">
        <div className="w-full max-w-7xl">
          <Hero />
        </div>
        <Grid />
        <RecentProjects />
      </div>

    </main>
  )
}
