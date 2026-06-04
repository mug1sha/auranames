"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const categories = [
  { value: "kids", label: "Kids", icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )},
  { value: "pets", label: "Pets", icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  )},
  { value: "business", label: "Business", icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )},
  { value: "product", label: "Product", icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <section id="generator" className="relative py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 text-balance" style={{ letterSpacing: "-1px" }}>
            Generate Your Perfect <span className="gradient-text">Name</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty font-medium">
            Select a category and describe your idea. Our AI will create 10 unique, brandable names just for you.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="clay-surface p-6 sm:p-8"
        >
          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-foreground mb-4">
              Select Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <motion.button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className={`p-4 text-center transition-all ${
                    category === cat.value
                      ? "clay-card"
                      : "clay-surface-sm"
                  }`}
                  style={category === cat.value ? {
                    boxShadow: "0 0 25px rgba(124,58,237,0.25), 0 0 40px rgba(34,211,238,0.15), 8px 8px 20px rgba(0,0,0,0.55), -4px -4px 12px rgba(255,255,255,0.03)"
                  } : {}}
                >
                  <span className={`mb-2 block ${category === cat.value ? "text-primary" : "text-muted-foreground"}`}>
                    {cat.icon}
                  </span>
                  <span className={`text-sm font-semibold ${
                    category === cat.value ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {cat.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Description Input */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-4">
              Describe Your Idea
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                category === "kids"
                  ? "E.g., A unique name for a baby girl, inspired by nature..."
                  : category === "pets"
                  ? "E.g., A playful name for a golden retriever puppy..."
                  : category === "business"
                  ? "E.g., A tech startup focused on AI solutions..."
                  : "E.g., An eco-friendly water bottle for athletes..."
              }
              rows={4}
              className="w-full px-5 py-4 clay-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
            />
          </div>

          {/* Generate Button */}
          <motion.button
            type="submit"
            disabled={isLoading || !description.trim()}
            whileHover={{ scale: isLoading ? 1 : 1.01, y: isLoading ? 0 : -2 }}
            whileTap={{ scale: isLoading ? 1 : 0.99 }}
            transition={{ duration: 0.2 }}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            style={{
              background: "linear-gradient(145deg, #8B4BF6, #6D28D9)",
              boxShadow: isLoading 
                ? "6px 6px 15px rgba(0,0,0,0.5), -3px -3px 10px rgba(255,255,255,0.04)"
                : "6px 6px 15px rgba(0,0,0,0.5), -3px -3px 10px rgba(255,255,255,0.04), 0 0 25px rgba(124,58,237,0.35)"
            }}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>Generating Names...</span>
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
