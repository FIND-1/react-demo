/*
  🧠 什么是“持久化时的状态简化”？
    *  使用 persist 中间件时，通过 partialize 函数仅将需要持久化的状态子集写入存储，
       排除临时状态、函数、不可序列化对象等。

   原理剖析：
    * `partialize` 接收完整状态，返回一个精简后的对象，该对象会被 `JSON.stringify` 存入 storage。
       Zustand v4+ 不再使用 `deserialize`，而是通过 `partialize` 控制持久化内容。

    为什么必须使用状态简化？
      1. 防止序列化错误：函数、WebSocket 等无法被 JSON 序列化。
      2. 减少存储体积：只保存用户数据，不保存 UI 临时状态。
      3. 安全清晰：明确区分“持久化数据”与“运行时状态”。

   <典型应用>：
     *  持久化时的状态简化（Partialize）—— 只保存必要数据
     *  状态切片（State Slicing）—— 订阅时只取需要的部分

*/

// pages/AppSettingsPage.tsx
import React, { useEffect } from 'react';
import partializeStore from "../../store/partializeStore.ts";

const StorePartialize: React.FC = () => {
    // ✅ 持久化状态（刷新后保留）
    const user = partializeStore((state) => state.user);
    const theme = partializeStore((state) => state.theme);
    const lang = partializeStore((state) => state.lang);

    // ❌ 临时状态（刷新后重置）
    const isLoading = partializeStore((state) => state.isLoading);
    const error = partializeStore((state) => state.error);
    const wsConnection = partializeStore((state) => state.wsConnection);

    // Actions
    const setTheme = partializeStore((state) => state.setTheme);
    const setLoading = partializeStore((state) => state.setLoading);

    // 模拟临时状态变化
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, [setLoading]);

    // 根据主题设置样式
    const containerStyle = {
        backgroundColor: theme === 'dark' ? '#1a202c' : '#ffffff',
        color: theme === 'dark' ? '#e2e8f0' : '#1a202c',
        minHeight: '10vh',
        transition: 'background-color 0.3s, color 0.3s'
    };

    const sectionStyle = {
        backgroundColor: theme === 'dark' ? '#2d3748' : '#f7fafc',
        transition: 'background-color 0.3s'
    };

    return (
        <div style={containerStyle} className="mx-auto max-w-2xl">
            <h2>Zustand 状态简化 -- Partialize</h2>

            {/* 持久化部分 */}
            <section style={sectionStyle} className="  mb-6 rounded-lg border border-green-500 p-4">
                <h3 className="mb-3 text-lg font-semibold text-green-700">✅ 持久化状态（刷新后保留）</h3>
                <p><strong>用户:</strong> {user.name} (ID: {user.id})</p>
                <p><strong>主题:</strong> {theme}</p>
                <p><strong>语言:</strong> {lang}</p>
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="mt-2 rounded bg-green-500 px-3 py-1.5 text-sm text-white hover:bg-green-600 focus:outline-none"
                >
                    切换主题
                </button>
            </section>

            {/* 临时状态部分 */}
            <section style={sectionStyle} className=" mb-6 rounded-lg border border-orange-400 p-4">
                <h3 className="mb-3 text-lg font-semibold text-orange-600">🚨 临时状态（刷新后重置）</h3>
                <p><strong>加载中:</strong> {isLoading} {isLoading ? '✅ 是' : '❌ 否'}</p>
                <p><strong>错误:</strong> {error || 'null'}</p>
                <p><strong>WebSocket 连接:</strong> {wsConnection ? '✅ 已连接' : '❌ null'}</p>
                <p className="mt-2 text-sm text-gray-600">
                    刷新页面后，以上三项将恢复为初始值：false / null / null。
                </p>
            </section>

            <div className="text-sm text-gray-600">
                💡 提示：切换主题后刷新页面，观察持久化 vs 临时状态的行为差异。
            </div>
        </div>
    );
};

export default StorePartialize;