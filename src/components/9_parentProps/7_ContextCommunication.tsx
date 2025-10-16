/**
 * Context 实现跨层级通信:(使用useContext())
 *
   作用：
     * 避免深层组件间 props 逐层传递（prop drilling）
     * 提供全局/局部状态共享机制
  示例代码 :Context：跨层级状态共享
     1. createContext()
     2. <Provider value={data}>
     3. useContext(Context) 读取


  使用步骤：
      1. createContext() 创建上下文对象
      2. 使用 Provider 包裹组件树，通过 value 提供数据
      3. 子组件通过 useContext() 消费数据

   什么是 Provider 和 Consumer 模式？
   Provider：
      * 上下文“提供者”，设置子树的 context 值
      * 通过 value 属性传递可变状态

   Consumer（很少用）：
      * 上下文“消费者”，读取 context 值
      * 现代开发推荐使用 useContext Hook 替代

   <典型应用>：
     * 主题（Theme）
     * 认证状态（Authentication）
     * 国际化（i18n）
     * UI 状态共享（如语言、布局配置）

 注意事项:
     * 搭配 `useState` / `useReducer` 管理动态状态。
     * 使用 `useContext` Hook 订阅上下文。
     * 避免高频更新导致性能下降。
     * 简单父子通信仍优先使用 `props`。
     * 复杂状态逻辑建议采用 Redux、Zustand 等状态管理库。

 * */

import '../../assets/style/7_ContextCommunication.css'

type ThemeName = 'light' | 'dark';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

 interface ThemeContextType {
    theme: ThemeName;
    toggleTheme: () => void;
}

 const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

const ContextCommunication = () => {
    const [theme, setTheme] = useState<ThemeName>('light');
    // 初始化：从 localStorage 或系统偏好读取
    useEffect(() => {
        const saved = localStorage.getItem('app-theme') as ThemeName | null;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = saved || (prefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
    }, []);

    // 切换主题并保存
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    // 同步到 DOM 和 localStorage
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('app-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div
                style={{
                    padding: '20px',
                    minHeight: '100vh',
                    backgroundColor: 'var(--bg-container)',
                    color: 'var(--text-primary)',
                }}
            >
                <h2> useContext --跨层级通信</h2>
                <p>当前主题: <strong>{theme}</strong></p>

                <Level1 />

                <div style={{ marginTop: '20px', color: 'red' }}>
                    ❌ 外部按钮无法切换主题（不在 Provider 内）
                </div>
            </div>
        </ThemeContext.Provider>
    );
};

// 3. 中间层级组件
function Level1() {
    return (
        <div style={boxStyle}>
            <h2>Level 1</h2>
            <Level2 />
        </div>
    );
}

function Level2() {
    return (
        <div style={boxStyle}>
            <h3>Level 2</h3>
            <Level3 />
        </div>
    );
}

function Level3() {
    return (
        <div style={boxStyle}>
            <h4>Level 3</h4>
            <ThemeButton />
        </div>
    );
}

// 4. 按钮组件
function ThemeButton() {
    const { toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            style={{
                background: 'var(--btn-bg)',
                color: 'var(--btn-color)',
                padding: '8px 16px',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
            }}
        >
            🔆 点我切换主题 (当前: {useContext(ThemeContext)?.theme})
        </button>
    );
}

// 5. 通用盒子样式（使用 CSS 变量）
const boxStyle: React.CSSProperties = {
    border: '1px solid var(--border-color)',
    margin: '10px 0',
    padding: '15px',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-box)',
    color: 'var(--text-primary)',
};


export default ContextCommunication;