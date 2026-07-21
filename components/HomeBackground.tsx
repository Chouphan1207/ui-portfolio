import Image from "next/image"

export default function HomeBackground() {
  return (
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
  )
}
