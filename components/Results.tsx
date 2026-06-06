"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { StandardName, RecommendedName } from "@/lib/types/name"

interface ResultsProps {
  results: { curatedNames: StandardName[], recommendedNames: RecommendedName[] } | null
  onRegenerate: () => void
  isLoading: boolean
}

export function Results({ results, onRegenerate, isLoading }: ResultsProps) {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)

  const copyToClipboard = async (name: string, id: string) => {
    try {
      await navigator.clipboard.writeText(name)
      setCopiedIndex(id)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  if (!results) return null

  return (
    <section className="relative py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 gold-dots opacity-15" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* RECOMMENDED NAMES */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 clay-surface-sm mb-6">
            <span className="text-xs font-black uppercase tracking-widest text-gold">Top Picks</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-5 text-balance font-[family-name:var(--font-playfair)]">
            Highly <span className="gradient-text">Recommended</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <AnimatePresence mode="wait">
            {results.recommendedNames.map((item, index) => (
              <motion.div
                key={`rec-${item.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="clay-card p-8 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[50px] -z-10 group-hover:bg-gold/10 transition-colors" />
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-3xl font-black gradient-text font-[family-name:var(--font-playfair)] tracking-tight">
                      {item.name}
                    </span>
                    <button 
                      onClick={() => copyToClipboard(item.name, `rec-${index}`)}
                      className="p-2 clay-surface-sm rounded-full text-muted-foreground hover:text-gold transition-colors"
                    >
                      {copiedIndex === `rec-${index}` ? <CheckIcon /> : <CopyIcon />}
                    </button>
                  </div>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    {item.definition}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CURATED NAMES */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-playfair)]">
            Curated <span className="gradient-text">Shortlist</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Select any name below to copy it to your clipboard
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          <AnimatePresence mode="wait">
            {results.curatedNames.map((item, index) => (
              <motion.div
                key={`cur-${item.name}-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => copyToClipboard(item.name, `cur-${index}`)}
                className="group clay-surface-sm p-5 cursor-pointer text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[120px]"
              >
                <span className="text-xl font-bold text-foreground group-hover:text-gold transition-colors font-[family-name:var(--font-playfair)] mb-1">
                  {item.name}
                </span>
                {item.meaning && (
                  <p className="text-[10px] text-muted-foreground line-clamp-2 px-2 group-hover:opacity-0 transition-opacity">
                    {item.meaning}
                  </p>
                )}
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                  <span className="text-[10px] text-gold font-bold uppercase tracking-widest flex items-center gap-1">
                    {copiedIndex === `cur-${index}` ? (
                      <><CheckIcon className="w-3 h-3" /> Copied</>
                    ) : (
                      <><CopyIcon className="w-3 h-3" /> Copy</>
                    )}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={onRegenerate}
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -3 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            transition={{ duration: 0.25 }}
            className="px-10 py-4 clay-button text-foreground font-semibold flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshIcon className={isLoading ? "animate-spin" : ""} />
            <span>Regenerate Options</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

function CopyIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  )
}

function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
