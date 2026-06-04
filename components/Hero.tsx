"use client"

import { motion } from "framer-motion"

interface HeroProps {
  onStartClick: () => void
}

export function Hero({ onStartClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Elegant background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gold soft glow blobs */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/8 rounded-full blur-[100px] animate-blob"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold/6 rounded-full blur-[80px] animate-blob"
          style={{ animationDelay: "5s" }}
        />
        
        {/* Gold dot pattern overlay */}
        <div className="absolute inset-0 gold-dots opacity-30" />
        
        {/* Decorative lines */}
        <div className="absolute top-1/3 left-0 right-0 gold-line opacity-20" />
        <div className="absolute bottom-1/3 left-0 right-0 gold-line opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 clay-surface-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-sm text-gold font-medium tracking-wider uppercase">Powered by AI</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance font-[family-name:var(--font-playfair)]"
            >
              <span className="text-foreground">Elegant</span>
              <br />
              <span className="gradient-text">Name Generation</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-muted-foreground mb-10 max-w-lg mx-auto lg:mx-0 text-pretty leading-relaxed"
            >
              Discover sophisticated, meaningful names crafted by AI. Perfect for your children, beloved pets, businesses, and premium products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={onStartClick}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="px-10 py-4 clay-button-gold text-lg font-semibold"
              >
                Start Creating
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="px-10 py-4 clay-button text-foreground font-semibold text-lg"
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Elegant Stats */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex gap-12 mt-14 justify-center lg:justify-start"
            >
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text font-[family-name:var(--font-playfair)]">10K+</div>
                <div className="text-sm text-muted-foreground mt-1 tracking-wide uppercase">Names Created</div>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text font-[family-name:var(--font-playfair)]">4.9</div>
                <div className="text-sm text-muted-foreground mt-1 tracking-wide uppercase">User Rating</div>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text font-[family-name:var(--font-playfair)]">Free</div>
                <div className="text-sm text-muted-foreground mt-1 tracking-wide uppercase">To Use</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Elegant 3D Clay Element */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square">
              {/* Outer decorative ring with shimmer */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-gold/20"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold/60" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-gold/40" />
              </motion.div>
              
              {/* Middle ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-10 rounded-full border border-gold/10"
              >
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold/50" />
              </motion.div>
              
              {/* Main clay card */}
              <motion.div
                animate={{ 
                  rotateY: [0, 8, 0, -8, 0],
                  rotateX: [0, -5, 0, 5, 0],
                }}
                transition={{ 
                  duration: 12, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-20 clay-surface flex items-center justify-center overflow-hidden"
                style={{ 
                  transformStyle: "preserve-3d",
                  borderRadius: "35% 65% 65% 35% / 35% 35% 65% 65%",
                }}
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 animate-shimmer" />
                
                {/* Content */}
                <div className="text-center p-8 relative z-10">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold/30 to-gold-dark/20 flex items-center justify-center glow-gold-sm"
                  >
                    <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </motion.div>
                  <div className="text-xl font-semibold text-foreground mb-2 font-[family-name:var(--font-playfair)]">AI Elegance</div>
                  <div className="text-sm text-muted-foreground">Crafting names...</div>
                </div>

                {/* Floating particles */}
                <motion.div
                  animate={{ 
                    y: [-20, 20, -20],
                    x: [-10, 10, -10],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-6 right-6 w-4 h-4 rounded-full bg-gold/30"
                />
                <motion.div
                  animate={{ 
                    y: [20, -20, 20],
                    x: [10, -10, 10],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-10 left-8 w-3 h-3 rounded-full bg-gold/25"
                />
              </motion.div>

              {/* Floating category cards */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 right-8 clay-surface-sm p-4 glow-border-gold"
              >
                <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-4 clay-surface-sm p-4 glow-border-gold"
              >
                <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </motion.div>
              
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -left-2 clay-surface-sm p-4 glow-border-gold"
              >
                <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </motion.div>
              
              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -right-2 clay-surface-sm p-4 glow-border-gold"
              >
                <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
