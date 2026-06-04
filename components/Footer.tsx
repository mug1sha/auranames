"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowUpCircle, Globe, MessageSquare, Code, Share2 } from "lucide-react"
import Image from "next/image"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialLinks = [
    { icon: <MessageSquare size={20} />, href: "#", label: "Twitter" },
    { icon: <Globe size={20} />, href: "#", label: "Instagram" },
    { icon: <Code size={20} />, href: "#", label: "Github" },
    { icon: <Share2 size={20} />, href: "#", label: "LinkedIn" },
  ]

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Generator", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Features", href: "#" },
        { label: "API", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ],
    },
  ]

  return (
    <footer className="relative pt-24 pb-12 overflow-hidden">
      {/* Decorative Gold Line */}
      <div className="absolute top-0 left-0 right-0 gold-line opacity-30" />
      
      {/* Background Decorative Blobs */}
      <div className="absolute bottom-[-100px] left-[-100px] w-64 h-64 bg-primary/5 blur-[100px] rounded-full -z-10" />
      <div className="absolute top-0 right-[-50px] w-80 h-80 bg-accent/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Logo & Info Section */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-8 group cursor-pointer">
              <span className="text-3xl font-black tracking-tighter text-white">
                <span className="text-primary">Aura</span>Names
              </span>
            </div>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-md font-medium leading-relaxed">
              Elevating identities through the intersection of elite AI and prestige design. 
              Crafting legacies, one name at a time.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 clay-surface-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-colors border-none shadow-[4px_4px_10px_rgba(0,0,0,0.4),-2px_-2px_6px_rgba(255,255,255,0.02)]"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
            {footerLinks.map((group, index) => (
              <div key={index} className="flex flex-col gap-6">
                <h3 className="text-sm font-black text-primary uppercase tracking-[0.2em]">{group.title}</h3>
                <ul className="flex flex-col gap-4">
                  {group.links.map((link, lIndex) => (
                    <li key={lIndex}>
                      <a 
                        href={link.href} 
                        className="text-muted-foreground hover:text-white transition-colors font-semibold text-lg hover:translate-x-1 inline-block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-gold-dark/5 gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-muted-foreground font-bold text-[10px] xs:text-xs md:text-sm tracking-wide text-center md:text-left whitespace-nowrap">
              © {currentYear} AURANAMES. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-dark/30 hidden md:block" />
              <p className="text-muted-foreground/60 text-[9px] md:text-xs font-black uppercase tracking-[0.1em] whitespace-nowrap">
                Engineered with AI Precision
              </p>
            </div>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-all font-black text-sm uppercase tracking-widest"
          >
            <span>Back to top</span>
            <ArrowUpCircle className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 gold-dots opacity-[0.03] pointer-events-none -z-10" />
    </footer>
  )
}

export default Footer
