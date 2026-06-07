"use client"

import { motion } from "framer-motion"
import { Mail, MessageSquare, MapPin, Send, Loader2 } from "lucide-react"
import { Navbar } from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useState } from "react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]" />
          <div className="absolute inset-0 gold-dots opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-6"
            >
              Get in <span className="gradient-text">Touch</span>
            </motion.h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have a question about our prestige naming services? Our elite support team is here to assist you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="clay-card p-8 border-white/5">
                  <div className="w-12 h-12 rounded-2xl clay-surface flex items-center justify-center mb-6 text-gold">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Email Us</h3>
                  <p className="text-muted-foreground text-sm">concierge@auranames.ai</p>
                </div>
                <div className="clay-card p-8 border-white/5">
                  <div className="w-12 h-12 rounded-2xl clay-surface flex items-center justify-center mb-6 text-gold">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                  <p className="text-muted-foreground text-sm">Available 24/7 for Pro members</p>
                </div>
              </div>

              <div className="clay-card p-8 border-white/5">
                <div className="w-12 h-12 rounded-2xl clay-surface flex items-center justify-center mb-6 text-gold">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Headquarters</h3>
                <p className="text-muted-foreground text-sm">123 Prestige Avenue, Silicon Valley, CA 94025</p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="navbar-clay-pill p-8 md:p-10 border-gold/10">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="w-10 h-10 text-gold" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent</h3>
                    <p className="text-muted-foreground">Thank you for reaching out. We will get back to you shortly.</p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-8 text-gold font-bold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gold/60 ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-5 py-4 clay-input text-foreground placeholder:text-muted-foreground outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gold/60 ml-1">Email Address</label>
                      <input 
                        required
                        type="email" 
                        className="w-full px-5 py-4 clay-input text-foreground placeholder:text-muted-foreground outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gold/60 ml-1">Message</label>
                      <textarea 
                        required
                        rows={4}
                        className="w-full px-5 py-4 clay-input text-foreground placeholder:text-muted-foreground outline-none resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 clay-button-gold text-[#0A192F] font-bold flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
