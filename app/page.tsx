import Hero from "@/components/home/Hero"
import Grid from "@/components/home/grid/Grid"
import RecentProjects from '@/components/home/RecentProjects'

export default function Home() {
  return (
    <main className="relative flex flex-col overflow-hidden w-full px-1">
      <div className="mt-20">
        <Hero />
        <Grid />
        <RecentProjects />
      </div>
    </main>
  )
}
