
/*
     useImmer  和 Zustand + immer 的主要区别如下：
     类型安全: 通过泛型 `<T>` 支持    | 通过 `create<T>()` 支持

     核心区别：
         *  useImmer：管理 *组件局部状态*（替代 useState）
         *  Zustand + immer：管理 *应用全局状态*（替代 Redux / Context）
         *  useImmer：不需要中间件
         *  Zustand + immer：需要中间件, 且（`immer()` 包裹 store）

     共同点：
         *  均基于 immer 库，允许 draft => { draft.x = y } 的可变写法
         *  自动处理不可变更新，避免手动展开

     <典型应用>：
         *  useImmer：表单、弹窗、复杂 UI "组件内部"状态
         *  Zustand + immer：用户信息、主题、购物车等"跨组件共享"状态

     使用建议:
         *  组件内复杂状态 → `useImmer`
         *  跨组件状态 → `Zustand + immer`
         *  两者可无缝共存，各司其职。

*/

import { useImmer } from 'use-immer';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// ---------- 全局状态 Store ----------
interface GlobalState {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const useGlobalStore = create<GlobalState>()(
    immer((set) => ({
        theme: 'light',
        toggleTheme: () => set((state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }),
    }))
);

// ---------- 全局状态卡片组件 ----------
function GlobalStateCard({ theme }: { theme: 'light' | 'dark' }) {
    const { toggleTheme } = useGlobalStore();
    return (
        <div className={`p-5 rounded-xl shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="font-bold text-lg mb-3">🌍 全局状态 (Zustand + immer)</h2>
            <p className="text-sm opacity-80 mb-4">跨组件共享，切换主题全局生效</p>

            <div className="flex items-center gap-3">
                <span className="text-sm">
                  当前主题: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">{theme}</code>
                </span>
                <button
                    onClick={toggleTheme}
                    className="px-3 py-1.5 text-sm bg-gray-800 text-white rounded "
                >
                    切换主题
                </button>
            </div>

            <p className="text-xs mt-4 opacity-70">
                尝试切换主题，整个页面背景会变化（全局状态）
            </p>
        </div>
    );
}


// ---------- 局部状态卡片组件 ----------
function LocalStateCard({ theme }: { theme: 'light' | 'dark' }) {
    const [form, setForm] = useImmer<{ name: string; tags: string[] }>({
        name: '',
        tags: [],
    });

    const handleAddTag = () => {
        const newTag = form.name.trim();
        if (newTag && !form.tags.includes(newTag)) {
            setForm((draft) => {
                draft.tags.push(newTag);
                draft.name = '';
            });
            return
        }
        alert('标签已存在');
    };

    return (
        <div className={`p-5 rounded-xl shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="font-bold text-lg mb-3">📍 局部状态 (useImmer)</h2>
            <p className="text-sm opacity-80 mb-4">仅在本组件内有效</p>

            <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((d) => { d.name = e.target.value; })}
                placeholder="输入标签名"
                className="w-full p-2 mb-3 rounded border bg-transparent"
            />
            <button
                onClick={handleAddTag}
                className="mt-4 px-3 py-1.5 text-sm bg-blue-500 text-white rounded "
            >
                添加标签
            </button>

            <div className="mt-4">
                <p className="text-sm font-medium">标签列表:</p>
                <ul className="mt-2 space-y-1">
                    {form.tags.map((tag, i) => (
                        <li key={i} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">
                            {tag}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


// ---------- 主页面 ----------
 function ImmerComparison() {
    const { theme } = useGlobalStore();

    return (
        <div className={`min-h-screen p-6 transition-colors ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-4xl mx-auto space-y-8">
                <header className="text-center">
                    <h1 className="text-2xl font-bold">useImmer VS Zustand + immer</h1>
                    <p className="text-sm opacity-75 mt-1">
                        局部状态 VS 全局状态，均可使用 draft 可变写法
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <LocalStateCard theme={theme} />
                    <GlobalStateCard theme={theme} />
                </div>
            </div>
        </div>
    );
}

export default ImmerComparison;

