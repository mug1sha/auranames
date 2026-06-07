"use client"

import { motion } from "framer-motion"
import { XCircle, ArrowLeft, RefreshCcw } from "lucide-react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function PaymentFailedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />
          <div className="absolute inset-0 gold-dots opacity-10" />
        </div>

        <div className="max-w-md w-full mx-auto relative z-10">
          <div className="navbar-clay-pill p-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              type="spring"
              className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6 border border-destructive/20"
            >
              <XCircle className="w-10 h-10 text-destructive" />
            </motion.div>

            <h2 className="text-3xl font-bold text-foreground mb-4 font-[family-name:var(--font-playfair)]">Payment Failed</h2>
            <p className="text-muted-foreground mb-8">
              We couldn&apos;t process your transaction. Your prestige status remains unchanged. 
              No funds were debited if you see this message.
            </p>

            <div className="flex flex-col w-full gap-4">
              <button
                onClick={() => router.push('/pricing')}
                className="w-full py-4 clay-button-gold text-[#0A192F] font-bold flex items-center justify-center gap-2 group"
              >
                <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                Try Again
              </button>
              
              <button
                onClick={() => router.push('/')}
                className="w-full py-4 clay-button text-foreground font-bold flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </div>
            
            <p className="mt-8 text-xs text-muted-foreground italic">
              If you believe this is an error, please contact support with your transaction reference.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
