import { create } from "zustand";

// ✅ 定义用户类型
interface User {
    id: number;
    name: string;
}

// ✅ 定义 Store 的结构
interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
    fetchUser: (userId: number) => Promise<void>;
    clearUser: () => void;
}

// ✅ 模拟异步 API
const mockFetchUser = (userId: number): Promise<User> =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            // 模拟 80% 成功率
            if (Math.random() < 0.8) {
                resolve({ id: userId, name: "张三" });
            } else {
                reject(new Error("加载失败，请重试"));
            }
        }, 1000);
    });

// ✅ 创建 Zustand store
const useUserStore = create<UserState>((set) => ({
    user: null,
    loading: false,
    error: null,

    // 异步请求封装
    fetchUser: async (userId: number) => {
        set({ loading: true, error: null });
        try {
            const data = await mockFetchUser(userId);
            set({ user: data, loading: false });
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "未知错误";
            set({ error: errorMessage, loading: false });
        }
    },

    // 清空用户
    clearUser: () => set({ user: null, error: null }),
}));

export default useUserStore;
