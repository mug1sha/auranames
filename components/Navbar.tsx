"use client"

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

export function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [hidden, setHidden] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <>
      <motion.nav
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: -100 },
        }}
        animate={hidden ? "hidden" : "visible"}
        initial={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-auto"
      >
        {/* Outer ambient glow */}
        <motion.div 
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{ 
            background: "radial-gradient(ellipse at center, rgba(255,215,0,0.08) 0%, transparent 70%)",
            filter: "blur(30px)",
            transform: "scale(1.5)"
          }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <div className="navbar-clay-pill relative px-3 py-2.5 md:px-4 md:py-3">
          <div className="flex items-center justify-between md:justify-start gap-3">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 group pr-1 md:pr-2 shrink-0">
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-bold leading-none tracking-tight">
                  <span className="gradient-text">Aura</span><span className="text-white">Names</span>
                </span>
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-medium text-gold/60">AI Powered</span>
              </div>
            </Link>

            {/* Ornate Divider with diamond - Desktop only */}
            <div className="hidden lg:flex items-center gap-1.5 mx-2">
              <div className="h-4 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
              <div className="w-1 h-1 rotate-45 bg-gold/60" />
              <div className="h-4 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
            </div>

            {/* Navigation Links - Desktop only */}
            <div className="hidden md:flex items-center gap-0.5">
              {["Features", "Generator", "About"].map((item) => (
                <NavLink 
                  key={item}
                  href={item === "About" ? "/about" : item === "Features" ? "/features" : `/#${item.toLowerCase()}`}
                  isHovered={hoveredLink === item}
                  onHover={() => setHoveredLink(item)}
                  onLeave={() => setHoveredLink(null)}
                >
                  {item}
                </NavLink>
              ))}
            </div>

            {/* Ornate Divider with diamond - Desktop only */}
            <div className="hidden lg:flex items-center gap-1.5 mx-2">
              <div className="h-4 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
              <div className="w-1 h-1 rotate-45 bg-gold/60" />
              <div className="h-4 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
            </div>

            {/* CTA Button - Desktop only */}
            <Link href="/auth">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="navbar-cta-button group relative hidden md:block"
              >
                <span className="relative z-10 flex items-center gap-2 font-bold" style={{ color: "#0A192F" }}>
                  <span>Get Started</span>
                  <motion.svg 
                    className="w-4 h-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="#0A192F"
                    strokeWidth={2.5}
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
                <motion.div className="absolute inset-0 rounded-xl overflow-hidden" style={{ pointerEvents: "none" }}>
                  <motion.div 
                    className="absolute inset-0 -skew-x-12"
                    style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)", width: "50%" }}
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                  />
                </motion.div>
              </motion.button>
            </Link>

            {/* Mobile Actions: CTA + Menu */}
            <div className="flex items-center gap-2 md:hidden">
              <Link href="/auth">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 clay-button-gold text-xs font-bold"
                  style={{ color: "#0A192F", borderRadius: "10px" }}
                >
                  Start
                </motion.button>
              </Link>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="navbar-menu-button flex items-center justify-center w-9 h-9"
              >
                {mobileMenuOpen ? (
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Floating decorative particles - Inside the nav so they hide with it */}
        <div className="absolute -z-10 inset-0 pointer-events-none overflow-visible">
          <motion.div 
            className="absolute -top-4 left-12 w-2 h-2 rounded-full bg-gold/50"
            animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -bottom-4 right-20 w-1.5 h-1.5 rounded-full bg-gold/40"
            animate={{ y: [8, -8, 8], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 -right-6 w-1 h-1 rounded-full bg-gold/30"
            animate={{ x: [-6, 6, -6], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
          />
          {/* Small orbiting dot */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-gold/40"
            animate={{ 
              rotate: 360,
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ 
              transformOrigin: "-40px center"
            }}
          />
        </div>
      </motion.nav>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[45] bg-background/90 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
          >
            {/* Background elements in menu */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-[80px]" />
            </div>

            {["Features", "Generator", "About", "Pricing", "API"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={item === "About" ? "/about" : item === "Features" ? "/features" : `/#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-bold tracking-tight hover:text-gold transition-colors block text-center font-[family-name:var(--font-playfair)]"
                >
                  <span className={i === 0 ? "gradient-text" : ""}>{item}</span>
                </Link>
              </motion.div>
            ))}

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-col items-center gap-6"
            >
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-full clay-surface-sm flex items-center justify-center text-gold/60"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></div>
                <div className="w-10 h-10 rounded-full clay-surface-sm flex items-center justify-center text-gold/60"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></div>
              </div>
              <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium">Elevating Identities</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ 
  href, 
  children, 
  isHovered,
  onHover,
  onLeave 
}: { 
  href: string
  children: React.ReactNode
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  return (
    <Link
      href={href}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative px-4 py-2.5 group"
    >
      {/* Background pill on hover */}
      <motion.div 
        className="absolute inset-0 navbar-link-pill rounded-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          scale: isHovered ? 1 : 0.9 
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Text with transition */}
      <span 
        className={`relative z-10 text-sm font-medium tracking-wide transition-all duration-200 ${
          isHovered ? "text-gold" : "text-muted-foreground"
        }`}
      >
        {children}
      </span>

      {/* Gold underline indicator */}
      <motion.div 
        className="absolute bottom-1.5 left-1/2 h-0.5 rounded-full bg-gold"
        initial={{ width: 0, x: "-50%" }}
        animate={{ 
          width: isHovered ? "60%" : 0,
          x: "-50%"
        }}
        transition={{ duration: 0.25 }}
      />
    </Link>
  )
}
