"use client"

import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, isFirebaseConfigured } from "@/lib/firebase"
import { useAuthStore } from "@/store/useAuthStore"

/**
 * Synchronizes Firebase authentication state with the app's auth store and conditionally renders UI.
 *
 * Registers an `onAuthStateChanged` listener (when Firebase is configured) to update `setUser` and `setLoading` in the auth store, and unsubscribes on cleanup. If Firebase is not configured, sets loading to `false` and renders an instructional full-screen message prompting the developer to add Firebase credentials.
 *
 * @param children - The content to render when Firebase is configured
 * @returns The `children` when Firebase is configured; otherwise a full-screen informational UI prompting for Firebase credentials
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore()

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [setUser, setLoading])

  if (!isFirebaseConfigured) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
        <div className="navbar-clay-pill p-10 max-w-md">
          <h2 className="text-2xl font-bold text-gold mb-4">Firebase Not Configured</h2>
          <p className="text-muted-foreground mb-6">
            Please add your Firebase credentials to <code className="text-gold">.env.local</code> to enable authentication and the playground.
          </p>
          <div className="text-xs text-left bg-black/30 p-4 rounded-lg overflow-x-auto">
            <pre>
              NEXT_PUBLIC_FIREBASE_API_KEY=...{"\n"}
              NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>
}
