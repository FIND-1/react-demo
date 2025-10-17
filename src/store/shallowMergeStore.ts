import { create } from 'zustand';

interface State {
    // 第一层：会被合并
    count: number;
    userInfo: {
        name: string;
        email: string;
    };
    // 更新函数
    updateCount: () => void;
    updateNameOnly: () => void; // 只更新 name，不碰 email
}

const useShallowStore = create<State>((set) => ({
    count: 0,
    userInfo: {
        name: 'Alice',
        email: 'alice@example.com',
    },

    // ✅ 第一层更新：安全，每次点击 +1
    updateCount: () =>
        set((state) => ({
            count: state.count + 1,
        })),

    // ❌ 深层更新：不合并，会丢失 email！
    updateNameOnly: () =>
        set({
            userInfo: {
                name: 'Bob', // ← 只写了 name
                // email: 'alice@example.com', // email 没写 → 会被丢弃！
            },
        }),
}));

export default useShallowStore;