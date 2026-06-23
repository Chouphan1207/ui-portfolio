"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/shared/ui/buttons/button"

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Avoid hydration mismatch

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="transition duration-300 ease-in-out hover:shadow-[0_0_12px_#63c7f5] hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {resolvedTheme === "dark" ? (
      <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
      <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ModeToggle
