"use client"

import { motion } from "framer-motion"
import { Check, Sparkles, Zap, Shield, Crown, Loader2, Coins } from "lucide-react"
import { Navbar } from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useAuthStore } from "@/store/useAuthStore"
import { useWorkspaceStore } from "@/store/useWorkspaceStore"
import { useRouter } from "next/navigation"
import { useState } from "react"

const plans = [
  {
    name: "Starter",
    id: "starter",
    price: 19,
    description: "Perfect for personal projects and new startups.",
    features: [
      "100 AI Generations / mo",
      "5 Active Workspaces",
      "Standard AI Model",
      "Email Support",
      "Basic Name Meanings"
    ],
    icon: <Zap className="w-6 h-6 text-gold" />,
    popular: false
  },
  {
    name: "Pro",
    id: "pro",
    price: 49,
    description: "Elevate your brand with premium AI and more power.",
    features: [
      "Unlimited AI Generations",
      "25 Active Workspaces",
      "GPT-4o Enhanced Model",
      "Priority Support",
      "Detailed Name Definitions",
      "Domain Availability Checks"
    ],
    icon: <Crown className="w-6 h-6 text-gold" />,
    popular: true
  },
  {
    name: "Business",
    id: "business",
    price: 99,
    description: "Full power for agencies and growing enterprises.",
    features: [
      "Unlimited Everything",
      "Unlimited Workspaces",
      "Early Access to New Models",
      "Dedicated Account Manager",
      "Bulk Export Features",
      "Custom Branding Profiles"
    ],
    icon: <Shield className="w-6 h-6 text-gold" />,
    popular: false
  }
]

interface PlanCardProps {
  plan: typeof plans[0];
  user: any;
  currentPlan: string;
}

function PlanCard({ plan, user, currentPlan }: PlanCardProps) {
  const router = useRouter()
  
  const handleAction = () => {
    if (!user) {
      router.push("/auth")
      return
    }

    if (currentPlan === plan.id) return

    // Redirect to USDT payment page
    router.push(`/dashboard/billing/payment?plan=${plan.id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative flex flex-col p-8 rounded-3xl transition-all duration-500
        ${plan.popular 
          ? 'navbar-clay-pill border-gold/30 shadow-[0_20px_50px_rgba(212,175,55,0.15)] scale-105 z-10' 
          : 'clay-card border-white/5 hover:border-gold/20'
        }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-[#0A192F] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <div className="w-12 h-12 rounded-2xl clay-surface flex items-center justify-center mb-6 glow-gold-sm">
          {plan.icon}
        </div>
        <h3 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-2">{plan.name}</h3>
        <p className="text-sm text-muted-foreground min-h-[40px]">{plan.description}</p>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-foreground">${plan.price}</span>
          <span className="text-muted-foreground text-sm">/month</span>
        </div>
      </div>

      <div className="space-y-4 mb-10 flex-1">
        {plan.features.map((feature, fIndex) => (
          <div key={fIndex} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-gold" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">{feature}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleAction}
        className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2
          ${plan.popular 
            ? 'clay-button-gold text-[#0A192F] hover:scale-[1.02]' 
            : 'clay-button text-foreground hover:bg-gold/5'
          }`}
      >
        <>
          {currentPlan === plan.id ? "Current Plan" : "Upgrade with USDT"}
          {currentPlan !== plan.id && <Coins className="w-4 h-4" />}
        </>
      </button>
    </motion.div>
  )
}

export default function PricingPage() {
  const { user } = useAuthStore()
  const { subscription } = useWorkspaceStore()

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Prestige Pricing
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-6"
            >
              Choose Your <span className="gradient-text">Aura</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Unlock the full power of elite AI branding. 
              From new startups to global enterprises, we have a plan that matches your ambition.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PlanCard 
                key={plan.id}
                plan={plan}
                user={user}
                currentPlan={subscription.plan}
              />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <p className="text-muted-foreground text-sm">
              Secure payments powered by <strong>USDT (TRC20)</strong>. 
              Manual verification usually takes 5-30 minutes.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
