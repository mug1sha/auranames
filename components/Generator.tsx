"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const categories = [
  { value: "kids", label: "Kids 👶", icon: "👶" },
  { value: "pets", label: "Pets 🐶", icon: "🐶" },
  { value: "business", label: "Business 🏢", icon: "🏢" },
  { value: "product", label: "Product 🛍️", icon: "🛍️" },
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Generate Your Perfect Name
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Select a category and describe your idea. Our AI will create 10 unique, brandable names just for you.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-3xl p-6 sm:p-8 border border-border glow-border"
        >
          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">
              Select Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <motion.button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border transition-all text-center ${
                    category === cat.value
                      ? "bg-primary/20 border-primary glow-purple"
                      : "glass border-border hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl mb-2 block">{cat.icon}</span>
                  <span className={`text-sm font-medium ${
                    category === cat.value ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {cat.label.split(" ")[0]}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Description Input */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-3">
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
              className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
            />
          </div>

          {/* Generate Button */}
          <motion.button
            type="submit"
            disabled={isLoading || !description.trim()}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg glow-purple hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
