"use client"
import { useState, useEffect } from 'react'

export default function Loading({ isLoading = true }: { isLoading?: boolean }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isLoading && progress < 100) {
      setProgress(100)
      return
    }

    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 90) {
            return oldProgress
          }
          const diff = Math.random() * 10
          return Math.min(oldProgress + diff, 90)
        })
      }, 200)

      return () => {
        clearInterval(timer)
      }
    }
  }, [isLoading, progress])

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center">
      <div className="text-4xl font-bold font-mono mb-8">
        ELI<span className="text-[#A2C2F4]">X</span>ERIUM OD<span className="text-[#A2C2F4]">O</span>R
      </div>
      <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#0E1D35] to-[#A2C2F4] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-4 text-[#0E1D35] font-mono text-sm">
        {Math.round(progress)}%
      </div>
      <div className="absolute bottom-8 left-0 right-0 text-center text-gray-400 text-xs">
        Crafting exquisite fragrances since 1990
      </div>
    </div>
  )
}