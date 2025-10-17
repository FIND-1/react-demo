// store/userStore.ts
import { create } from 'zustand';
import { produce } from 'immer';

// 定义嵌套状态类型
interface UserSettings {
    theme: 'light' | 'dark';
    notifications: boolean;
}

interface UserProfile {
    name: string;
    email: string;
    settings: UserSettings;
}

interface UserState {
    user: UserProfile;
    // 更新函数：使用 immer 的 produce
    updateUserName: (name: string) => void;
    toggleNotifications: () => void;
    updateUserEmail: (email: string) => void;
}

// 默认状态
const defaultUser: UserProfile = {
    name: 'Guest',
    email: '',
    settings: {
        theme: 'light',
        notifications: true,
    },
};

export const userStoreWithImmer = create<UserState>()((set) => ({
    user: defaultUser,

    // ✅ 使用 produce 手动实现不可变更新
    updateUserName: (name) =>
        set((state) =>
            produce(state, (draft) => {
                draft.user.name = name;
            })
        ),

    toggleNotifications: () =>
        set((state) =>
            produce(state, (draft) => {
                draft.user.settings.notifications = !draft.user.settings.notifications;
            })
        ),

    updateUserEmail: (email) =>
        set((state) =>
            produce(state, (draft) => {
                draft.user.email = email;
            })
        ),
}));

export default userStoreWithImmer;