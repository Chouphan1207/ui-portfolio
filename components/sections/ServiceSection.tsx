import Image from "next/image"
import { blogItems } from "@/components/data"
import WavyBackground from "../background/WavyBackground"
import { DraggableCardBody, DraggableCardContainer } from "../services/DraggableCard"

export default function ServicesSection() {
  return (
    /* Thêm w-full để khối bao ngoài dàn đều toàn màn hình */
    <div className="relative w-full max-h-screen flex items-center justify-center py-20">

      {/* Đảm bảo DraggableCardContainer cũng có w-full và căn giữa các thẻ con */}
      <DraggableCardContainer className="relative w-full h-150 flex mt-5 items-center justify-center">
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

      {/* Hiệu ứng chuyển màu nền phía dưới */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--background) 0%, transparent 100%)"
        }}
      />
    </div>
  )
}
