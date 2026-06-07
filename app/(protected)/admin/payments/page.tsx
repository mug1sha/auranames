"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, onSnapshot, doc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore"
import { useAuthStore } from "@/store/useAuthStore"
import { Navbar } from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Loader2, Check, X, Search, ExternalLink, Mail, User, Hash, DollarSign } from "lucide-react"

// Simple admin check for MVP
const ADMIN_EMAILS = ["godson.mugisha2015@gmail.com", "admin@auranames.ai"]

export default function AdminPaymentsPage() {
  const { user } = useAuthStore()
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !ADMIN_EMAILS.includes(user.email || "")) {
      const timer = setTimeout(() => setLoading(false), 0)
      return () => clearTimeout(timer)
    }

    const q = query(collection(db, "payments"), orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const p = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setPayments(p)
      setLoading(false)
    }, (error) => {
      console.error("Admin payments listener error:", error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user])

  const handleVerify = async (payment: any) => {
    setActionLoading(payment.id)
    try {
      // 1. Update Payment Status
      const paymentRef = doc(db, "payments", payment.id)
      await updateDoc(paymentRef, {
        status: "VERIFIED",
        verifiedAt: serverTimestamp(),
        verifiedBy: user?.email
      })

      // 2. Update User Subscription
      const userRef = doc(db, "users", payment.userId)
      const startDate = new Date()
      const endDate = new Date()
      endDate.setDate(startDate.getDate() + 30) // 30 days subscription

      await updateDoc(userRef, {
        subscription: {
          plan: payment.plan,
          status: "active",
          startDate: Timestamp.fromDate(startDate),
          endDate: Timestamp.fromDate(endDate),
          transactionId: payment.txHash
        },
        lastUpdated: serverTimestamp()
      })

      alert("Payment verified and subscription activated!")
    } catch (err) {
      console.error("Verification error:", err)
      alert("Failed to verify payment")
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (payment: any) => {
    const reason = prompt("Enter rejection reason:")
    if (reason === null) return

    setActionLoading(payment.id)
    try {
      const paymentRef = doc(db, "payments", payment.id)
      await updateDoc(paymentRef, {
        status: "REJECTED",
        rejectionReason: reason,
        rejectedAt: serverTimestamp(),
        rejectedBy: user?.email
      })
      alert("Payment rejected")
    } catch (err) {
      console.error("Rejection error:", err)
      alert("Failed to reject payment")
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-gold animate-spin" />
        </main>
      </div>
    )
  }

  if (!user || !ADMIN_EMAILS.includes(user.email || "")) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="navbar-clay-pill p-10 max-w-md">
            <h2 className="text-2xl font-bold text-destructive mb-4">Access Denied</h2>
            <p className="text-muted-foreground">You do not have permission to access the prestige admin dashboard.</p>
          </div>
        </main>
      </div>
    )
  }

  const filteredPayments = payments.filter(p => 
    p.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.txHash?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]" />
          <div className="absolute inset-0 gold-dots opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-2">Payment <span className="gradient-text">Administration</span></h1>
              <p className="text-muted-foreground">Review and verify USDT subscription transfers.</p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search by ref, email, or hash..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-11 pr-6 py-3 clay-input text-sm w-full md:w-80 outline-none"
              />
            </div>
          </div>

          <div className="grid gap-6">
            {filteredPayments.length === 0 ? (
              <div className="navbar-clay-pill p-20 text-center">
                <p className="text-muted-foreground">No payment records found.</p>
              </div>
            ) : (
              filteredPayments.map((payment) => (
                <motion.div
                  layout
                  key={payment.id}
                  className={`navbar-clay-pill p-6 md:p-8 border ${
                    payment.status === 'VERIFIED' ? 'border-green-500/20' : 
                    payment.status === 'REJECTED' ? 'border-destructive/20' : 
                    'border-gold/20'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row gap-8 justify-between">
                    <div className="space-y-6 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-black uppercase tracking-widest">
                          {payment.reference}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          payment.status === 'VERIFIED' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 
                          payment.status === 'REJECTED' ? 'bg-destructive/10 border-destructive/20 text-destructive' : 
                          'bg-gold/10 border-gold/20 text-gold animate-pulse'
                        }`}>
                          {payment.status}
                        </div>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">
                          {payment.createdAt?.toDate().toLocaleString()}
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="flex items-start gap-3">
                          <Mail className="w-4 h-4 text-gold shrink-0 mt-1" />
                          <div>
                            <p className="text-[10px] uppercase font-black text-muted-foreground tracking-tighter">User Email</p>
                            <p className="text-sm font-bold truncate max-w-[200px]">{payment.userEmail}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <DollarSign className="w-4 h-4 text-gold shrink-0 mt-1" />
                          <div>
                            <p className="text-[10px] uppercase font-black text-muted-foreground tracking-tighter">Amount / Plan</p>
                            <p className="text-sm font-bold uppercase">{payment.amount} {payment.currency} ({payment.plan})</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Hash className="w-4 h-4 text-gold shrink-0 mt-1" />
                          <div>
                            <p className="text-[10px] uppercase font-black text-muted-foreground tracking-tighter">Network</p>
                            <p className="text-sm font-bold uppercase">{payment.network}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-black/30 rounded-2xl border border-white/5 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] uppercase font-black text-gold tracking-widest">Transaction Hash (TXID)</p>
                          <a 
                            href={`https://tronscan.org/#/transaction/${payment.txHash}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] text-muted-foreground hover:text-gold transition-colors flex items-center gap-1 font-bold"
                          >
                            View on TronScan <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <p className="text-xs font-mono break-all text-muted-foreground">{payment.txHash}</p>
                      </div>
                    </div>

                    <div className="flex lg:flex-col gap-3 justify-center lg:min-w-[160px]">
                      {payment.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleVerify(payment)}
                            disabled={actionLoading !== null}
                            className="flex-1 lg:flex-none py-3 px-6 rounded-xl bg-green-500 text-[#0A192F] font-bold text-sm flex items-center justify-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
                          >
                            {actionLoading === payment.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(payment)}
                            disabled={actionLoading !== null}
                            className="flex-1 lg:flex-none py-3 px-6 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 font-bold text-sm flex items-center justify-center gap-2 hover:bg-destructive/20 transition-all disabled:opacity-50"
                          >
                            <X className="w-4 h-4" />
                            Reject
                          </button>
                        </>
                      )}
                      
                      {(payment.status === 'VERIFIED' || payment.status === 'REJECTED') && (
                        <div className="text-center p-4">
                          <p className="text-[10px] uppercase font-black text-muted-foreground mb-1">Processed By</p>
                          <p className="text-xs font-bold text-foreground truncate max-w-[150px]">{payment.verifiedBy || payment.rejectedBy}</p>
                          {payment.rejectionReason && (
                            <p className="mt-2 text-[10px] text-destructive italic">&quot;{payment.rejectionReason}&quot;</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
