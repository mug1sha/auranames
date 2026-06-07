"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Loader2, ArrowRight, AlertCircle } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, Suspense, useCallback } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { Navbar } from "@/components/Navbar"
import Footer from "@/components/Footer"

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuthStore()
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [errorMessage, setErrorMessage] = useState("")

  const transaction_id = searchParams.get('transaction_id')
  const plan = searchParams.get('plan')

  const verifyPayment = useCallback(async () => {
    try {
      const response = await fetch('/api/payment/verify', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          transaction_id, 
          plan, 
          userId: user?.uid 
        })
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMessage(data.error || "Verification failed")
      }
    } catch (err: any) {
      setStatus('error')
      setErrorMessage("Connection error during verification.")
    }
  }, [transaction_id, plan, user])

  useEffect(() => {
    if (!authLoading && user && transaction_id && plan) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      verifyPayment()
    }
  }, [authLoading, user, transaction_id, plan, verifyPayment])

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="navbar-clay-pill p-10 flex flex-col items-center text-center">
        {status === 'verifying' && (
          <>
            <Loader2 className="w-16 h-16 text-gold animate-spin mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-4 font-[family-name:var(--font-playfair)]">Verifying Payment</h2>
            <p className="text-muted-foreground">Please wait while we finalize your prestige subscription.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/30"
            >
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </motion.div>
            <h2 className="text-3xl font-bold text-foreground mb-4 font-[family-name:var(--font-playfair)]">Payment Successful 🎉</h2>
            <p className="text-muted-foreground mb-8">
              Your <span className="text-gold font-bold uppercase tracking-wider">{plan}</span> subscription is now active. 
              Legacy starts today.
            </p>
            <button
              onClick={() => router.push('/playground')}
              className="w-full py-4 clay-button-gold text-[#0A192F] font-bold flex items-center justify-center gap-2 group"
            >
              Go To Playground
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6 border border-destructive/20">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-[family-name:var(--font-playfair)]">Verification Issue</h2>
            <p className="text-muted-foreground mb-8">{errorMessage}</p>
            <div className="flex flex-col w-full gap-3">
              <button
                onClick={() => verifyPayment()}
                className="w-full py-4 clay-button text-foreground font-bold"
              >
                Retry Verification
              </button>
              <button
                onClick={() => router.push('/pricing')}
                className="w-full py-2 text-gold text-sm font-medium hover:underline"
              >
                Back to Pricing
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />
          <div className="absolute inset-0 gold-dots opacity-10" />
        </div>
        
        <Suspense fallback={<Loader2 className="w-10 h-10 text-gold animate-spin" />}>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
