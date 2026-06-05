"use client"

import { motion } from "framer-motion"
import { useWorkspaceStore } from "@/store/useWorkspaceStore"
import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { 
  Plus, 
  MessageSquare, 
  Star, 
  Settings, 
  User, 
  LogOut,
  Sparkles
} from "lucide-react"

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { sessions, activeSessionId, setActiveSession, addSession } = useWorkspaceStore()
  const { user, setUser } = useAuthStore()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut(auth)
    setUser(null)
    router.push("/auth")
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-gold/10 flex flex-col bg-[#060F1F] z-20">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="navbar-logo-clay p-2">
              <Sparkles className="w-5 h-5 text-[#0A192F]" />
            </div>
            <span className="text-xl font-bold font-[family-name:var(--font-playfair)] gradient-text">AuraNames</span>
          </div>

          <button 
            onClick={() => addSession("New Session")}
            className="w-full flex items-center justify-center gap-2 py-3 clay-button text-foreground font-bold text-sm mb-6"
          >
            <Plus className="w-4 h-4" />
            New Session
          </button>

          <div className="space-y-1 flex-1 overflow-y-auto no-scrollbar">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold px-3 mb-2">Recent Sessions</div>
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setActiveSession(session.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                  ${activeSessionId === session.id 
                    ? 'navbar-link-pill text-gold' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-gold/5'
                  }`}
              >
                <MessageSquare className={`w-4 h-4 ${activeSessionId === session.id ? 'text-gold' : 'text-muted-foreground group-hover:text-gold/70'}`} />
                <span className="text-sm font-medium truncate">{session.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-4 space-y-1 border-t border-gold/5">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-gold/5 transition-all">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Favorites</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-gold/5 transition-all">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">Settings</span>
          </button>
          
          <div className="pt-2">
            <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-gold/5 border border-gold/10 mb-2">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center border border-gold/30">
                <User className="w-4 h-4 text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-foreground truncate">{user?.email?.split('@')[0] || 'User'}</div>
                <div className="text-[10px] text-muted-foreground truncate">Pro Member</div>
              </div>
            </div>
            
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col overflow-hidden">
        {/* Background blobs for main area */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] opacity-30" />
          <div className="absolute inset-0 gold-dots opacity-10" />
        </div>
        
        {children}
      </main>
    </div>
  )
}
