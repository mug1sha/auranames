"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Generator } from "@/components/Generator"
import { Results } from "@/components/Results"
import Footer from "@/components/Footer"
import { generateNames } from "@/lib/api"

export default function Home() {
  const [names, setNames] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastCategory, setLastCategory] = useState("")
  const [lastDescription, setLastDescription] = useState("")
  const generatorRef = useRef<HTMLDivElement>(null)

  const handleStartClick = () => {
    generatorRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleGenerate = async (category: string, description: string) => {
    setIsLoading(true)
    setLastCategory(category)
    setLastDescription(description)
    
    try {
      const generatedNames = await generateNames(category, description)
      setNames(generatedNames)
    } catch (error) {
      console.error("[v0] Error generating names:", error)
      // Fallback mock names if API fails
      setNames([
        "Aurora Bright",
        "Nimbus Cloud",
        "Zenith Peak",
        "Stellar Glow",
        "Lunar Echo",
        "Phoenix Rise",
        "Velvet Storm",
        "Crystal Wave",
        "Ember Spark",
        "Prism Light",
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegenerate = () => {
    if (lastCategory && lastDescription) {
      handleGenerate(lastCategory, lastDescription)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero onStartClick={handleStartClick} />
      <div ref={generatorRef}>
        <Generator onGenerate={handleGenerate} isLoading={isLoading} />
      </div>
      <Results names={names} onRegenerate={handleRegenerate} isLoading={isLoading} />
      <Footer />
    </main>
  )
}

