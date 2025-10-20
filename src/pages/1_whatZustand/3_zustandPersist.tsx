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
          // 也可以用 sessionStorage、IndexedDB、加密存储等
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

import React from "react";
import useThemeStore from "../../store/themeStore";

const ZustandPersist: React.FC = () => {
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


/*
   toLocaleString() 的作用是什么?
     *  JavaScript 中 Date 对象的内置方法，用于将日期时间转换为字符串

   作用：
     *  将日期时间根据本地（用户所在地区）的格式和时区转换为“人类可读”的字符串。

    怎么使用?
    <基础语法>:
     *  dateObj.toLocaleString([locales[, options]])

    参数:
     *  <locales?> string | string[] (可选),指定语言区域（如 'zh-CN'、'en-US'），用于控制格式（数字、月份、时间等）的本地化表现。
     *  <options?> Object[] (可选),
        配置输出格式的详细选项，常用属性包括：
        • year, month, day：日期部分格式（如 'numeric', '2-digit'）
        • hour, minute, second：时间部分格式
        • hour12：是否使用 12 小时制（true/false）
        • timeZone：指定时区（如 'Asia/Shanghai'），默认为本地时区

     *  若不传参数，使用运行环境的默认语言和本地时区。

    返回值:
     *  表示该日期时间的本地化字符串。

   注意事项:
     *  未指定 `locales` 和 `options` 时，输出依赖系统语言和时区，格式可能不一致。
     *  默认使用本地时区，显示特定时区需通过 `timeZone` 显式设置。
     *  部分 Node.js 环境（如 Alpine）缺少国际化支持，可能导致本地化失效。
     *  输出仅用于展示，*不可解析或用于数据传输*。
     *  高频调用可能影响性能，建议缓存结果。
     *  某些语言文本较长，可能撑破布局，可用 `month: 'short'` 等控制长度。

   <典型应用>：
     *  用户界面中的时间展示
     *  多语言（国际化 i18n）应用

* */

/*
   toISOString() 的作用是什么?
     *  JavaScript 中 Date 对象的内置方法，用于将日期时间转换为标准化的字符串

    作用：
     *  将日期时间转换为 ISO 8601 格式的字符串（YYYY-MM-DDTHH:mm:ss.sssZ），始终使用 UTC（协调世界时）时区，不依赖本地环境。

    怎么使用?
    <基础语法>:
     *  dateObj.toISOString()

   参数:
     *  无参数（该方法不接受任何参数）

   返回值:
     *  返回一个符合 ISO 8601 标准的字符串，格式为：YYYY-MM-DDTHH:mm:ss.sssZ
     *  示例：'2025-10-20T14:30:00.000Z'
     *  该字符串始终表示 UTC 时间，末尾的 'Z' 表示零时区（Zulu time）

   注意事项:
     *  如果 Date 对象表示的时间早于公元 0 年或晚于公元 9999 年，会抛出 RangeError。
     *  该方法不进行本地化处理，也不受系统语言或时区设置影响，输出完全确定。
     *  适用于数据交换、日志记录、API 请求/响应等需要统一时间标准的场景。

   <典型应用>：
     *  与后端 API 交互时传递时间字段
     *  存储或序列化时间数据（如 JSON）
     *  需要跨时区一致性的系统日志或审计记录

    总结:
    *  给人看用 toLocaleString()，给机器用 toISOString()。
*/