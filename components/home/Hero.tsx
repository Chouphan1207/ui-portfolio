'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaFileSignature } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

// Shared UI and Utilities
import { cn } from "@/utils/cn"
import MagicButton from '@/shared/ui/buttons/MagicButton'
import SocialButtons from '@/shared/ui/buttons/SocialButton'
import { TextGenerateEffect } from '@/shared/ui/TextGenerateEffect'

// Feature UI Components
import InfiniteScrollTools from '@/components/home/InfiniteScrolling'

const Hero = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDocumentClick = () => {
    window.open("https://drive.google.com/drive/folders/1GdnS6J7km5BBwSA6J1Dn2pU5GQdwqxyP?usp=sharing", "_blank", "noopener,noreferrer")
  }

  return (
    <>
      {/* Hero Section Container */}
      <div className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden lg:rounded-3xl lg:my-5 lg:mx-auto max-w-[95vw]">
        {/* Hero Section Content Layout */}
        <div className="relative z-10 flex w-full items-center justify-center py-16 md:py-24">
          <div className="flex flex-col md:flex-row justify-center items-center max-w-7xl w-full mx-10 xl:mx-20 gap-12 md:gap-8">

            {/* Left Column: Text Content */}
            <div className="flex-1 flex flex-col items-center md:items-start justify-center space-y-4 order-2 md:order-1">
              <h2 className="uppercase tracking-widest text-sm text-center md:text-left text-primary max-w-80 z-10 font-semibold">
                Dynamic Web Magic with Next.js
              </h2>

              <TextGenerateEffect
                words="Building with Passion. Growing with Code."
                className="text-5xl text-center md:text-6xl lg:text-7xl md:text-left text-foreground"
              />

              <p className="text-center md:text-left max-w-2xl text-sm md:text-lg lg:text-2xl text-muted-foreground tracking-wide mb-4 z-10">
                Hi, I&apos;m Tin, a Full-stack freshman based in Ho Chi Minh City, VietNam.
              </p>

              <div className="w-full flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 z-10">
                <MagicButton
                  title="My Documents"
                  icon={<FaFileSignature />}
                  position="right"
                  otherClasses="group transition-transform duration-300 hover:scale-105"
                  handleClick={handleDocumentClick}
                />
                <SocialButtons />
              </div>
            </div>
            {/* Right space */}
            <div className="flex-1 flex flex-col md:items-start justify-center order-2 md:order-1">

            </div>
          </div>
        </div>
      </div>
      <InfiniteScrollTools />

    </>
  )
}

export default Hero
