"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useWorkspaceStore } from "@/store/useWorkspaceStore"
import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { 
  Plus, 
  MessageSquare, 
  Star, 
  Settings, 
  User, 
  LogOut,
  Sparkles,
  Trash2,
  Edit2,
  Check,
  X,
  Loader2
} from "lucide-react"

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { 
    sessions, 
    activeSessionId, 
    setActiveSession, 
    createSession, 
    fetchSessions, 
    loading,
    updateSessionTitle,
    deleteSession
  } = useWorkspaceStore()
  const { user, setUser } = useAuthStore()
  const router = useRouter()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")

  useEffect(() => {
    if (user) {
      const unsubscribe = fetchSessions(user.uid)
      return () => unsubscribe()
    }
  }, [user, fetchSessions])

  const handleSignOut = async () => {
    await signOut(auth)
    setUser(null)
    router.push("/auth")
  }

  const handleNewSession = async () => {
    const id = await createSession()
    setActiveSession(id)
  }

  const startEditing = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation()
    setEditingId(id)
    setEditTitle(title)
  }

  const saveTitle = async (e: React.FormEvent, id: string) => {
    e.preventDefault()
    if (editTitle.trim()) {
      await updateSessionTitle(id, editTitle)
    }
    setEditingId(null)
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-gold/10 flex flex-col bg-[#060F1F] z-20">
        <div className="p-6 flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 mb-8">
            <div className="navbar-logo-clay p-2">
              <Sparkles className="w-5 h-5 text-[#0A192F]" />
            </div>
            <span className="text-xl font-bold font-[family-name:var(--font-playfair)] gradient-text">AuraNames</span>
          </div>

          <button 
            onClick={handleNewSession}
            className="w-full flex items-center justify-center gap-2 py-3 clay-button text-foreground font-bold text-sm mb-6 shrink-0"
          >
            <Plus className="w-4 h-4" />
            New Workspace
          </button>

          <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black px-3 mb-3">Recent Workspaces</div>
              
              {loading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="w-5 h-5 text-gold/40 animate-spin" />
                </div>
              ) : (
                <div className="space-y-1">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => setActiveSession(session.id)}
                      className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-300
                        ${activeSessionId === session.id 
                          ? 'navbar-link-pill text-gold' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-gold/5'
                        }`}
                    >
                      <MessageSquare className={`w-4 h-4 shrink-0 ${activeSessionId === session.id ? 'text-gold' : 'text-muted-foreground group-hover:text-gold/70'}`} />
                      
                      {editingId === session.id ? (
                        <form onSubmit={(e) => saveTitle(e, session.id)} className="flex-1 flex items-center gap-1" onClick={e => e.stopPropagation()}>
                          <input
                            autoFocus
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                            onBlur={() => setEditingId(null)}
                            className="w-full bg-transparent border-none outline-none text-sm font-medium text-foreground"
                          />
                        </form>
                      ) : (
                        <>
                          <span className="text-sm font-medium truncate flex-1">{session.title}</span>
                          <div className={`flex items-center gap-1 transition-opacity duration-200 ${activeSessionId === session.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                            <button 
                              onClick={(e) => startEditing(e, session.id, session.title)}
                              className="p-1 hover:text-gold transition-colors"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); deleteSession(session.id); }}
                              className="p-1 hover:text-destructive transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-auto p-4 space-y-1 border-t border-gold/5 bg-[#060F1F]/80 backdrop-blur-md">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-gold/5 transition-all group">
            <Star className="w-4 h-4 group-hover:text-gold transition-colors" />
            <span className="text-sm font-medium">Favorite Names</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-gold/5 transition-all group">
            <Settings className="w-4 h-4 group-hover:text-gold transition-colors" />
            <span className="text-sm font-medium">Settings</span>
          </button>
          
          <div className="pt-2">
            <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-gold/5 border border-gold/10 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold-dark/20 flex items-center justify-center border border-gold/30 glow-gold-sm">
                <User className="w-4 h-4 text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-foreground truncate">{user?.email?.split('@')[0] || 'User'}</div>
                <div className="text-[9px] uppercase tracking-widest text-gold font-black">Aura Pro</div>
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
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        </div>
        
        {children}
      </main>
    </div>
  )
}
