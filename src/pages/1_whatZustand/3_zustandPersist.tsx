/*
    persist 是什么?
       * 是 Zustand 官方提供的一个中间件（middleware）。
       * 作用是：
        自动将 Zustand store 中的状态持久化到浏览器的 `localStorage`（或 `sessionStorage`）中，
        并在页面刷新或重新打开时自动恢复。
    网址: https://zustand.docs.pmnd.rs/integrations/persisting-store-data

    怎么使用?
        * 语法格式: ` import { persist  } from 'zustand/middleware'  `

    为什么从 `zustand/middleware` 导入？
        * Zustand 的设计理念是 “核心极简 + 功能按需扩展”
        1️⃣zustand` | 只包含最核心的状态管理功能（`create`）
        2️⃣zustand/middleware` | 包含官方提供的可选增强功能，
         • `persist`（持久化）
         • `devtools`（Redux DevTools 支持）
         • `immer`（不可变更新）等
        3️⃣ 这是一种 “树摇优化（tree-shaking）友好” 的设计。

    原理剖析：
        Zustand 会在内部自动：
        1. 监听状态变化
        2. 调用 `persist` 方法下的存储引擎 `storage`
        3. 初始化时调用 `localStorage.getItem('my-store')` 并反序列化恢复状态

    注意事项:
      1: 只能存储可序列化的数据

        // ❌ 错误：函数、Date、Map、Symbol 无法被 JSON.stringify 正确处理
        {
          date: new Date(),     // → 变成字符串 "2025-10-17T06:00:00.000Z"
          func: () => {},       // → 变成 undefined
          map: new Map()        // → 变成 {}
        }
        ✅ 解决方案：
        - 存 `Date` 时用 `.toISOString()` 转字符串，读取时用 `new Date(str)`
        - 不要存函数、类实例、DOM 引用等

      2. 可以自定义存储引擎: storage

        persist(..., {
          name: 'my-store',
          storage: {
            getItem: (name) => localStorage.getItem(name),
            setItem: (name, value) => localStorage.setItem(name, value),
            removeItem: (name) => localStorage.removeItem(name),
          },
          // 甚至可以用 sessionStorage、IndexedDB、加密存储等
        })

      3. 可以监听“恢复完成”事件: onRehydrateStorage

        persist(..., {
          onRehydrateStorage: () => {
            return (state, error) => {
              if (error) console.log('持久化恢复失败', error);
              else console.log('状态已从 localStorage 恢复');
            };
          },
        })

    <典型应用>:
       *  用户偏好（主题、语言、布局)-- “强烈推荐”
       *  表单草稿（未提交的输入） -- “推荐”
       *  登录 token（需加密/过期处理） -- ⚠️ 谨慎（建议用 httpOnly cookie）
       *  临时 UI 状态（弹窗是否打开） -- 不推荐（刷新后应重置）
       *  大量数据（如列表缓存） | ⚠️ 谨慎（可能撑爆 localStorage 5MB 限制）

    总结:
       *  persist 是 Zustand 的持久化中间件，能自动将状态同步到 localStorage 或 sessionStorage。
       *  它需要从 zustand/middleware 导入，因为 Zustand 核心不包含中间件，按需引入保持轻量。
       *  只能存储能被 JSON.stringify 序列化的数据（如对象、数组、字符串、数字）。

* */

import useThemeStore from "../../store/themeStore";

const ZustandPersist = () => {
    const { theme, lastUpdated, toggleTheme } = useThemeStore();

    return (
        <div
            style={{
                padding: "20px",
                backgroundColor: theme === "dark" ? "#333" : "#fff",
                color: theme === "dark" ? "#fff" : "#000",
            }}
        >
            <h2>Zustand — 持久化存储</h2>
            <p>当前主题: {theme}</p>
            <p>上次切换: {new Date(lastUpdated).toLocaleString()}</p>
            <button onClick={toggleTheme}>切换主题</button>
            <p>✅ 刷新页面后状态仍保留</p>
        </div>
    );
};

export default ZustandPersist;