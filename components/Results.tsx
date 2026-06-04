"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface ResultsProps {
  names: string[]
  onRegenerate: () => void
  isLoading: boolean
}

export function Results({ names, onRegenerate, isLoading }: ResultsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = async (name: string, index: number) => {
    try {
      await navigator.clipboard.writeText(name)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  if (names.length === 0) return null

  return (
    <section className="relative py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 text-balance" style={{ letterSpacing: "-1px" }}>
            Your Generated <span className="gradient-text">Names</span>
          </h2>
          <p className="text-muted-foreground text-lg font-medium">
            Click on any name to copy it to your clipboard
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <AnimatePresence mode="wait">
            {names.map((name, index) => (
              <motion.div
                key={`${name}-${index}`}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.08,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.03 }}
                onClick={() => copyToClipboard(name, index)}
                className="group relative clay-card p-5 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary/20 text-primary text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {name}
                    </span>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ 
                      scale: copiedIndex === index ? [1, 1.2, 1] : 1,
                    }}
                    className="flex items-center gap-2"
                  >
                    {copiedIndex === index ? (
                      <span className="text-accent text-sm font-semibold flex items-center gap-1">
                        <CheckIcon />
                        Copied!
                      </span>
                    ) : (
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <CopyIcon />
                      </span>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={onRegenerate}
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            transition={{ duration: 0.2 }}
            className="px-8 py-3 clay-surface-sm text-foreground font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshIcon className={isLoading ? "animate-spin" : ""} />
            <span>Regenerate Names</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

function CopyIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function RefreshIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  )
}
