'use client'

import React, { useEffect, useState } from 'react'
import { cn } from "@/utils/cn";
import { Spotlight } from '@/components/home/Spotlight';
import MagicButton from '@/shared/ui/buttons/MagicButton';
import { FaFileSignature } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TextGenerateEffect } from '@/shared/ui/TextGenerateEffect';
import { useTheme } from 'next-themes';
import WavyBackground from '@/components/home/WavyBackground';
import InfiniteScrollTools from '@/components/home/InfiniteScrolling';
import SocialButtons from '@/shared/ui/buttons/SocialButton';

const Hero = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 🚀 Ensures the component has fully mounted on the client browser window
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <WavyBackground className="relative w-full h-full lg:-mt-5 lg:mx-5">
        {/* Background Spotlights */}
        <div>
          <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="#3fc1c0" />
          <Spotlight className="-top-10 left-full h-[80vh] w-[50vw]" fill="#0899ba" />
          <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="#1c558e" />
        </div>

        {/* Hero Section */}
        <div className="relative flex mt-20 py-0 xs:py-2 sm:py-2 xs:w-full sm:w-full items-center justify-center overflow-hidden">
          <div className="flex flex-col md:flex-row justify-center items-center max-w-7xl w-full mx-10 xl:mx-20">

            {/* Left Column: Text Content */}
            <div className="flex-2 flex flex-col items-center md:items-start justify-center space-y-4 order-2 xl:order-none">
              <h2 className="uppercase tracking-widest text-sm text-center md:text-left text-primary max-w-80 z-10">
                Dynamic Web Magic with Next.js
              </h2>

              <TextGenerateEffect
                words='Building with Passion. Growing with Code.'
                className='text-5xl text-center md:text-6xl lg:text-7xl md:text-left lg:text-left xl:text-left' />

              <p className="text-center md:text-left max-w-2xl text-sm md:text-lg lg:text-2xl text-secondary-foreground tracking-wide mb-4 z-10">
                Hi, I&apos;m Tin, a Full-stack freshman based in Ho Chi Minh City, VietNam.
              </p>

              <div className="w-full flex flex-col md:flex-row justify-center items-center sm:space-x-0">
                <MagicButton
                  title="My Documents"
                  icon={<FaFileSignature />}
                  position="right"
                  otherClasses="group transition-transform duration-300 hover:scale-105"
                  handleClick={() => window.open(
                    "https://drive.google.com/drive/folders/1GdnS6J7km5BBwSA6J1Dn2pU5GQdwqxyP?usp=sharing"
                  )} />
                <SocialButtons />
              </div>
            </div>

            {/* Right Column: Portrait */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 2.3, duration: 0.4, ease: "easeInOut" },
              }}
              className={cn(
                "order-1 md:order-2 xl:mb-0 w-78 h-80 flex items-center justify-center rounded-full relative",
                mounted && theme === "dark" ? "mix-blend-lighten" : "" // 🚀 Added standard mount flag checkpoint guard
              )}
            >
              <Image
                src="/hero.JPEG"
                alt="Tin Phan"
                priority
                quality={100}
                width={300}
                height={300}
                className="object-contain rounded-full" />

              <motion.svg
                className="absolute inset-0 w-full h-full"
                fill="transparent"
                viewBox="0 0 506 506"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.circle
                  cx="253"
                  cy="253"
                  r="250"
                  stroke="var(--card-foreground)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ strokeDasharray: "24 10 0 0" }}
                  animate={{
                    strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                    rotate: [120, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }} />
              </motion.svg>
            </motion.div>
          </div>
        </div>
      </WavyBackground>
      <InfiniteScrollTools />
    </>
  )
}

export default Hero;
