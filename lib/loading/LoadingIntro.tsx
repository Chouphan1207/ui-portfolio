'use client'

import React, { useState, useEffect } from 'react'
import { useLoading } from '@/lib/loading/loading-context'

const LoadingIntro = () => {
  const [progress, setProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [backdropVisible, setBackdropVisible] = useState(false)
  const [fullyDone, setFullyDone] = useState(false)

  const { markLoadingDone } = useLoading()

  const loadingTime = 2000
  const intervalTime = 15
  const increment = (100 / loadingTime) * intervalTime

  // 1. Progress simulation loop
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(timer)
          setIsCompleted(true)
          return 100
        }
        return next
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [increment])

  // 2. Fade in the blue backdrop dynamically as progress approaches the finish line
  useEffect(() => {
    if (progress >= 30) {
      setBackdropVisible(true)
    }
  }, [progress])

  // 3. Flattened sequence loops to orchestrate clean exit opacity fades
  useEffect(() => {
    if (!isCompleted) return

    markLoadingDone()

    // ✨ Start fading out the blue backdrop overlay 500ms after the black screen slides up
    const fadeOutTimer = setTimeout(() => {
      setBackdropVisible(false)
    }, 500)

    // Completely unmount the intro layout container when opacity transitions finish completely
    const unmountTimer = setTimeout(() => {
      setFullyDone(true)
    }, 1300) // 500ms delay + 700ms transition duration + buffer overhead

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(unmountTimer)
    }
  }, [isCompleted, markLoadingDone])

  if (fullyDone) return null

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 pointer-events-none overflow-hidden">
      {/* ✨ BLUE BACKDROP: Changed from transform slides to custom opacity fades */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-[#566fc1] transition-opacity duration-700 ease-in-out ${
          backdropVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* BLACK FOREGROUND PANEL */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black flex flex-col justify-between p-8 md:p-16 transition-transform duration-700 ease-in-out ${
          isCompleted ? '-translate-y-full' : ''
        }`}
      >
        <div className="text-white font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[70px] tracking-tight">
          Inspirux is loading...
        </div>

        <div className="absolute right-4 bottom-0 text-white font-light text-[120px] sm:text-[180px] md:text-[250px] leading-none select-none">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  )
}

export default LoadingIntro
