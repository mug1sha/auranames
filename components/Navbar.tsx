"use client"

import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

export function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [hidden, setHidden] = useState(false)
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
    <motion.nav
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -100 },
      }}
      animate={hidden ? "hidden" : "visible"}
      initial={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto"
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
      
      <div className="navbar-clay-pill relative px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group pr-2">
            <div className="relative">
              {/* Animated outer glow ring */}
              <motion.div 
                className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ 
                  background: "radial-gradient(circle, rgba(255,215,0,0.35) 0%, transparent 70%)",
                }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Logo clay container with SVG */}
              <div className="relative navbar-logo-clay w-11 h-11 flex items-center justify-center overflow-hidden">
                {/* Custom stylized A logo */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M12 3L4 21H8L10 16H14L16 21H20L12 3ZM11 13L12 9L13 13H11Z" 
                    fill="#0A192F"
                    stroke="#0A192F"
                    strokeWidth="0.5"
                  />
                </svg>
                {/* Inner shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-xl" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground leading-none tracking-tight">
                <span className="gradient-text">Aura</span>Names
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-gold/60">AI Powered</span>
            </div>
          </Link>

          {/* Ornate Divider with diamond */}
          <div className="hidden md:flex items-center gap-1.5 mx-3">
            <div className="h-4 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
            <div className="h-4 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {["Features", "Generator", "About"].map((item) => (
              <NavLink 
                key={item}
                href={`#${item.toLowerCase()}`}
                isHovered={hoveredLink === item}
                onHover={() => setHoveredLink(item)}
                onLeave={() => setHoveredLink(null)}
              >
                {item}
              </NavLink>
            ))}
          </div>

          {/* Ornate Divider with diamond */}
          <div className="hidden md:flex items-center gap-1.5 mx-3">
            <div className="h-4 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
            <div className="h-4 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
          </div>

          {/* CTA Button - Eye-catching gold */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="navbar-cta-button group relative"
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
            {/* Animated shine sweep */}
            <motion.div 
              className="absolute inset-0 rounded-xl overflow-hidden"
              style={{ pointerEvents: "none" }}
            >
              <motion.div 
                className="absolute inset-0 -skew-x-12"
                style={{ 
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                  width: "50%"
                }}
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
              />
            </motion.div>
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden navbar-menu-button ml-1"
          >
            <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Floating decorative particles */}
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
