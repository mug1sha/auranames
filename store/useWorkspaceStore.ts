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
  serverTimestamp
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
    const user = auth.currentUser;
    if (!user) return "";

    const docRef = await addDoc(collection(db, "sessions"), {
      userId: user.uid,
      title,
      messages: [],
      lastUpdated: serverTimestamp(),
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  },

  setActiveSession: (id) => set({ activeSessionId: id }),

  addMessage: async (sessionId, message) => {
    const sessionRef = doc(db, "sessions", sessionId);
    const sessionDoc = await getDoc(sessionRef);
    
    if (sessionDoc.exists()) {
      const currentMessages = sessionDoc.data().messages || [];
      const updatedMessages = [...currentMessages, message];
      
      await updateDoc(sessionRef, {
        messages: updatedMessages,
        lastUpdated: serverTimestamp()
      });
    }
  },

  updateSessionTitle: async (sessionId, title) => {
    const sessionRef = doc(db, "sessions", sessionId);
    await updateDoc(sessionRef, { title });
  },

  deleteSession: async (sessionId) => {
    await deleteDoc(doc(db, "sessions", sessionId));
    if (get().activeSessionId === sessionId) {
      set({ activeSessionId: null });
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
      orderBy("lastUpdated", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const sessions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Session[];
      
      set({ sessions, loading: false });
      
      // Auto-set first session as active if none selected
      if (!get().activeSessionId && sessions.length > 0) {
        set({ activeSessionId: sessions[0].id });
      }
    });

    return unsubscribe;
  },
}));
