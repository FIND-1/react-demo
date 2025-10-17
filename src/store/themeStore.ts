// store/themeStore.ts
import { create } from 'zustand';
import { persist , createJSONStorage } from 'zustand/middleware';

interface ThemeState {
    theme: 'light' | 'dark';
    lastUpdated: string; // 用 string 存 Date，避免序列化问题
    toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'light',
            lastUpdated: new Date().toISOString(),
            toggleTheme: () =>
                set((state) => ({
                    theme: state.theme === 'light' ? 'dark' : 'light',
                    lastUpdated: new Date().toISOString(), // 更新为 ISO 字符串
                })),
        }),
        {
            name: 'theme-storage', //必填项,默认存储在 localStorage
            storage: createJSONStorage(() => localStorage), // 自定义存储位置
            // 可选：自定义序列化（通常不需要）
            // serialize: (state) => JSON.stringify(state),
            // deserialize: (str) => JSON.parse(str),
        }
    )
);

export default useThemeStore;