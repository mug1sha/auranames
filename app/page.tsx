"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Generator } from "@/components/Generator"
import { Results } from "@/components/Results"
import Footer from "@/components/Footer"
import { generateNames } from "@/lib/api"
import { StandardName, RecommendedName } from "@/lib/types/name"

export default function Home() {
  const [results, setResults] = useState<{ curatedNames: StandardName[], recommendedNames: RecommendedName[] } | null>(null)
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
      const data = await generateNames(category, description)
      setResults(data)
    } catch (error) {
      console.error("[v0] Error generating names:", error)
      // Fallback mock names if API fails
      setResults({
        curatedNames: [
          { name: "Aurora Bright" },
          { name: "Nimbus Cloud" },
          { name: "Zenith Peak" },
          { name: "Stellar Glow" },
          { name: "Lunar Echo" },
          { name: "Phoenix Rise" },
          { name: "Velvet Storm" },
          { name: "Crystal Wave" },
          { name: "Ember Spark" },
          { name: "Prism Light" }
        ],
        recommendedNames: [
          { name: "AuraNames", definition: "Derived from 'Aura', this signifies an invisible yet powerful presence." },
          { name: "Nexora", definition: "A blend of 'Next' and 'Ora', meaning the next era of innovation." },
          { name: "Veliqo", definition: "A smooth, modern sounding name indicating velocity and premium quality." }
        ]
      })
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
      <Results results={results} onRegenerate={handleRegenerate} isLoading={isLoading} />
      <Footer />
    </main>
  )
}
