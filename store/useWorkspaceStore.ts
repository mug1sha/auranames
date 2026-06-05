import { create } from 'zustand';

interface Session {
  id: string;
  title: string;
  timestamp: number;
}

interface WorkspaceState {
  sessions: Session[];
  activeSessionId: string | null;
  addSession: (title: string) => void;
  setActiveSession: (id: string) => void;
  favorites: string[];
  toggleFavorite: (name: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  sessions: [
    { id: '1', title: 'AI Startup', timestamp: Date.now() },
    { id: '2', title: 'Coffee Brand', timestamp: Date.now() - 86400000 },
  ],
  activeSessionId: '1',
  addSession: (title) => set((state) => ({
    sessions: [{ id: Math.random().toString(36).substr(2, 9), title, timestamp: Date.now() }, ...state.sessions]
  })),
  setActiveSession: (id) => set({ activeSessionId: id }),
  favorites: [],
  toggleFavorite: (name) => set((state) => ({
    favorites: state.favorites.includes(name) 
      ? state.favorites.filter(f => f !== name)
      : [...state.favorites, name]
  })),
}));
