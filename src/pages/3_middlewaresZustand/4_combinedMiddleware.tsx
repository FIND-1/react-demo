import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

interface CombinedState {
    user: {
        name: string;
        preferences: {
            theme: 'light' | 'dark';
            notifications: boolean;
        };
    };
    toggleTheme: () => void;
    toggleNotifications: () => void;
}
// /注意：中间件的顺序很重要。persist 通常放在最外层,devtools 通常放在最内层。
const useCombinedStore = create<CombinedState>()(
    persist(
        immer(
            devtools(
                (set) => ({
                    user: {
                        name: 'User',
                        preferences: {
                            theme: 'light',
                            notifications: true,
                        },
                    },
                    toggleTheme: () =>
                        set((state) => {
                            state.user.preferences.theme =
                                state.user.preferences.theme === 'light' ? 'dark' : 'light';
                        }),
                    toggleNotifications: () =>
                        set((state) => {
                            state.user.preferences.notifications = !state.user.preferences.notifications;
                        }),
                }),
                { name: 'Combined Store' }
            )
        ),
        {
            name: 'combined-store',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

function CombinedMiddleware() {
    const { user, toggleTheme, toggleNotifications } = useCombinedStore();

    return (
        <div
            className={`min-h-screen py-12 px-4 sm:px-6 transition-colors duration-300 ${
                user.preferences.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
            }`}
        >
            <h2>Middleware -- 组合中间件（persist + immer + devtools）</h2>
            <p>状态已持久化，支持嵌套更新，并可在 DevTools 中调试。</p>
            <p>主题: {user.preferences.theme}</p>
            <p>通知: {user.preferences.notifications ? '开启' : '关闭'}</p>
            <button onClick={toggleTheme}>切换主题</button>
            <button onClick={toggleNotifications} style={{ marginLeft: '8px' }}>
                切换通知
            </button>
        </div>
    );
}
export default CombinedMiddleware;