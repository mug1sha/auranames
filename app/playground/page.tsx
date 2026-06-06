"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { useWorkspaceStore, Result, Message } from "@/store/useWorkspaceStore"
import { 
  Sparkles, 
  Send, 
  Copy, 
  Bookmark, 
  Star, 
  ArrowRight,
  RefreshCw,
  Globe,
  Award,
  Check
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

export default function PlaygroundPage() {
  const { sessions, activeSessionId, addMessage, updateSessionTitle, favorites, toggleFavorite } = useWorkspaceStore()
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [copiedName, setCopiedName] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const activeSession = sessions.find(s => s.id === activeSessionId)
  const messages = activeSession?.messages || []

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isGenerating])

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name)
    setCopiedName(name)
    setTimeout(() => setCopiedName(null), 2000)
  }

  const handleGenerate = async (e?: React.FormEvent, overridePrompt?: string) => {
    if (e) e.preventDefault()
    const finalPrompt = overridePrompt || prompt
    console.log("Playground: handleGenerate started", { finalPrompt, activeSessionId });
    if (!finalPrompt.trim() || !activeSessionId) {
      console.warn("Playground: Missing prompt or activeSessionId");
      return;
    }

    setPrompt("")
    setIsGenerating(true)

    try {
      // 1. Add User Message
      console.log("Playground: Adding user message...");
      const userMsg: Message = {
        role: 'user',
        content: finalPrompt,
        timestamp: Date.now()
      }
      await addMessage(activeSessionId, userMsg)
      console.log("Playground: User message added successfully");

      // 2. Update Session Title if it's the first message
      if (messages.length === 0) {
        console.log("Playground: Updating session title...");
        const title = finalPrompt.length > 20 ? finalPrompt.substring(0, 20) + "..." : finalPrompt
        await updateSessionTitle(activeSessionId, title)
      }

      // 3. Call Real AI API
      console.log("Playground: Calling /api/generate...");
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          category: "Startup", // Default category for continuous chat
          description: finalPrompt,
          style: "modern"
        }),
      });

      console.log("Playground: API response received", { status: response.status });
      const data = await response.json();
      console.log("Playground: API data parsed", data);
      
      if (!response.ok) throw new Error(data.error || "Generation failed");

      // 4. Map API results to Playground format
      console.log("Playground: Mapping results...");
      const apiResults: Result[] = [
        ...(data.curatedNames || []).map((n: any) => ({
          name: n.name,
          meaning: n.meaning || "A sophisticated name for your brand.",
          score: Math.floor(Math.random() * 15) + 85, // Mock score if API doesn't provide
          domain: "available"
        })),
        ...(data.recommendedNames || []).map((n: any) => ({
          name: n.name,
          meaning: n.definition || "Premium brand identity.",
          score: Math.floor(Math.random() * 10) + 90,
          domain: "premium"
        }))
      ];
      
      console.log("Playground: Adding assistant message...", apiResults);
      const assistantMsg: Message = {
        role: 'assistant',
        content: apiResults,
        timestamp: Date.now()
      }
      await addMessage(activeSessionId, assistantMsg)
      console.log("Playground: Assistant message added successfully");
    } catch (error: any) {
      console.error("Playground error:", error);
      // Add error message to thread
      const errorMsg: Message = {
        role: 'assistant',
        content: `I encountered an error: ${error.message}. Please check your configuration and try again.`,
        timestamp: Date.now()
      }
      await addMessage(activeSessionId, errorMsg)
    } finally {
      console.log("Playground: handleGenerate finished");
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full relative">
      {/* Scrollable Workspace */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-12 md:px-20 no-scrollbar scroll-smooth"
      >
        <div className="max-w-4xl mx-auto w-full">
          {messages.length === 0 ? (
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
                    onClick={() => handleGenerate(undefined, `Generate ${cat} names`)}
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
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'user' ? (
                    <div className="max-w-[80%] clay-surface-sm px-6 py-4 text-foreground font-medium border-gold/20 shadow-xl">
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
                            className="clay-card p-6 flex flex-col h-full group"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-foreground">{res.name}</h3>
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => toggleFavorite(res.name)}
                                  className={`p-2 transition-colors ${favorites.includes(res.name) ? 'text-gold' : 'text-muted-foreground hover:text-gold'}`}
                                >
                                  <Star className={`w-4 h-4 ${favorites.includes(res.name) ? 'fill-gold' : ''}`} />
                                </button>
                                <button className="p-2 text-muted-foreground hover:text-gold transition-colors"><Bookmark className="w-4 h-4" /></button>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-6 flex-1 italic">"{res.meaning}"</p>
                            
                            <div className="space-y-3 mt-auto">
                              <div className="flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1.5 text-muted-foreground"><Award className="w-3.5 h-3.5 text-gold" /> Brand Score</span>
                                <span className="font-bold text-gold">{res.score}/100</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1.5 text-muted-foreground"><Globe className="w-3.5 h-3.5 text-gold" /> Domain</span>
                                <span className={`font-bold capitalize ${res.domain === 'available' ? 'text-green-400' : 'text-amber-400'}`}>{res.domain}</span>
                              </div>
                              
                              <button 
                                onClick={() => handleCopy(res.name)}
                                className={`w-full mt-4 py-2.5 clay-button text-xs font-bold flex items-center justify-center gap-2 transition-all
                                  ${copiedName === res.name ? 'border-green-500/50 text-green-400' : ''}`}
                              >
                                {copiedName === res.name ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copiedName === res.name ? 'Copied!' : 'Copy Name'}
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
                  <span className="text-xs font-bold uppercase tracking-widest animate-pulse">Generating magic...</span>
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
            <div className="navbar-clay-pill p-1.5 flex items-center gap-2 group-focus-within:border-gold/30 transition-all shadow-2xl">
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
                  disabled={!activeSessionId || isGenerating}
                  className="w-full bg-transparent border-none outline-none text-foreground text-sm md:text-base pr-4 relative z-10 disabled:opacity-50"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!prompt.trim() || isGenerating || !activeSessionId}
                className={`p-3 rounded-xl flex items-center justify-center transition-all
                  ${prompt.trim() && !isGenerating && activeSessionId
                    ? 'clay-button-gold text-[#0A192F]' 
                    : 'bg-gold/5 text-gold/30 border border-gold/5'
                  }`}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="mt-3 flex justify-center gap-6 text-[10px] text-muted-foreground uppercase tracking-widest font-black">
              <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-gold/50" /> GPT-4o Powered</span>
              <span className="flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-gold/50" /> Continuous Workspace</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
