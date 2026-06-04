"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const categories = [
  { value: "kids", label: "Children", icon: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )},
  { value: "pets", label: "Beloved Pets", icon: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  )},
  { value: "business", label: "Business", icon: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )},
  { value: "product", label: "Products", icon: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  )},
]

interface GeneratorProps {
  onGenerate: (category: string, description: string) => void
  isLoading: boolean
}

export function Generator({ onGenerate, isLoading }: GeneratorProps) {
  const [category, setCategory] = useState("kids")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (description.trim()) {
      onGenerate(category, description)
    }
  }

  return (
    <section id="generator" className="relative py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 gold-dots opacity-20" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-5 text-balance font-[family-name:var(--font-playfair)]">
            Craft Your Perfect <span className="gradient-text">Name</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty leading-relaxed">
            Select a category and describe your vision. Our AI will curate 10 unique, elegant names tailored just for you.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="clay-surface p-8 sm:p-10"
        >
          {/* Category Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gold mb-5 tracking-wider uppercase">
              Select Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <motion.button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className={`p-5 text-center transition-all ${
                    category === cat.value
                      ? "clay-card glow-border-gold"
                      : "clay-surface-sm"
                  }`}
                >
                  <span className={`mb-3 flex justify-center ${category === cat.value ? "text-gold" : "text-muted-foreground"}`}>
                    {cat.icon}
                  </span>
                  <span className={`text-sm font-semibold tracking-wide ${
                    category === cat.value ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {cat.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Description Input */}
          <div className="mb-8">
            <label htmlFor="description" className="block text-sm font-semibold text-gold mb-5 tracking-wider uppercase">
              Describe Your Vision
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                category === "kids"
                  ? "E.g., An elegant name for a baby girl, inspired by classical literature..."
                  : category === "pets"
                  ? "E.g., A distinguished name for a majestic Maine Coon cat..."
                  : category === "business"
                  ? "E.g., A sophisticated brand for a luxury consulting firm..."
                  : "E.g., A premium name for an artisan leather goods collection..."
              }
              rows={4}
              className="w-full px-6 py-5 clay-input text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all resize-none text-lg"
            />
          </div>

          {/* Generate Button */}
          <motion.button
            type="submit"
            disabled={isLoading || !description.trim()}
            whileHover={{ scale: isLoading ? 1 : 1.01, y: isLoading ? 0 : -3 }}
            whileTap={{ scale: isLoading ? 1 : 0.99 }}
            transition={{ duration: 0.25 }}
            className="w-full py-5 clay-button-gold text-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>Crafting Names...</span>
              </>
            ) : (
              <>
                <span>Generate Names</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}
