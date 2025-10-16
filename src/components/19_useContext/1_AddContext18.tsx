/*
  useContext 是什么？
     * useContext 是 React 的一个 Hook，用于在函数组件中快速获取 Context 的值。
     * 避免深层组件间 props 逐层传递（prop drilling）
      (类似于 Vue 中的 provide/inject)。

  怎么使用？
     * 语法格式：` const value = useContext(MyContext)`

     参数：
     * <Context>：由 createContext 创建的对象，本身不存储数据，只作为信息的载体。
     返回值: Provider 提供的 Context 值（只读）。当值变化时，所有消费该 Context 的组件会自动重新渲染。

  原理剖析：
     * Context 是 React 提供的跨组件数据传递机制。
  使用步骤：
      1. 使用 `createContext` 创建一个上下文对象。
      2. 在父组件用 `<MyContext.Provider>` 提供 value。
      3. 在子组件用 `useContext(MyContext)` 消费 value。
     * 当 Provider 的 value 变化时，所有使用 useContext 的后代组件都会重新渲染。

  注意事项：
     * useContext 只能读取最近一层 Provider 的 value。
     * 如果没有 Provider 包裹，则读取的是 createContext 的默认值。

 <典型应用>：
     * 主题（Theme）
     * 认证状态（Authentication）
     * 国际化（i18n）
     * UI 状态共享（如语言、布局配置）

  总结:
     1. useContext 是 React 提供的跨组件状态共享 Hook，避免繁琐的 props 层层传递。
     2. 必须配合 `createContext` + `Provider` 使用。
     3. 优先考虑状态提升（props），在层级过深时再使用 Context。
     4. 注意性能问题：一旦 Provider 的 value 改变，所有使用 useContext 的后代组件都会重新渲染。
      - 解决方式：拆分 Context / 使用 memo / 引入 Zustand、Jotai 等状态库。
*/

//React 18

// 定义上下文类型
interface ThemeContextType {
    theme: string;
    setTheme: (theme: string) => void;
}
const defaultContext: ThemeContextType = {
    theme: 'light',
    setTheme: () => {}
};
import React, {useContext, useMemo, useState} from 'react';
// 创建上下文
const ThemeContext = React.createContext<ThemeContextType>(defaultContext);

const Child = () => {
    // 获取上下文
    const themeContext = useContext(ThemeContext);
    const styles = {
        backgroundColor: themeContext.theme === 'light' ? 'white' : 'black',
        border: '1px solid skyblue',
        width: `${100}px`,
        height: `${100}px`,
        transition: 'all 0.5s ease-in-out',
        color: themeContext.theme === 'light' ? 'black' : 'white'
    }
    return <div>
        <div style={styles}>
            child
        </div>
    </div>
}

const Parent = () => {
    // 获取上下文
    const themeContext = useContext(ThemeContext);
    const styles = {
        backgroundColor: themeContext.theme === 'light' ? 'white' : 'black',
        border: '1px solid red',
        width: '30%',
        height:`${300}px`,
        transition: 'all 0.5s ease-in-out',
        color: themeContext.theme === 'light' ? 'black' : 'white'
    }
    return <div>
        <div style={styles}>
            Parent
        </div>
        <Child />
    </div>
}

/*
* 根组件 AddContext18 : 通过 ThemeContext.Provider 向下传递 theme 和 setTheme。
* Parent 和 Child 组件通过 useContext(ThemeContext) 获取上下文。
* */
function AddContext18() {
    const [theme, setTheme] = useState('light');
    return (
        <div>
            <h2>useContext ---18: 需要 Provider 包裹 ，才能获取上下文</h2>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>切换主题</button>
            {/*优化建议：用 useMemo 缓存 value：*/}
            {/*<ThemeContext.Provider value={{ theme, setTheme }}>*/}
            <ThemeContext.Provider value={useMemo(() => ({theme, setTheme}), [theme])}>
                <Parent/>
            </ThemeContext.Provider>
        </div>
    );
}

export default AddContext18;

