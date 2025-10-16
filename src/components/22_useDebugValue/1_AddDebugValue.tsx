/*
  useDebugValue 是什么？
      * useDebugValue 是 React 提供的一个调试 Hook。
        主要用于自定义 Hook 中，在 React DevTools 中显示更友好的调试信息
      * 不会影响运行逻辑，只在开发环境下有用

   React DevTools安装教程:
     访问 https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=zh-cn ,
     点击"添加至 Chrome"即可安装

  怎么使用？
      * 语法格式：`const debugValue = useDebugValue(value, formatFunction?)`

    参数：
      * <value>：要在 React DevTools 中显示的值。
      * <formatFunction>： (可选) 格式化函数
         作用：自定义值的显示格式
         调用时机：仅在 React DevTools 打开时才会调用，可以进行复杂的格式化操作
         参数：接收 value 作为参数
         返回：返回格式化后的显示值

    返回值： 无，仅提供给 DevTools 显示。

    原理剖析：
      * React DevTools 默认只展示组件、state、props。
      * 自定义 Hook 内部状态默认不可见。
      * useDebugValue 提供一个“标记”，在 DevTools 中更清晰展示自定义 Hook 状态。
      * 在生产环境不会运行，不影响性能。

    注意事项：
      * 仅用于调试，不能在业务逻辑里依赖 useDebugValue。
      * formatFunction 只有在 DevTools 展开时调用，避免不必要的性能开销。
      * 在生产环境不会生效。

 <典型应用>：
     * 在自定义 Hook 内部，向 DevTools 提供调试信息(例如：网络状态、表单状态、数据请求结果等)

  使用建议:
     * 仅在自定义 Hook 中使用 useDebugValue
     * 对于简单的值，可以省略 formatFunction 函数
     * 当格式化值的计算比较昂贵时，建议使用 formatFunction 函数，
       因为它只在开发者工具打开时才会执行
*/

import  { useState, useDebugValue } from 'react';

//查看方法:  打开 控制台找到 “Components* ” ==> 对应的组件名 “AddDebugValue” ==> hooks

// 自定义 cookiesHook :
const useCookie = (name: string, initialValue: string = '') => {
    const getCookie = () => {
        const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)(;|$)`))
        return match ? match[2] : initialValue
    }
    const [cookie, setCookie] = useState(getCookie())
    const updateCookie = (value: string, options?: string) => {
        document.cookie = `${name}=${value};${options}`
        setCookie(value)
    }
    const deleteCookie = () => {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`
        setCookie(initialValue)
    }
    useDebugValue(cookie, (value) => {
        return `cookie: ${value}`
    })
    return [cookie, updateCookie, deleteCookie] as const
}

const AddDebugValue = () => {
    const [cookie, updateCookie, deleteCookie] = useCookie('key', 'value')
    return (
        <div>
            <h2>useDebugValue -- 通过 useDebugValue 自定义 Hook 状态</h2>
            <div>{cookie}</div>
            <button onClick={() => { updateCookie('update-value') }}>设置cookie</button>
            <button onClick={() => { deleteCookie() }}>删除cookie</button>
        </div>
    );
}


export default AddDebugValue;


