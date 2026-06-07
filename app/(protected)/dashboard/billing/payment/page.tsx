"use client"

import { motion } from "framer-motion"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { Navbar } from "@/components/Navbar"
import Footer from "@/components/Footer"
import { PLANS, PAYMENT_METHODS } from "@/lib/payment-config"
import { useAuthStore } from "@/store/useAuthStore"
import { useWorkspaceStore } from "@/store/useWorkspaceStore"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { Loader2, Copy, Check, ExternalLink, Info, ShieldCheck, AlertCircle } from "lucide-react"

function PaymentContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuthStore()
  const requestedPlan = searchParams.get('plan')
  const resolvedPlanId: keyof typeof PLANS = (requestedPlan && requestedPlan in PLANS) 
    ? (requestedPlan as keyof typeof PLANS) 
    : "pro"
  const plan = PLANS[resolvedPlanId]
  
  const [txHash, setTxHash] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [reference] = useState(() => `AURA-${Math.random().toString(36).substring(2, 10).toUpperCase()}`)
  const [error, setError] = useState("")

  const copyToClipboard = () => {
    navigator.clipboard.writeText(PAYMENT_METHODS.USDT_TRC20.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!txHash.trim()) {
      setError("Please enter your transaction hash")
      return
    }

    if (!user) return

    setIsSubmitting(true)
    setError("")

    try {
      await addDoc(collection(db, "payments"), {
        userId: user.uid,
        userEmail: user.email,
        reference,
        plan: resolvedPlanId,
        amount: plan.price,
        currency: "USDT",
        network: "TRC20",
        txHash: txHash.trim(),
        status: "PENDING",
        createdAt: serverTimestamp(),
      })

      // Redirect to a "Under Review" or Success page
      router.push("/dashboard/billing/status?ref=" + reference)
    } catch (err: any) {
      console.error("Payment submission error:", err)
      setError("Failed to submit payment details. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto w-full px-6">
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4"
        >
          Finalize Your <span className="gradient-text">Subscription</span>
        </motion.h1>
        <p className="text-muted-foreground">Complete the USDT transfer to activate your {plan.name} plan.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 items-start">
        {/* Payment Details */}
        <div className="lg:col-span-3 space-y-6">
          <div className="navbar-clay-pill p-8 space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-gold/10">
              <div>
                <p className="text-xs uppercase tracking-widest text-gold font-bold mb-1">Selected Plan</p>
                <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-gold font-bold mb-1">Total Amount</p>
                <p className="text-3xl font-black text-foreground">{plan.usdtAmount} USDT</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-gold/5 rounded-2xl border border-gold/10 flex items-start gap-4">
                <Info className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground leading-relaxed">
                  Please send exactly <span className="text-foreground font-bold">{plan.usdtAmount} USDT</span> using the <span className="text-foreground font-bold">TRC20 (Tron) Network</span>. Sending via other networks or other currencies may result in permanent loss of funds.
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Wallet Address (TRC20)</label>
                <div className="flex gap-2">
                  <div className="flex-1 px-5 py-4 clay-input text-foreground font-mono text-sm break-all flex items-center">
                    {PAYMENT_METHODS.USDT_TRC20.address}
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className="p-4 clay-button text-gold hover:scale-105 transition-transform"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Network</p>
                  <div className="px-5 py-3 clay-surface-sm text-foreground font-bold text-sm">
                    {PAYMENT_METHODS.USDT_TRC20.network}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Payment Reference</p>
                  <div className="px-5 py-3 clay-surface-sm text-gold font-bold text-sm">
                    {reference}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            Your transaction is secure and will be manually verified by our elite team.
          </div>
        </div>

        {/* Verification Form */}
        <div className="lg:col-span-2">
          <div className="navbar-clay-pill p-8 border-gold/20">
            <h3 className="text-xl font-bold mb-6 font-[family-name:var(--font-playfair)]">Verify Payment</h3>
            <p className="text-sm text-muted-foreground mb-8">
              Once you have sent the USDT, paste your transaction hash (TXID) below to submit for verification.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gold/60 ml-1">Transaction Hash (TXID)</label>
                <input 
                  required
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  type="text" 
                  className="w-full px-5 py-4 clay-input text-foreground placeholder:text-muted-foreground outline-none text-sm font-mono"
                  placeholder="Paste your TXID here..."
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 clay-button-gold text-[#0A192F] font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit for Review"}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gold/10">
              <button 
                onClick={() => router.back()}
                className="text-xs text-muted-foreground hover:text-gold transition-colors flex items-center gap-2 mx-auto"
              >
                Change Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[180px]" />
          <div className="absolute inset-0 gold-dots opacity-10" />
        </div>
        
        <Suspense fallback={
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="w-12 h-12 text-gold animate-spin" />
          </div>
        }>
          <PaymentContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
