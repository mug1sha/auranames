"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { auth } from "@/lib/firebase"
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

const floatingNames = [
  "NovaFlow",
  "Brandora",
  "AuraForge",
  "Lumexa",
  "CodeNest"
]

/**
 * Authentication page component that provides Google and email/password sign-in and signup flows.
 *
 * Renders a two-column layout (animated hero panel on larger screens and an auth card) and manages
 * local state for email, password, login mode, and error messages. Handles three authentication
 * flows: Google sign-in via a popup, email/password sign-in, and email/password account creation.
 * On successful authentication, the AuthProvider's state listener handles navigation or store updates.
 * Authentication errors are captured and displayed in the UI.
 *
 * @returns The authentication page JSX element.
 */
export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    if (isLoading) return
    setIsLoading(true)
    setError("")
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      router.push("/playground")
    } catch (err: any) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return
    setIsLoading(true)
    setError("")
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
      }
      router.push("/playground")
    } catch (err: any) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-background">
      {/* Left Side - Hero Aesthetic */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden border-r border-gold/10">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/8 rounded-full blur-[100px] animate-blob"
          />
          <div className="absolute inset-0 gold-dots opacity-30" />
          <div className="absolute top-1/3 left-0 right-0 gold-line opacity-20" />
        </div>

        {/* Floating 3D Clay Logo Area */}
        <div className="relative z-10 w-full max-w-lg aspect-square">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-gold/20"
          />
          
          <motion.div
            animate={{ 
              rotateY: [0, 8, 0, -8, 0],
              rotateX: [0, -5, 0, 5, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-20 clay-surface flex items-center justify-center overflow-hidden"
            style={{ 
              transformStyle: "preserve-3d",
              borderRadius: "35% 65% 65% 35% / 35% 35% 65% 65%",
            }}
          >
            <div className="absolute inset-0 animate-shimmer opacity-50" />
            <div className="text-center p-8 relative z-10">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold/30 to-gold-dark/20 flex items-center justify-center glow-gold-sm"
              >
                <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </motion.div>
              <div className="text-2xl font-bold mb-2 font-[family-name:var(--font-playfair)]">
                <span className="gradient-text">Aura</span><span className="text-white">Names</span>
              </div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Prestige AI</div>
            </div>
          </motion.div>

          {/* Floating Generated Names */}
          <AnimatePresence>
            {floatingNames.map((name, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [-10, 10, -10],
                  x: index % 2 === 0 ? [-5, 5, -5] : [5, -5, 5]
                }}
                transition={{ 
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 },
                  x: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 },
                  opacity: { duration: 1 },
                  scale: { duration: 1 }
                }}
                className={`absolute clay-surface-sm px-4 py-2 text-gold font-bold text-sm glow-border-gold
                  ${index === 0 ? 'top-10 left-0' : ''}
                  ${index === 1 ? 'top-20 right-0' : ''}
                  ${index === 2 ? 'bottom-10 left-10' : ''}
                  ${index === 3 ? 'bottom-20 right-10' : ''}
                  ${index === 4 ? 'top-1/2 -right-4' : ''}
                `}
              >
                {name}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Side - Auth Card */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
        {/* Mobile Background Effects */}
        <div className="lg:hidden absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 left-0 w-full h-full gold-dots opacity-20" />
          <div className="absolute top-1/4 -left-1/4 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[80px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="navbar-clay-pill p-8 md:p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-2">Welcome Back</h2>
              <p className="text-muted-foreground">Continue building unforgettable brands.</p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-4 clay-button flex items-center justify-center gap-3 text-foreground font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.27l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                  </>
                )}
              </motion.button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gold/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#0D1A30] px-2 text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-5 py-4 clay-input text-foreground placeholder:text-muted-foreground outline-none disabled:opacity-50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-5 py-4 clay-input text-foreground placeholder:text-muted-foreground outline-none disabled:opacity-50"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 clay-button-gold text-[#0A192F] font-bold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    isLogin ? "Sign In" : "Create Account"
                  )}
                </motion.button>
              </form>

              <div className="text-center mt-6">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-gold hover:text-gold-light transition-colors font-medium"
                >
                  {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
