"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 clay-surface-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg group-hover:bg-primary/40 transition-colors duration-500" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg">
                <span className="text-navy font-bold text-lg font-[family-name:var(--font-playfair)]">A</span>
              </div>
            </div>
            <span className="text-2xl font-bold text-foreground tracking-tight">
              Aura<span className="gradient-text">Names</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#generator">Generator</NavLink>
            <NavLink href="#about">About</NavLink>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="px-5 py-2.5 clay-button-gold text-sm"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium tracking-wide uppercase"
    >
      {children}
    </Link>
  )
}
