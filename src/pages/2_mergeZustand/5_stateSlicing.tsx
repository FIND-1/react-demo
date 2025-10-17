/*
   🧠 什么是“状态切片”（State Slicing）？
     * 在 Zustand 中，我们可以通过 selector 函数仅订阅 store 中自己关心的部分状态，
       而不是订阅整个 store 对象。
     * 这样做的结果是：当 store 的其他部分更新时，当前组件不会重新渲染。

   优点：
     * 避免全局状态更新导致所有组件重渲染（性能更好）
     * 提高组件独立性，逻辑更清晰，职责更单一
     * 提升大型应用中 store 状态管理的可维护性

   缺点：
     * 当 selector 返回的是一个“新对象”时（如 { a: state.a, b: state.b }），
       即使对象内部值没有变化，Zustand 也会认为是“新结果”——从而触发不必要的重渲染。
     * 因为默认情况下，Zustand 是使用 *浅层引用比较*（shallow reference compare）来判断变化的。

  解决方案:
        —— useShallow（Zustand 提供的浅比较优化）
     * 只有当返回对象中的具体字段值真的发生变化时，组件才会重新渲染。

   使用建议：
     * 当 selector 返回多个字段组成的对象时（如 { user, theme }）
     * 当状态是嵌套对象或数组时，useShallow 可以有效避免无意义的重新渲染
*/

import React from "react";
import { useShallow } from "zustand/react/shallow";  // ✅ 引入 useShallow
import slicingStore from "../../store/slicingStore.ts";

const StateSlicing: React.FC = () => {
    // 🎯 通过 selector 订阅局部状态 + useShallow 做浅比较优化
    const user = slicingStore((state) => state.user);
    const setUser = slicingStore((state) => state.setUser);
    const clearUser = slicingStore((state) => state.clearUser);

    // 没使用 useShallow 时, 组件使用 selector 时默认只进行引用比较（===）
    // const theme = slicingStore((state) => state.theme);
    // const toggleTheme = slicingStore((state) => state.toggleTheme);

    // 使用 useShallow后, 只有 theme 的内容改变时，组件才会重新渲染
    const { theme, toggleTheme } = slicingStore(
        useShallow((state) => ({
            theme: state.theme,
            toggleTheme: state.toggleTheme,
        }))
    );

    console.log("页面重新渲染 🎨");

    return (
        <div
            className={`mx-auto rounded max-w-3xl p-8 transition-all duration-300 ${
                theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
            }`}
        >
            <h2 className="mb-6 text-2xl font-bold">Zustand状态切片 -- useShallow</h2>

            <section className="mb-6">
                <h3 className="mb-3 text-lg font-semibold">👤 用户信息</h3>
                {user ? (
                    <>
                        <p>姓名：{user.name}</p>
                        <p>ID：{user.id}</p>
                        <button
                            onClick={clearUser}
                            className="mt-2 rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 focus:outline-none"
                        >
                            退出登录
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setUser({ id: 1, name: 'Alice' })}
                        className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600 focus:outline-none"
                    >
                        登录
                    </button>
                )}
            </section>

            <section>
                <h3 className="mb-2 text-lg font-semibold">🎨 当前主题：{theme}</h3>
                <button
                    onClick={toggleTheme}
                    className="rounded bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-800 focus:outline-none dark:bg-gray-600 dark:hover:bg-gray-700"
                >
                    切换主题
                </button>
            </section>
        </div>
    );
};

export default StateSlicing;
