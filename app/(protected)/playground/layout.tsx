"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useWorkspaceStore } from "@/store/useWorkspaceStore"
import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
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
  Loader2,
  Bell,
  Shield,
  Palette,
  ExternalLink
} from "lucide-react"

/**
 * Render the playground layout: a responsive left sidebar for workspace/session management, a main content area, and animated overlays for favorites and settings.
 *
 * @returns A JSX element containing the full playground layout (sidebar, main content, favorites overlay, and settings modal).
 */
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
    deleteSession,
    favorites,
    settings
  } = useWorkspaceStore()
  const { user, setUser } = useAuthStore()
  const router = useRouter()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [showSettings, setShowSettings] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeSettingsTab, setActiveSettingsTab] = useState<'general' | 'theme' | 'alerts' | 'privacy'>('general')
  const [settingsState, setSettingsState] = useState(settings)

  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [copiedFavorite, setCopiedFavorite] = useState<string | null>(null)

  // Sync local settings state when store settings change (loaded from Firestore)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSettingsState(settings)
  }, [settings])

  const handleSignOut = async () => {
    await signOut(auth)
    setUser(null)
    router.push("/auth")
  }

  const handleNewSession = async () => {
    const id = await createSession()
    if (id) {
      setActiveSession(id)
    }
    setShowFavorites(false)
    setIsSidebarOpen(false)
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

  const toggleSetting = (key: keyof typeof settingsState) => {
    setSettingsState(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    setSaveSuccess(false)
    
    try {
      await useWorkspaceStore.getState().saveSettings(settingsState)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error: any) {
      console.error("Save failed:", error)
      alert(`Save failed: ${error.message}. If this persists, please check your network or Firestore rules.`)
    } finally {
      setIsSaving(false)
    }
  }
const handleCopyFavorite = (name: string) => {
  navigator.clipboard.writeText(name)
  setCopiedFavorite(name)
  setTimeout(() => setCopiedFavorite(null), 2000)
}

return (
  <div className="flex h-screen bg-background overflow-hidden font-sans relative">

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 border-r border-gold/10 flex flex-col bg-[#060F1F] 
        transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="navbar-logo-clay p-2">
                <Sparkles className="w-5 h-5 text-[#0A192F]" />
              </div>
              <span className="text-xl font-bold font-[family-name:var(--font-playfair)]">
              <span className="gradient-text">Aura</span><span className="text-white">Names</span>
            </span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
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
                      onClick={() => {
                        setActiveSession(session.id);
                        setShowFavorites(false);
                        setIsSidebarOpen(false);
                      }}
                      className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-300
                        ${activeSessionId === session.id && !showFavorites
                          ? 'navbar-link-pill text-gold' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-gold/5'
                        }`}
                    >
                      <MessageSquare className={`w-4 h-4 shrink-0 ${activeSessionId === session.id && !showFavorites ? 'text-gold' : 'text-muted-foreground group-hover:text-gold/70'}`} />
                      
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
          <button 
            onClick={() => {
              setShowFavorites(true);
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group
              ${showFavorites ? 'navbar-link-pill text-gold' : 'text-muted-foreground hover:text-foreground hover:bg-gold/5'}`}
          >
            <Star className={`w-4 h-4 ${showFavorites ? 'text-gold fill-gold' : 'group-hover:text-gold'} transition-colors`} />
            <span className="text-sm font-medium">Favorite Names</span>
          </button>
          
          <button 
            onClick={() => {
              setShowSettings(true);
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group
              ${showSettings ? 'navbar-link-pill text-gold' : 'text-muted-foreground hover:text-foreground hover:bg-gold/5'}`}
          >
            <Settings className={`w-4 h-4 ${showSettings ? 'text-gold' : 'group-hover:text-gold'} transition-colors`} />
            <span className="text-sm font-medium">Settings</span>
          </button>
          
          <div className="pt-2">
            <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-gold/5 border border-gold/10 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold-dark/20 flex items-center justify-center border border-gold/30 glow-gold-sm">
                <User className="w-4 h-4 text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-foreground truncate">{user?.email?.split('@')[0] || 'User'}</div>
                <div className="text-[9px] uppercase tracking-widest text-gold font-black">
                  {subscription.plan === 'none' ? 'Free Member' : `Aura ${subscription.plan}`}
                </div>
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
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gold/10 bg-[#060F1F]/50 backdrop-blur-md shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-lg font-bold font-[family-name:var(--font-playfair)]">
            <span className="gradient-text">Aura</span><span className="text-white">Names</span>
          </span>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Background blobs for main area */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] opacity-30" />
          <div className="absolute inset-0 gold-dots opacity-10" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        </div>
        
        {/* Favorites View Overlay */}
        <AnimatePresence>
          {showFavorites && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute inset-0 z-30 bg-background/95 backdrop-blur-xl p-6 md:p-12 overflow-y-auto no-scrollbar"
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 clay-surface flex items-center justify-center text-gold shrink-0">
                      <Star className="w-6 h-6 fill-gold" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-playfair)] text-foreground">Favorite Names</h2>
                      <p className="text-sm text-muted-foreground">Your curated collection of premium brand identities.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowFavorites(false)}
                    className="p-3 clay-button text-muted-foreground hover:text-foreground self-end md:self-auto"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {favorites.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-20 h-20 rounded-full bg-gold/5 flex items-center justify-center mb-6 border border-gold/10">
                      <Star className="w-10 h-10 text-gold/20" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">No favorites yet</h3>
                    <p className="text-muted-foreground max-w-xs">Start exploring names in the playground and star the ones you love.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((name) => (
                      <motion.div
                        key={name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="clay-card p-6 group"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-foreground">{name}</h3>
                          <button 
                            onClick={() => useWorkspaceStore.getState().toggleFavorite(name)}
                            className="p-2 text-gold transition-colors"
                          >
                            <Star className="w-4 h-4 fill-gold" />
                          </button>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button 
                            onClick={() => handleCopyFavorite(name)}
                            className="flex-1 py-2 clay-button text-xs font-bold"
                          >
                            {copiedFavorite === name ? 'Copied!' : 'Copy'}
                          </button>
                          <button 
                            onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(name)}`, '_blank')}
                            className="p-2 clay-button"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settings Modal */}
        <AnimatePresence>
          {showSettings && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-background/80 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-2xl navbar-clay-pill overflow-hidden shadow-2xl flex flex-col md:flex-row"
              >
                {/* Settings Nav */}
                <div className="w-full md:w-48 border-b md:border-b-0 md:border-r border-gold/10 bg-[#060F1F]/50 p-4 md:p-6 flex md:flex-col gap-2 overflow-x-auto no-scrollbar">
                  <h3 className="hidden md:block text-xs font-black uppercase tracking-widest text-gold/50 mb-4 px-2">Settings</h3>
                  {[
                    { id: 'general', icon: User, label: 'General' },
                    { id: 'theme', icon: Palette, label: 'Theme' },
                    { id: 'alerts', icon: Bell, label: 'Alerts' },
                    { id: 'privacy', icon: Shield, label: 'Privacy' }
                  ].map((tab) => (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveSettingsTab(tab.id as any)}
                      className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                        ${activeSettingsTab === tab.id ? 'bg-gold/10 text-gold border border-gold/20' : 'text-muted-foreground hover:text-foreground hover:bg-gold/5'}`}
                    >
                      <tab.icon className="w-4 h-4" /> <span className="md:block">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Settings Content */}
                <div className="flex-1 p-6 md:p-8 relative flex flex-col overflow-hidden h-[450px] md:h-[550px]">
                  <button 
                    onClick={() => setShowSettings(false)}
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex-1 overflow-y-auto no-scrollbar pr-2">
                    <AnimatePresence mode="wait">
                      {activeSettingsTab === 'general' && (
                        <motion.div
                          key="general"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="space-y-6 md:space-y-8"
                        >
                          <h2 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-6 md:mb-8">General Preferences</h2>
                          
                          <section>
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-4">Account Profile</label>
                            <div className="flex items-center gap-4 p-4 clay-surface-sm border-gold/10">
                              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gold/30 to-gold-dark/20 flex items-center justify-center border-2 border-gold/30 glow-gold-sm shrink-0">
                                <User className="w-6 h-6 md:w-8 md:h-8 text-gold" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-base md:text-lg font-bold text-foreground truncate">{user?.email || 'User Profile'}</div>
                                <div className="text-[10px] md:text-xs text-gold font-bold">
                                  {subscription.plan === 'none' ? 'Free Member' : `Aura ${subscription.plan} Member`}
                                  {subscription.startDate && ` • Since ${new Date(subscription.startDate.toMillis()).getFullYear()}`}
                                </div>
                              </div>

                              <button className="px-3 md:px-4 py-2 clay-button text-[10px] md:text-xs font-bold hover:glow-border-gold transition-all">Edit</button>
                            </div>
                          </section>

                          <section>
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-3">AI Model</label>
                            <div className="flex items-center justify-between p-4 clay-surface-sm border-gold/10">
                              <div className="flex items-center gap-3">
                                <Sparkles className="w-4 h-4 text-gold shrink-0" />
                                <span className="text-xs md:text-sm font-medium text-foreground">GPT-4o (Optimized)</span>
                              </div>
                              <span className="text-[9px] md:text-[10px] px-2 py-0.5 rounded-full bg-gold/20 text-gold font-black uppercase tracking-tighter">Current</span>
                            </div>
                          </section>

                          <section>
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-3">Workspace Data</label>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between p-4 clay-surface-sm border-gold/10">
                                <span className="text-xs md:text-sm font-medium text-foreground">Cloud Sync</span>
                                <button 
                                  onClick={() => toggleSetting('cloudSync')}
                                  className={`w-9 md:w-10 h-4 md:h-5 rounded-full relative transition-colors duration-300 ${settingsState.cloudSync ? 'bg-gold' : 'bg-gold/10 border border-gold/20'}`}
                                >
                                  <motion.div 
                                    animate={{ x: settingsState.cloudSync ? 18 : 2 }}
                                    className={`absolute top-0.5 w-3 h-3 md:w-4 md:h-4 rounded-full shadow-lg ${settingsState.cloudSync ? 'bg-[#0A192F]' : 'bg-muted-foreground'}`} 
                                  />
                                </button>
                              </div>
                            </div>
                          </section>
                        </motion.div>
                      )}

                      {activeSettingsTab === 'theme' && (
                        <motion.div
                          key="theme"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="space-y-6 md:space-y-8"
                        >
                          <h2 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-6 md:mb-8">Visual Experience</h2>
                          <section>
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-4">Display Mode</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <button 
                                onClick={() => setSettingsState(s => ({...s, darkMode: true}))}
                                className={`p-4 md:p-6 clay-surface-sm border-2 transition-all text-center
                                  ${settingsState.darkMode ? 'border-gold glow-gold-sm' : 'border-transparent opacity-50'}`}
                              >
                                <div className="w-8 h-8 mx-auto mb-3 bg-[#0A192F] rounded-full border border-gold/20" />
                                <span className="text-sm font-bold text-foreground">Midnight (Dark)</span>
                              </button>
                              <button 
                                onClick={() => setSettingsState(s => ({...s, darkMode: false}))}
                                className={`p-4 md:p-6 clay-surface-sm border-2 transition-all text-center
                                  ${!settingsState.darkMode ? 'border-gold glow-gold-sm' : 'border-transparent opacity-50'}`}
                              >
                                <div className="w-8 h-8 mx-auto mb-3 bg-white rounded-full border border-gray-200" />
                                <span className="text-sm font-bold text-foreground">Daylight (Light)</span>
                              </button>
                            </div>
                          </section>
                        </motion.div>
                      )}

                      {activeSettingsTab === 'alerts' && (
                        <motion.div
                          key="alerts"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="space-y-6 md:space-y-8"
                        >
                          <h2 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-6 md:mb-8">Notifications</h2>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 clay-surface-sm border-gold/10">
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground">Browser Notifications</span>
                                <span className="text-[10px] md:text-xs text-muted-foreground">Alert me when names are ready</span>
                              </div>
                              <button 
                                onClick={() => toggleSetting('notifications')}
                                className={`w-9 md:w-10 h-4 md:h-5 rounded-full relative transition-colors duration-300 ${settingsState.notifications ? 'bg-gold' : 'bg-gold/10 border border-gold/20'}`}
                              >
                                <motion.div 
                                  animate={{ x: settingsState.notifications ? 18 : 2 }}
                                  className={`absolute top-0.5 w-3 h-3 md:w-4 md:h-4 rounded-full shadow-lg ${settingsState.notifications ? 'bg-[#0A192F]' : 'bg-muted-foreground'}`} 
                                />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeSettingsTab === 'privacy' && (
                        <motion.div
                          key="privacy"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="space-y-6 md:space-y-8"
                        >
                          <h2 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-6 md:mb-8">Privacy & Security</h2>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 clay-surface-sm border-gold/10">
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground">Usage Analytics</span>
                                <span className="text-[10px] md:text-xs text-muted-foreground">Help us improve by sharing data</span>
                              </div>
                              <button 
                                onClick={() => toggleSetting('usageStats')}
                                className={`w-9 md:w-10 h-4 md:h-5 rounded-full relative transition-colors duration-300 ${settingsState.usageStats ? 'bg-gold' : 'bg-gold/10 border border-gold/20'}`}
                              >
                                <motion.div 
                                  animate={{ x: settingsState.usageStats ? 18 : 2 }}
                                  className={`absolute top-0.5 w-3 h-3 md:w-4 md:h-4 rounded-full shadow-lg ${settingsState.usageStats ? 'bg-[#0A192F]' : 'bg-muted-foreground'}`} 
                                />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gold/10 flex justify-end gap-3 shrink-0">
                    <button 
                      onClick={() => setShowSettings(false)} 
                      className="px-4 md:px-6 py-2 text-xs md:text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Close
                    </button>
                    <button 
                      onClick={handleSaveSettings}
                      disabled={isSaving}
                      className={`px-6 md:px-8 py-2 clay-button-gold text-[10px] md:text-xs hover:scale-105 transition-all flex items-center gap-2 min-w-[120px] md:min-w-[140px] justify-center
                        ${saveSuccess ? 'border-green-500 text-green-600' : ''}`}
                    >
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : saveSuccess ? (
                        <>
                          <Check className="w-4 h-4" />
                          Saved!
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        
        {!showFavorites && children}
      </main>
    </div>
  )
}
