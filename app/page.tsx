"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Generator } from "@/components/Generator"
import { Results } from "@/components/Results"
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

function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="text-lg font-bold text-foreground">
              Aura<span className="text-primary">Names</span>
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} AuraNames. Powered by AI.
          </p>
        </div>
      </div>
    </footer>
  )
}
