'use client'
import React, { createContext, useContext, useState, useCallback } from 'react'

interface LoadingContextType {
  isLoadingDone: boolean
  markLoadingDone: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)
LoadingContext.displayName = 'LoadingContext'

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoadingDone, setIsLoadingDone] = useState(false)

  const markLoadingDone = useCallback(() => {
    setIsLoadingDone(true)
  }, [])

  return (
    <LoadingContext.Provider value={{ isLoadingDone, markLoadingDone }}>
      {children}
    </LoadingContext.Provider>
  )
}
