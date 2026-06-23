'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

export default function PageTransition({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  const pathname = usePathname()
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    setShowOverlay(true)

    const timeout = setTimeout(() => {
      setShowOverlay(false)
    }, 800) // total duration of the overlay

    return () => clearTimeout(timeout)
  }, [pathname])

  return (
    <>
      <AnimatePresence mode="wait">
        {showOverlay && (
          <motion.div
            key="transition-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed top-0 left-0 w-full h-full bg-background z-[9999] pointer-events-none"
          />
        )}
      </AnimatePresence>
      {children}
    </>
  )
}
