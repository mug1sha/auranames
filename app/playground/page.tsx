"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  Sparkles, 
  Send, 
  Copy, 
  Bookmark, 
  Star, 
  ArrowRight,
  RefreshCw,
  Globe,
  Award
} from "lucide-react"

const categories = [
  "Startup", "Business", "AI Tool", "Product", "App", "Domain", "YouTube Channel"
]

const placeholders = [
  "Describe your startup...",
  "Describe your app...",
  "Describe your business...",
  "Describe your AI tool..."
]

interface Result {
  name: string;
  meaning: string;
  score: number;
  domain: string;
}

export default function PlaygroundPage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [results, setResults] = useState<Result[]>([])
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [history, setHistory] = useState<{role: 'user' | 'assistant', content: string | Result[]}[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!prompt.trim()) return

    const userPrompt = prompt
    setHistory(prev => [...prev, { role: 'user', content: userPrompt }])
    setPrompt("")
    setIsGenerating(true)

    // Simulate AI response
    setTimeout(() => {
      const mockResults: Result[] = [
        { name: "CodeNova", meaning: "A new star in the coding universe", score: 98, domain: "available" },
        { name: "DevAura", meaning: "The spiritual essence of development", score: 95, domain: "taken" },
        { name: "NovaScript", meaning: "Revolutionary scripting foundation", score: 92, domain: "premium" },
      ]
      setHistory(prev => [...prev, { role: 'assistant', content: mockResults }])
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="flex-1 flex flex-col h-full relative">
      {/* Scrollable Workspace */}
      <div className="flex-1 overflow-y-auto px-6 py-12 md:px-20 no-scrollbar">
        <div className="max-w-4xl mx-auto w-full">
          {history.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <motion.div
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 clay-surface flex items-center justify-center mb-10 glow-gold"
                style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
              >
                <Sparkles className="w-16 h-16 text-gold" />
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-8"
              >
                What would you like to <span className="gradient-text">name</span> today?
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-3 mb-12"
              >
                {categories.map((cat, i) => (
                  <motion.button
                    key={cat}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-5 py-2.5 clay-surface-sm text-sm font-bold text-muted-foreground hover:text-gold hover:glow-border-gold transition-all"
                  >
                    {cat}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          ) : (
            /* Conversation Thread */
            <div className="space-y-12 pb-24">
              {history.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'user' ? (
                    <div className="max-w-[80%] clay-surface-sm px-6 py-4 text-foreground font-medium border-gold/20">
                      {msg.content as string}
                    </div>
                  ) : (
                    <div className="w-full space-y-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg clay-surface flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-gold" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-gold">Aura Intelligence</span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(msg.content as Result[]).map((res, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="clay-card p-6 flex flex-col h-full"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-foreground">{res.name}</h3>
                              <div className="flex gap-2">
                                <button className="p-2 hover:text-gold transition-colors"><Star className="w-4 h-4" /></button>
                                <button className="p-2 hover:text-gold transition-colors"><Bookmark className="w-4 h-4" /></button>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-6 flex-1 italic">"{res.meaning}"</p>
                            
                            <div className="space-y-3 mt-auto">
                              <div className="flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1.5 text-muted-foreground"><Award className="w-3.5 h-3.5 text-gold" /> Brand Score</span>
                                <span className="font-bold text-gold">{res.score}/100</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1.5 text-muted-foreground"><Globe className="w-3.5 h-3.5 text-gold" /> Domain Status</span>
                                <span className={`font-bold capitalize ${res.domain === 'available' ? 'text-green-400' : 'text-amber-400'}`}>{res.domain}</span>
                              </div>
                              
                              <button className="w-full mt-4 py-2.5 clay-button text-xs font-bold flex items-center justify-center gap-2">
                                <Copy className="w-3.5 h-3.5" />
                                Copy Name
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isGenerating && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 text-gold"
                >
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span className="text-xs font-bold uppercase tracking-widest">Generating magic...</span>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="p-6 md:p-10 bg-gradient-to-t from-background via-background/90 to-transparent">
        <div className="max-w-3xl mx-auto w-full">
          <form onSubmit={handleGenerate} className="relative group">
            <div className="navbar-clay-pill p-1.5 flex items-center gap-2 group-focus-within:border-gold/30 transition-all">
              <div className="pl-4 text-gold">
                <Sparkles className="w-5 h-5" />
              </div>
              
              <div className="flex-1 relative h-12 flex items-center">
                <AnimatePresence mode="wait">
                  {!prompt && (
                    <motion.div
                      key={placeholderIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 0.5, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute inset-0 flex items-center text-muted-foreground text-sm md:text-base pointer-events-none"
                    >
                      {placeholders[placeholderIndex]}
                    </motion.div>
                  )}
                </AnimatePresence>
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-foreground text-sm md:text-base pr-4 relative z-10"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!prompt.trim() || isGenerating}
                className={`p-3 rounded-xl flex items-center justify-center transition-all
                  ${prompt.trim() && !isGenerating 
                    ? 'clay-button-gold text-[#0A192F]' 
                    : 'bg-gold/5 text-gold/30 border border-gold/5'
                  }`}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="mt-3 flex justify-center gap-6 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-gold/50" /> GPT-4o Powered</span>
              <span className="flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-gold/50" /> Precise Results</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
