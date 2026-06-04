"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-lg blur-md group-hover:bg-primary/50 transition-colors" />
              <div className="relative w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
            </div>
            <span className="text-xl font-bold text-foreground">
              Aura<span className="text-primary">Names</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#generator">Generator</NavLink>
            <NavLink href="#about">About</NavLink>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm glow-purple hover:bg-primary/90 transition-colors"
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
      className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
    >
      {children}
    </Link>
  )
}
