// store/appStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AppStore {
    // ✅ 需要持久化的数据
    user: { id: string; name: string };
    theme: 'light' | 'dark';
    lang: string;

    // ❌ 不应持久化的临时状态
    isLoading: boolean;
    error: string | null;
    wsConnection: WebSocket | null;

    // Actions
    setTheme: (theme: 'light' | 'dark') => void;
    setLoading: (loading: boolean) => void;
}

export const partializeStore = create<AppStore>()(
    persist(
        (set) => ({
            user: { id: '1', name: 'Guest' },
            theme: 'light',
            lang: 'en',
            isLoading: false,
            error: null,
            wsConnection: null,

            setTheme: (theme) => set({ theme }),
            setLoading: (loading) => set({ isLoading: loading }),
        }),
        {
            name: 'app-persisted-store',
            storage: createJSONStorage(() => localStorage),
            // ✅ 只持久化需要的部分，排除临时状态
            partialize: (state) => ({
                user: state.user,
                theme: state.theme,
                lang: state.lang,
            }),
        }
    )
);

export default partializeStore;