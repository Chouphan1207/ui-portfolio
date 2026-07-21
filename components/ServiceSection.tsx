import Image from "next/image"
import { DraggableCardBody, DraggableCardContainer } from "@/components/blog/DraggableCard"
import { blogItems } from "@/components/data"
import WavyBackground from "@/components/home/background/WavyBackground"

export default function HomeBlogSection() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center py-20">
      <DraggableCardContainer className="relative w-full h-150 flex items-center justify-center">
        <WavyBackground />
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
            <h3 className="mt-4 text-center text-2xl font-bold text-black">
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
    </div>
  )
}
