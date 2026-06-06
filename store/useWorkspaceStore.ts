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
  orderBy,
  getDoc,
  deleteDoc,
  serverTimestamp,
  arrayUnion,
  limit
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
  lastUpdated: any;
  messages: Message[];
}

interface WorkspaceState {
  sessions: Session[];
  activeSessionId: string | null;
  favorites: string[];
  loading: boolean;
  
  // Actions
  createSession: (title?: string) => Promise<string>;
  setActiveSession: (id: string) => void;
  addMessage: (sessionId: string, message: Message) => Promise<void>;
  updateSessionTitle: (sessionId: string, title: string) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  toggleFavorite: (name: string) => void;
  fetchSessions: (userId: string) => () => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  sessions: [],
  activeSessionId: null,
  favorites: [],
  loading: true,

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
    try {
      const sessionRef = doc(db, "sessions", sessionId);
      await updateDoc(sessionRef, { title });
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
    const q = query(
      collection(db, "sessions"),
      where("userId", "==", userId),
      orderBy("lastUpdated", "desc"),
      limit(15)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const sessions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Session[];
      
      set({ sessions, loading: false });
      
      if (!get().activeSessionId && sessions.length > 0) {
        set({ activeSessionId: sessions[0].id });
      }
    }, (error) => {
      console.error("Firestore snapshot error:", error);
      set({ loading: false });
    });

    return unsubscribe;
  },
}));
