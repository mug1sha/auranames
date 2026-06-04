"use client"

import { motion } from "framer-motion"

interface HeroProps {
  onStartClick: () => void
}

export function Hero({ onStartClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-muted-foreground">Powered by AI</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance"
            >
              <span className="text-foreground">Aura</span>
              <span className="text-primary">Names</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 text-pretty"
            >
              Generate powerful, meaningful names instantly with AI. Perfect for kids, pets, businesses, and products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={onStartClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg glow-purple hover:bg-primary/90 transition-all"
              >
                Start Creating
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl glass border border-border text-foreground font-semibold text-lg hover:border-primary/50 transition-all"
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 mt-12 justify-center lg:justify-start"
            >
              <div>
                <div className="text-3xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Names Generated</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">4.9</div>
                <div className="text-sm text-muted-foreground">User Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Free to Use</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right 3D element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse-glow" />
              
              {/* Middle ring */}
              <div className="absolute inset-8 rounded-full border border-accent/30 animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
              
              {/* Inner glass card */}
              <motion.div
                animate={{ 
                  rotateY: [0, 10, 0, -10, 0],
                  rotateX: [0, -5, 0, 5, 0],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-16 glass rounded-3xl border border-primary/30 glow-purple flex items-center justify-center overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Animated content inside */}
                <div className="text-center p-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-4"
                  >
                    ✨
                  </motion.div>
                  <div className="text-lg font-semibold text-foreground mb-2">AI Magic</div>
                  <div className="text-sm text-muted-foreground">Generating names...</div>
                </div>

                {/* Floating particles */}
                <motion.div
                  animate={{ 
                    y: [-20, 20, -20],
                    x: [-10, 10, -10],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-4 right-4 w-3 h-3 rounded-full bg-accent/60"
                />
                <motion.div
                  animate={{ 
                    y: [20, -20, 20],
                    x: [10, -10, 10],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute bottom-8 left-6 w-2 h-2 rounded-full bg-primary/60"
                />
              </motion.div>

              {/* Floating icons */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-8 right-12 glass rounded-xl p-3 border border-border"
              >
                <span className="text-2xl">👶</span>
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-12 left-8 glass rounded-xl p-3 border border-border"
              >
                <span className="text-2xl">🐶</span>
              </motion.div>
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute top-1/2 left-0 glass rounded-xl p-3 border border-border"
              >
                <span className="text-2xl">🏢</span>
              </motion.div>
              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute top-1/3 right-0 glass rounded-xl p-3 border border-border"
              >
                <span className="text-2xl">🛍️</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
