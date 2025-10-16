
//React 19

// 定义上下文类型
interface ThemeContextType {
    theme: string;
    setTheme: (theme: string) => void;
}
// const defaultContext: ThemeContextType = {
//     theme: 'light',
//     setTheme: () => {}
// };
import React, {useContext, useMemo, useState} from 'react';
// 创建上下文
const ThemeContext = React.createContext<ThemeContextType>({} as ThemeContextType);
// const ThemeContext = React.createContext<ThemeContextType>(defaultContext);

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
*  ThemeContext 在 <React 18> / <React 19> 的 变化 :
    18: 需要 Provider 包裹
    19: 不需要再使用 Provider 包裹，直接使用即可。
* */
// function AddContext19() {
//     const [theme, setTheme] = useState('light');
//     return (
//         <div>
//             <h2>useContext ---19: 不需要使用 Provider </h2>
//             <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>切换主题</button>
//             <ThemeContext value={useMemo(() => ({ theme, setTheme }), [theme])}>
//                 <Parent />
//             </ThemeContext>
//         </div >
//     );
// }


/*
* 注意:
   1. 使用 ThemeContext 时，传递的 key 必须为 value
     否则传递key的值不是value,则不生效
     控制台输出: Uncaught TypeError: Cannot read properties of undefined (reading 'theme')
* */
// function AddContext19() {
//     const [theme, setTheme] = useState('light');
//     return (
//         <div>
//             <h2>useContext --- ThemeContext 传递的 key 必须为 value</h2>
//             <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>切换主题</button>
//             <ThemeContext value={useMemo(() => ({ theme, setTheme }), [theme])}>
//                 <Parent />
//             </ThemeContext>
//         </div >
//     );
// }


/*
* 注意点:
    *   2. 可以使用多个Context,但是使用的值不能相同，否则传递的value值会覆盖。
* */
function AddContext19() {
    const [theme, setTheme] = useState('light');
    return (
        <div>
            <h2>useContext ---可以使用多个Context,但是使用的值不能相同，否则传递的value值会覆盖</h2>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>切换主题</button>
            <ThemeContext value={useMemo(() => ({theme: 'light', setTheme}), [])}>
                <ThemeContext value={useMemo(() => ({theme: 'dark', setTheme}), [])}>{/* 覆盖了上面的值 */}
                    <Parent/>
                </ThemeContext>
            </ThemeContext>
        </div>
    );
}

export default AddContext19;

