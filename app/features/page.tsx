"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/Navbar"
import Footer from "@/components/Footer"
import { 
  Zap, 
  Brain, 
  Target, 
  Sparkles, 
  Globe, 
  MousePointer2, 
  Palette,
  Check,
  X,
  Plus,
  Copy,
  Heart,
  RefreshCw,
  Baby,
  PawPrint,
  Building2,
  ShoppingBag
} from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
}

/**
 * Renders the Features marketing page for AuraNames, including the animated hero, seven feature sections, a comparison table, and final CTA with Navbar and Footer.
 *
 * @returns The page's JSX element.
 */
export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-gold/30">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px]" />
          <div className="absolute inset-0 gold-dots opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-10 clay-surface flex items-center justify-center relative glow-gold-sm"
            style={{ borderRadius: "24% 76% 35% 65% / 49% 30% 70% 51%" }}
          >
            <span className="text-5xl md:text-6xl font-black gradient-text font-[family-name:var(--font-playfair)]">A</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 font-[family-name:var(--font-playfair)] text-balance"
          >
            Generate Names That <br className="hidden md:block" /> 
            People <span className="gradient-text">Remember</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Discover names powered by AI, refined for creativity, and designed to make a lasting impression.
          </motion.p>
        </div>
      </section>

      {/* FEATURE #1: AI-Powered Name Generation */}
      <section className="py-24 md:py-40 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp} className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 clay-surface-sm mb-6">
                <Zap size={16} className="text-gold" />
                <span className="text-xs font-black uppercase tracking-widest text-gold">Feature #1</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-[family-name:var(--font-playfair)]">AI-Powered Name Generation</h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed font-medium">
                Generate unique names in seconds using advanced AI trained to understand creativity, branding, and language patterns.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <Check size={18} className="text-gold" />, label: "Instant results" },
                  { icon: <Check size={18} className="text-gold" />, label: "Smart suggestions" },
                  { icon: <Check size={18} className="text-gold" />, label: "Creative combinations" },
                  { icon: <Check size={18} className="text-gold" />, label: "Market-ready ideas" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 clay-surface-sm p-4 text-sm font-bold">
                    {item.icon}
                    {item.label}
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="order-1 lg:order-2 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square">
                {/* AI Orb Animation */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: 360
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-gold/20"
                />
                <motion.div 
                  animate={{ 
                    scale: [1.1, 1, 1.1],
                    rotate: -360
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 rounded-full border border-gold/10"
                />
                
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 40px rgba(255,215,0,0.2)",
                      "0 0 80px rgba(255,215,0,0.4)",
                      "0 0 40px rgba(255,215,0,0.2)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-20 clay-surface flex items-center justify-center overflow-hidden"
                  style={{ borderRadius: "50% 50% 50% 50% / 50% 50% 50% 50%" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-transparent animate-shimmer" />
                  <Brain size={60} className="text-gold" />
                </motion.div>

                {/* Name Cards Appearing */}
                {[
                  { name: "Nexora", top: "5%", left: "10%", delay: 0 },
                  { name: "Auralith", top: "15%", right: "-5%", delay: 1 },
                  { name: "Noventra", bottom: "10%", left: "0%", delay: 2 }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ 
                      opacity: { delay: item.delay, duration: 0.5 },
                      scale: { delay: item.delay, duration: 0.5 },
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: item.delay }
                    }}
                    viewport={{ once: true }}
                    className="absolute clay-card px-6 py-3 font-bold text-sm md:text-base border-gold/30 shadow-gold/10"
                    style={{ top: item.top, bottom: item.bottom, left: item.left, right: item.right }}
                  >
                    {item.name}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE #2: Built For Every Naming Need */}
      <section className="py-24 md:py-40 bg-navy-dark/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 clay-surface-sm mb-6">
              <Target size={16} className="text-gold" />
              <span className="text-xs font-black uppercase tracking-widest text-gold">Feature #2</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-playfair)]">Built For Every Naming Need</h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: <Baby size={32} />, title: "Kids Names", desc: "Meaningful and memorable." },
              { icon: <PawPrint size={32} />, title: "Pet Names", desc: "Fun, unique, and lovable." },
              { icon: <Building2 size={32} />, title: "Business Names", desc: "Professional and brandable." },
              { icon: <ShoppingBag size={32} />, title: "Product Names", desc: "Market-ready and catchy." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="clay-card p-10 text-center hover:scale-[1.05] transition-all duration-300 group"
              >
                <div className="w-16 h-16 mx-auto clay-surface-sm flex items-center justify-center mb-8 text-gold group-hover:glow-gold-sm transition-all">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURE #3: Premium Name Quality */}
      <section className="py-24 md:py-40">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeInUp} className="clay-card p-10 md:p-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[120px] -z-10" />
            
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 clay-surface-sm mb-6">
                <Sparkles size={16} className="text-gold" />
                <span className="text-xs font-black uppercase tracking-widest text-gold">Feature #3</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-playfair)]">Premium Name Quality</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground/60 mb-6 flex items-center gap-2">
                  <X size={14} className="text-red-500" /> Ordinary
                </h3>
                {["Tech Business Solutions", "Global Brand Group", "Pet Name Generator", "Baby Name Ideas"].map((name, i) => (
                  <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-xl text-muted-foreground font-medium opacity-50 italic">
                    {name}
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-gold mb-6 flex items-center gap-2">
                  <Sparkles size={14} /> Aura<span className="text-white">Names</span>
                </h3>
                {["Nexora", "Veliqo", "Auralith", "Noventra"].map((name, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="p-5 clay-surface-sm text-foreground font-bold border-gold/20 shadow-gold/5 flex justify-between items-center group"
                  >
                    <span className="gradient-text">{name}</span>
                    <Sparkles size={16} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURE #4: Intelligent Creativity Engine */}
      <section className="py-24 md:py-40 bg-navy-dark/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <motion.div 
                {...fadeInUp}
                className="relative z-10 clay-card aspect-square p-12 flex flex-col justify-center gap-12"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent animate-shimmer rounded-[inherit]" />
                <h3 className="text-3xl font-bold text-center mb-4">The Aura Engine</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    "Meaning", "Memorability", "Simplicity", "Brand Potential", "Pronunciation", "Uniqueness"
                  ].map((val, i) => (
                    <motion.div 
                      key={val}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
                      <span className="text-sm font-bold text-muted-foreground">{val}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gold/10 text-center">
                  <p className="text-sm text-gold font-black tracking-widest uppercase">Optimized for Recognition</p>
                </div>
              </motion.div>
              
              {/* Decorative circles */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/5 rounded-full blur-[60px]" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold/5 rounded-full blur-[60px]" />
            </div>

            <motion.div {...fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 clay-surface-sm mb-6">
                <Brain size={16} className="text-gold" />
                <span className="text-xs font-black uppercase tracking-widest text-gold">Feature #4</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 font-[family-name:var(--font-playfair)]">Intelligent Creativity Engine</h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium mb-8">
                AuraNames doesn&apos;t just shuffle letters. It analyzes the deeper components of successful branding.
              </p>
              <p className="text-lg text-muted-foreground/80 leading-relaxed font-medium">
                Our engine ensures every generated name is optimized for emotional connection and long-term brand equity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURE #5: One Click Inspiration */}
      <section className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 clay-surface-sm mb-6">
              <MousePointer2 size={16} className="text-gold" />
              <span className="text-xs font-black uppercase tracking-widest text-gold">Feature #5</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-playfair)]">One Click Inspiration</h2>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            className="clay-card max-w-4xl mx-auto overflow-hidden shadow-2xl"
          >
            {/* Mockup Header */}
            <div className="bg-navy-dark/60 p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-green-500/20" />
              </div>
              <div className="clay-surface-sm px-10 py-1 text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                auranames.app/dashboard
              </div>
              <div className="w-10" />
            </div>

            {/* Mockup Content */}
            <div className="p-10 bg-navy-dark/20 min-h-[400px] flex flex-col items-center justify-center gap-12">
              <div className="text-4xl md:text-6xl font-black gradient-text">Veliqo</div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-6 py-3 clay-button-gold flex items-center gap-2 text-sm">
                  <RefreshCw size={16} /> Regenerate
                </button>
                <button className="px-6 py-3 clay-button flex items-center gap-2 text-sm text-foreground">
                  <Copy size={16} /> Copy
                </button>
                <button className="px-6 py-3 clay-button flex items-center gap-2 text-sm text-foreground">
                  <Heart size={16} /> Save
                </button>
              </div>
              
              <div className="w-full max-w-md h-2 bg-navy-light/40 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-full bg-gold/40"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURE #6: Global Naming Possibilities */}
      <section className="py-24 md:py-40 bg-navy-dark/40 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] text-gold animate-[spin_60s_linear_infinite]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div {...fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 clay-surface-sm mb-6">
              <Globe size={16} className="text-gold" />
              <span className="text-xs font-black uppercase tracking-widest text-gold">Feature #6</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 font-[family-name:var(--font-playfair)]">Global Naming Possibilities</h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
              Generate names that work across cultures, industries, and audiences.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {["Startups", "Agencies", "Ecommerce", "Apps", "Communities"].map((tag, i) => (
                <motion.div 
                  key={tag}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="clay-surface-sm py-4 font-black uppercase tracking-tighter text-sm text-gold/80"
                >
                  {tag}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURE #7: Designed To Inspire */}
      <section className="py-24 md:py-40 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 clay-surface-sm mb-6">
                <Palette size={16} className="text-gold" />
                <span className="text-xs font-black uppercase tracking-widest text-gold">Feature #7</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 font-[family-name:var(--font-playfair)]">Designed To Inspire</h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium mb-10">
                A great naming experience should feel as memorable as the names themselves.
              </p>
              
              <div className="space-y-6">
                {[
                  "Clay UI Aesthetics",
                  "Smooth Framer Animations",
                  "Elegant Playfair Typography",
                  "Gold Premium Aesthetic"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 clay-surface-sm flex items-center justify-center text-gold">
                      <Sparkles size={18} />
                    </div>
                    <span className="text-lg font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative">
              <motion.div 
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="clay-card p-1 aspect-video relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent animate-shimmer" />
                <div className="bg-navy-dark w-full h-full rounded-[inherit] flex items-center justify-center">
                  <span className="text-3xl md:text-5xl font-black tracking-tighter text-white/10 select-none">
                    AURANAMES PRESTIGE
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE COMPARISON SECTION */}
      <section className="py-24 md:py-40 bg-navy-dark/20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2 
            {...fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center mb-20 font-[family-name:var(--font-playfair)]"
          >
            How We Compare
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="clay-card overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="p-8 text-sm font-black uppercase tracking-widest text-muted-foreground/60">Feature</th>
                    <th className="p-8 text-sm font-black uppercase tracking-widest text-gold">AuraNames</th>
                    <th className="p-8 text-sm font-black uppercase tracking-widest text-muted-foreground/60">Manual Brainstorming</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { f: "Speed", a: "⚡ Seconds", m: "Hours" },
                    { f: "Creativity", a: "✅ High", m: "Variable" },
                    { f: "Multiple Options", a: "✅ Yes", m: "Limited" },
                    { f: "Inspiration", a: "✅ Unlimited", m: "Limited" },
                    { f: "Consistency", a: "✅ Strong", m: "Inconsistent" }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/2 transition-colors">
                      <td className="p-8 font-bold text-muted-foreground">{row.f}</td>
                      <td className="p-8 font-black text-foreground">{row.a}</td>
                      <td className="p-8 font-medium text-muted-foreground/60">{row.m}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 md:py-52 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 font-[family-name:var(--font-playfair)]">
              Your Next Great <br /> <span className="gradient-text">Name Starts Here</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium">
              Generate memorable names for businesses, products, pets, and children.
            </p>
            <Link 
              href="/" 
              className="inline-block px-12 py-6 clay-button-gold text-xl font-black glow-gold transition-all hover:scale-105"
            >
              Generate Names
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
