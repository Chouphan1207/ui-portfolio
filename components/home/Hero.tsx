'use client'

import React from 'react'
import { FaFileSignature } from 'react-icons/fa'

// Shared UI & Components
import MagicButton from '@/components/shared/buttons/MagicButton'
import SocialButtons from '@/components/shared/buttons/SocialButton'
import InfiniteScrollTools from '@/components/home/InfiniteScrolling'
import { TextGenerateEffect } from '../background/TextGenerateEffect'

const DRIVE_URL = "https://drive.google.com/drive/folders/1GdnS6J7km5BBwSA6J1Dn2pU5GQdwqxyP?usp=sharing"

export default function Hero() {
  const handleDocumentClick = () => {
    window.open(DRIVE_URL, "_blank", "noopener,noreferrer")
  }

  return (
    <>
      {/* Hero Section Container */}
      <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center lg:justify-start overflow-hidden px-6 sm:px-12 lg:px-24">

        <div className="relative z-10 max-w-3xl w-full py-16 md:py-24 flex flex-col items-center md:items-start text-center md:text-left gap-5">

          {/* Subheading Badge */}
          <h2 className="uppercase tracking-widest text-sm md:text-xl text-white font-semibold">
            Architecting Logic, Engineering Scale
          </h2>

          {/* Core Title */}
          <TextGenerateEffect
            words="Building with Passion. Growing with Code."
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-description leading-tight"
          />

          {/* Description Copy */}
          <p className="max-w-xl text-base md:text-lg lg:text-xl text-white tracking-wide">
            Hi, I&apos;m Tin, a Full-stack freshman based in Ho Chi Minh City, VietNam.
          </p>

          {/* Action Blocks - Căn giữa trên mobile, canh trái từ md trở lên */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 pt-2 md:ml-10">
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
