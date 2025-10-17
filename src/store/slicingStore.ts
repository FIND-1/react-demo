// store/userStore.ts
import { create } from 'zustand';

interface AppState {
    user: { id: number; name: string } | null;
    theme: "light" | "dark";
    setUser: (user: { id: number; name: string }) => void;
    clearUser: () => void;
    toggleTheme: () => void;
}

const slicingStore = create<AppState>((set) => ({
    user: null,
    theme: "light",
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    toggleTheme: () =>
        set((state) => ({
            theme: state.theme === "light" ? "dark" : "light",
        })),
}));


export default  slicingStore