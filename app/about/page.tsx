"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/Navbar"
import Footer from "@/components/Footer"
import { 
  Zap, 
  Brain, 
  Target, 
  Sparkles, 
  Building2, 
  ShoppingBag, 
  PawPrint, 
  Baby,
  Lightbulb,
  CheckCircle2,
  Award
} from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-gold/30">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          {/* Large floating 3D clay version of the AuraNames "A" logo */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-12 clay-surface flex items-center justify-center relative group"
            style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
          >
            <div className="absolute inset-0 animate-shimmer opacity-30 rounded-full" />
            <span className="text-6xl md:text-7xl font-black gradient-text font-[family-name:var(--font-playfair)]">A</span>
            
            {/* Outer rings */}
            <div className="absolute -inset-4 border border-gold/10 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute -inset-8 border border-gold/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-balance font-[family-name:var(--font-playfair)]"
          >
            More Than Names. <br className="hidden md:block" />
            We Create <span className="gradient-text">First Impressions.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            AuraNames combines creativity and artificial intelligence to help founders, creators, families, and dreamers discover names that are memorable, meaningful, and built to stand out.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <Link href="/" className="px-10 py-5 clay-button-gold text-lg font-bold">
              Start Generating
            </Link>
            <button className="px-10 py-5 clay-button text-foreground font-bold text-lg">
              Explore Examples
            </button>
          </motion.div>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            {...fadeInUp}
            className="clay-card p-10 md:p-20 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[80px] -z-10 group-hover:bg-gold/10 transition-colors duration-500" />
            
            <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-8">Why AuraNames Exists</h2>
            <div className="space-y-6 text-xl md:text-2xl text-foreground font-medium leading-relaxed">
              <p>Finding the perfect name is one of the hardest parts of creating something new.</p>
              <p>Whether you&apos;re launching a startup, naming a product, welcoming a pet, or choosing a name for a child, the right name creates identity, emotion, and recognition.</p>
              <p className="text-muted-foreground">AuraNames was created to make that process easier through intelligent AI-powered creativity.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-24 md:py-40 bg-navy-dark/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <motion.div {...fadeInUp}>
              <h2 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-playfair)] mb-6">Our Mission</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-gold to-transparent rounded-full" />
            </motion.div>
            
            <motion.div 
              {...fadeInUp}
              className="space-y-8"
            >
              <p className="text-2xl md:text-3xl font-bold leading-tight">
                We believe everyone deserves access to great naming ideas.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                Our mission is to help people discover names that feel authentic, memorable, and aligned with their vision through accessible AI technology.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: <Zap className="text-gold" size={28} />, title: "Fast Generation", desc: "Generate dozens of naming ideas within seconds." },
              { icon: <Brain className="text-gold" size={28} />, title: "AI-Powered Creativity", desc: "Combines language intelligence with creative naming patterns." },
              { icon: <Target className="text-gold" size={28} />, title: "Purpose-Driven Names", desc: "Names tailored for businesses, products, pets, and children." },
              { icon: <Sparkles className="text-gold" size={28} />, title: "Premium Experience", desc: "Beautiful design and effortless user experience." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="clay-card p-8 group cursor-default"
              >
                <div className="w-14 h-14 clay-surface-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHO IT'S FOR SECTION */}
      <section className="py-24 md:py-40 relative">
        <div className="absolute inset-0 gold-dots opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.h2 
            {...fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center mb-20 font-[family-name:var(--font-playfair)]"
          >
            Who It&apos;s For
          </motion.h2>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: <Building2 />, title: "Entrepreneurs", desc: "Launch startups and businesses with confidence." },
              { icon: <ShoppingBag />, title: "Product Creators", desc: "Discover memorable product names." },
              { icon: <PawPrint />, title: "Pet Owners", desc: "Find unique names for your companions." },
              { icon: <Baby />, title: "Families", desc: "Explore meaningful names for children." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="clay-surface-sm p-8 text-center hover:scale-[1.03] transition-all duration-300 border-none shadow-[10px_10px_30px_rgba(0,0,0,0.4),-5px_-5px_15px_rgba(255,255,255,0.02)]"
              >
                <div className="text-gold mb-6 flex justify-center scale-125">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-24 md:py-40 bg-navy-light/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-10"
          >
            {[
              { icon: <Lightbulb />, title: "Creativity", desc: "Every great name begins with imagination." },
              { icon: <CheckCircle2 />, title: "Simplicity", desc: "Complex problems deserve simple solutions." },
              { icon: <Award />, title: "Excellence", desc: "Quality over quantity in every experience." }
            ].map((value, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="clay-card p-12 relative overflow-hidden"
              >
                <div className="text-gold/10 absolute -top-4 -right-4 scale-[3] rotate-12">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-6 relative z-10">{value.title}</h3>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed relative z-10">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 md:py-52 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 font-[family-name:var(--font-playfair)]">
              Ready to Find the <br /> <span className="gradient-text">Perfect Name?</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium">
              Generate unique names instantly and bring your ideas to life.
            </p>
            <Link 
              href="/" 
              className="inline-block px-12 py-6 clay-button-gold text-xl font-black glow-gold transition-all hover:scale-105"
            >
              Generate Names Now
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
