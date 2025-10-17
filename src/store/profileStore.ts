// store/profileStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // ← 新增导入

interface ProfileState {
    name: string;
    email: string;
    updateName: (name: string) => void;
}

// 使用 persist 包裹 store
export const useProfileStore = create<ProfileState>()(
    persist(
        (set) => ({
            name: "Guest", // 默认值
            email: "user@example.com",
            updateName: (name) => set({ name }),
        }),
        {
            name: 'profile-storage', // localStorage 的 key
            // 可选：只持久化部分字段（避免存 email 等）
            partialize: (state) => ({ name: state.name }),
        }
    )
);

export default useProfileStore;