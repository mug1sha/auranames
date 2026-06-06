import { create } from 'zustand';
import { db, auth } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  onSnapshot, 
  query, 
  where, 
  deleteDoc,
  serverTimestamp,
  arrayUnion,
  setDoc,
  Timestamp
} from 'firebase/firestore';

export interface Result {
  name: string;
  meaning: string;
  score: number;
  domain: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string | Result[];
  timestamp: number;
}

export interface Session {
  id: string;
  title: string;
  lastUpdated: Timestamp | null;
  messages: Message[];
}

interface WorkspaceState {
  sessions: Session[];
  activeSessionId: string | null;
  favorites: string[];
  settings: {
    cloudSync: boolean;
    usageStats: boolean;
    notifications: boolean;
    darkMode: boolean;
  };
  loading: boolean;
  
  // Actions
  createSession: (title?: string) => Promise<string>;
  setActiveSession: (id: string) => void;
  addMessage: (sessionId: string, message: Message) => Promise<void>;
  updateSessionTitle: (sessionId: string, title: string) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  toggleFavorite: (name: string) => void;
  fetchSessions: (userId: string) => () => void;
  saveSettings: (settings: WorkspaceState['settings']) => Promise<void>;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  sessions: [],
  activeSessionId: null,
  favorites: [],
  settings: {
    cloudSync: true,
    usageStats: false,
    notifications: true,
    darkMode: true
  },
  loading: true,

  // ... (previous actions)

  saveSettings: async (settings) => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Save settings failed: No user authenticated");
      throw new Error("You must be logged in to save settings.");
    }

    // Create a promise that rejects after 10 seconds as a fail-safe
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Firestore operation timed out")), 10000)
    );

    try {
      console.log("Saving settings for user:", user.uid);
      const userRef = doc(db, "users", user.uid);
      
      // Race the actual save against the timeout
      await Promise.race([
        setDoc(userRef, { 
          settings,
          lastUpdated: serverTimestamp()
        }, { merge: true }),
        timeoutPromise
      ]);
      
      set({ settings });
      console.log("Settings saved successfully");
    } catch (error: any) {
      console.error("Critical error in saveSettings:", error.message);
      if (error.message?.includes("permission-denied")) {
        console.error("Check your Firestore Security Rules!");
      }
      throw error;
    }
  },

  createSession: async (title = "New Workspace") => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const docRef = await addDoc(collection(db, "sessions"), {
        userId: user.uid,
        title,
        messages: [],
        lastUpdated: serverTimestamp(),
        createdAt: serverTimestamp(),
      });

      return docRef.id;
    } catch (error) {
      console.error("Error creating session:", error);
      return "";
    }
  },

  setActiveSession: (id) => set({ activeSessionId: id }),

  addMessage: async (sessionId, message) => {
    if (!sessionId) {
      console.error("addMessage failed: sessionId is null");
      return;
    }
    try {
      const sessionRef = doc(db, "sessions", sessionId);
      await updateDoc(sessionRef, {
        messages: arrayUnion(message),
        lastUpdated: serverTimestamp()
      });
    } catch (error) {
      console.error("Error adding message:", error);
      throw error;
    }
  },

  updateSessionTitle: async (sessionId, title) => {
    if (!sessionId) {
      console.error("updateSessionTitle failed: sessionId is null");
      return;
    }
    try {
      const sessionRef = doc(db, "sessions", sessionId);
      await updateDoc(sessionRef, { 
        title,
        lastUpdated: serverTimestamp() 
      });
    } catch (error) {
      console.error("Error updating session title:", error);
    }
  },

  deleteSession: async (sessionId) => {
    try {
      await deleteDoc(doc(db, "sessions", sessionId));
      if (get().activeSessionId === sessionId) {
        set({ activeSessionId: null });
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  },

  toggleFavorite: (name) => set((state) => ({
    favorites: state.favorites.includes(name) 
      ? state.favorites.filter(f => f !== name)
      : [...state.favorites, name]
  })),

  fetchSessions: (userId) => {
    set({ loading: true });
    // Simplify query to only filter by userId to avoid index requirement
    // Sorting will be handled client-side in the onSnapshot listener
    const q = query(
      collection(db, "sessions"),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const sessions = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Session[];
      
      // Sort client-side by lastUpdated (descending)
      sessions.sort((a, b) => {
        const timeA = a.lastUpdated?.toMillis?.() || 0;
        const timeB = b.lastUpdated?.toMillis?.() || 0;
        return timeB - timeA;
      });

      // Limit to 15 most recent for performance
      const limitedSessions = sessions.slice(0, 15);
      
      set({ sessions: limitedSessions, loading: false });
      
      if (!get().activeSessionId && limitedSessions.length > 0) {
        set({ activeSessionId: limitedSessions[0].id });
      }
    }, (error) => {
      console.error("Firestore snapshot error:", error);
      set({ loading: false });
    });

    return unsubscribe;
  },
}));
