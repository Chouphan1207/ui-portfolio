'use client'
import React, { useState, useEffect } from 'react'
import { useLoading } from '@/lib/loading/loading-context'

const LoadingIntro = () => {
  const [progress, setProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [backdropCompleted, setBackdropCompleted] = useState(false)
  const [fullyDone, setFullyDone] = useState(false)

  const { markLoadingDone } = useLoading()

  const loadingTime = 2000
  const intervalTime = 15
  const increment = (100 / loadingTime) * intervalTime

  // Progress simulation
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

  // Trigger state transitions once loading completes
  useEffect(() => {
    if (isCompleted) {
      // Safely call context state update
      markLoadingDone()

      const backdropTimer = setTimeout(() => {
        setBackdropCompleted(true)

        const doneTimer = setTimeout(() => {
          setFullyDone(true)
        }, 700)

        return () => clearTimeout(doneTimer)
      }, 500)

      return () => clearTimeout(backdropTimer)
    }
  }, [isCompleted, markLoadingDone])

  if (fullyDone) return null

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 pointer-events-none">
      {/* Blue backdrop */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-[#566fc1] transition-transform duration-700 ease-in-out ${
          backdropCompleted ? '-translate-y-full' : ''
        }`}
      />

      {/* Black foreground loader */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black flex justify-between items-start transition-transform duration-700 ease-in-out ${
          isCompleted ? '-translate-y-full' : ''
        }`}
      >
        <div className="text-white font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[70px]">
          Inspirux is loading...
        </div>

        <div className="absolute right-4 -bottom-15 text-white font-light text-[160px] md:text-[250px]">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  )
}

export default LoadingIntro
