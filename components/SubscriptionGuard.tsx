"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import { useWorkspaceStore } from "@/store/useWorkspaceStore"
import { Loader2 } from "lucide-react"

export function SubscriptionGuard({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuthStore()
  const { subscription, loading: workspaceLoading } = useWorkspaceStore()
  const router = useRouter()
  const pathname = usePathname()

  const isPublicPaymentPage = pathname === "/pricing" || pathname.startsWith("/payment")

  useEffect(() => {
    // Wait for both auth and workspace data to load
    if (!authLoading && !workspaceLoading) {
      if (!user) {
        // If not logged in, only redirect if trying to access protected routes
        if (!isPublicPaymentPage) {
          router.push("/auth")
        }
      } else if (subscription.status !== "active") {
        // If logged in but no active subscription, redirect to pricing if on protected routes
        if (!isPublicPaymentPage) {
          router.push("/pricing")
        }
      } else if (subscription.status === "active" && pathname === "/pricing") {
        // If already has active subscription, redirect from pricing to playground
        router.push("/playground")
      }
    }
  }, [user, authLoading, workspaceLoading, subscription, router, pathname, isPublicPaymentPage])

  // Show loading state while checking
  if (authLoading || workspaceLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
        <div className="navbar-clay-pill p-10 max-w-md flex flex-col items-center">
          <Loader2 className="w-10 h-10 text-gold animate-spin mb-4" />
          <h2 className="text-xl font-bold text-gold">Authenticating...</h2>
          <p className="text-muted-foreground mt-2">Checking your prestige status.</p>
        </div>
      </div>
    )
  }

  // Allow access to pricing and payment even if no subscription or not logged in
  if (isPublicPaymentPage) {
    return <>{children}</>
  }

  // If no user or no subscription (and not on pricing/payment), return loader while redirecting
  if (!user || subscription.status !== "active") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}
