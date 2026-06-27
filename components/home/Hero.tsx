'use client'

import React from 'react'
import { FaFileSignature } from 'react-icons/fa'

// Shared UI and Utilities
import MagicButton from '@/shared/ui/buttons/MagicButton'
import SocialButtons from '@/shared/ui/buttons/SocialButton'
import { TextGenerateEffect } from '@/components/home/TextGenerateEffect'

// Feature UI Components
import InfiniteScrollTools from '@/components/home/InfiniteScrolling'

const Hero = () => {
  const handleDocumentClick = () => {
    window.open(
      "https://drive.google.com/drive/folders/1GdnS6J7km5BBwSA6J1Dn2pU5GQdwqxyP?usp=sharing",
      "_blank",
      "noopener,noreferrer"
    )
  }

  return (
    <>
      {/* Hero Section Container */}
      <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-8 lg:px-16">

        {/* Content Centering Wrapper */}
        <div className="relative z-10 max-w-5xl w-full py-16 md:py-24 flex flex-col items-center md:items-start text-center md:text-left gap-6">

          {/* Subheading Badge */}
          <h2 className="uppercase tracking-widest text-xs md:text-sm text-title font-semibold">
            Dynamic Web Mag ic with Next.js
          </h2>

          {/* Core Title */}
          <TextGenerateEffect
            words="Building with Passion. Growing with Code."
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-description leading-tight"
          />

          {/* Description Copy */}
          <p className="max-w-2xl text-base md:text-lg lg:text-xl text-description tracking-wide">
            Hi, I&apos;m Tin, a Full-stack freshman based in Ho Chi Minh City, VietNam.
          </p>

          {/* Action Blocks */}
          <div className="w-full flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 pt-4">
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
      </section>

      {/* Infinite Scroll Highlight Block */}
      <InfiniteScrollTools />
    </>
  )
}

export default Hero
