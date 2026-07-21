'use client'

import Image from "next/image"
import { motion, useScroll, useTransform } from "motion/react"

export default function HomeBackground() {
  const { scrollY } = useScroll()

  const backgroundY = useTransform(scrollY, [0, 2000], ['0%', '5%'])

  return (
    <div className="fixed -top-20 left-0 right-0 -bottom-20 pointer-events-none select-none z-0 overflow-hidden">
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 w-full h-[110%]"
      >
        <Image
          src="/hero-bg.JPEG"
          alt="Hero Background"
          fill
          priority
          quality={100}
          sizes="100vw"
          // Sử dụng object-right-top hoặc tinh chỉnh chính xác pixel/percent cho mobile
          className="object-cover object-right md:object-[left_center] scale-105"        />
      </motion.div>

      {/* Lớp phủ mờ (Overlay) */}
      <div className="absolute inset-0 bg-background/40 md:bg-background/40 md:backdrop-blur-[5px] dark:bg-black/40 md:dark:bg-black/40" />
    </div>
  )
}
