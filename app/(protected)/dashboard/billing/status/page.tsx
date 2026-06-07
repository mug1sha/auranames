"use client"

import { motion } from "framer-motion"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { Navbar } from "@/components/Navbar"
import Footer from "@/components/Footer"
import { db } from "@/lib/firebase"
import { collection, query, where, onSnapshot, limit } from "firebase/firestore"
import { Loader2, Clock, CheckCircle2, XCircle, ArrowRight, Search, Sparkles } from "lucide-react"

function StatusContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const ref = searchParams.get('ref')
  
  const [payment, setPayment] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!ref) {
      const timer = setTimeout(() => setLoading(false), 0)
      return () => clearTimeout(timer)
    }

    const q = query(
      collection(db, "payments"),
      where("reference", "==", ref),
      limit(1)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setPayment(snapshot.docs[0].data())
      } else {
        setPayment(null)
      }
      setLoading(false)
    }, (error) => {
      console.error("Status listener error:", error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [ref])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[40vh]">
        <Loader2 className="w-12 h-12 text-gold animate-spin mb-4" />
        <p className="text-muted-foreground">Retrieving transaction status...</p>
      </div>
    )
  }

  if (!ref || (!payment && !loading)) {
    return (
      <div className="max-w-md mx-auto navbar-clay-pill p-10 text-center">
        <Search className="w-16 h-16 text-gold/20 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4">Transaction Not Found</h2>
        <p className="text-muted-foreground mb-8">We couldn&apos;t find a payment record with reference <span className="text-gold font-mono">{ref || 'N/A'}</span>.</p>
        <button 
          onClick={() => router.push('/pricing')}
          className="w-full py-4 clay-button text-foreground font-bold"
        >
          Back to Pricing
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="navbar-clay-pill p-10 text-center relative overflow-hidden">
        {payment.status === 'PENDING' && (
          <>
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20">
              <Clock className="w-10 h-10 text-gold animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold mb-2 font-[family-name:var(--font-playfair)]">Under Review</h2>
            <div className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-black uppercase tracking-widest mb-6">
              Status: Pending
            </div>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Your payment for the <span className="text-foreground font-bold uppercase">{payment.plan}</span> plan is being verified by our elite team. This usually takes 5-30 minutes.
            </p>
            <div className="bg-black/20 rounded-2xl p-4 mb-8 text-left space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Reference:</span>
                <span className="text-gold font-mono">{payment.reference}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Amount:</span>
                <span className="text-foreground font-bold">{payment.amount} USDT</span>
              </div>
            </div>
            <button 
              onClick={() => router.push('/playground')}
              className="w-full py-4 clay-button text-foreground font-bold flex items-center justify-center gap-2 group"
            >
              Continue to Playground
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-6 text-[10px] text-muted-foreground italic">
              We will automatically notify you once your prestige status is active.
            </p>
          </>
        )}

        {payment.status === 'VERIFIED' && (
          <>
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2 font-[family-name:var(--font-playfair)]">Payment Verified</h2>
            <div className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest mb-6">
              Status: Success
            </div>
            <p className="text-muted-foreground text-sm mb-8">
              Welcome to the elite. Your <span className="text-foreground font-bold uppercase">{payment.plan}</span> subscription is now active.
            </p>
            <button 
              onClick={() => router.push('/playground')}
              className="w-full py-4 clay-button-gold text-[#0A192F] font-bold flex items-center justify-center gap-2"
            >
              Enter Playground
              <Sparkles className="w-4 h-4" />
            </button>
          </>
        )}

        {payment.status === 'REJECTED' && (
          <>
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-destructive/20">
              <XCircle className="w-10 h-10 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold mb-2 font-[family-name:var(--font-playfair)]">Payment Rejected</h2>
            <div className="inline-block px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-black uppercase tracking-widest mb-6">
              Status: Failed
            </div>
            <p className="text-muted-foreground text-sm mb-8">
              We couldn&apos;t verify your transaction. This might be due to an incorrect TXID or amount.
            </p>
            <button 
              onClick={() => router.push('/pricing')}
              className="w-full py-4 clay-button text-foreground font-bold"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 relative overflow-hidden flex items-center justify-center">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />
          <div className="absolute inset-0 gold-dots opacity-10" />
        </div>
        
        <Suspense fallback={<Loader2 className="w-10 h-10 text-gold animate-spin" />}>
          <StatusContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
