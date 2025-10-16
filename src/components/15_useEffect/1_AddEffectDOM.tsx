/*
    useEffect 是什么?
        * useEffect 是 React 中用于处理副作用的钩子, 在"函数组件"中执行生命周期任务,
         （相当于 "类组件" 的 componentDidMount、componentDidUpdate、componentWillUnmount 生命周期函数）。

    什么是类组件？什么是函数组件？
        * 函数组件: 接收 props 并返回 JSX 的简单函数，现在通过 Hooks 也能实现状态和副作用管理。
        * 类组件: 是基于 ES6 class 语法的组件，具有状态和生命周期方法

    什么是副作用函数，什么是纯函数？
        * 纯函数: 对于相同的输入总是返回相同的结果，且不产生任何副作用（如修改外部变量、网络请求、DOM 操作等）的函数
        * 副作用函数: 与纯函数相反,（如修改外部变量、网络请求、DOM 操作等）的函数

    怎么使用?
        * 语法格式: `useEffect(setup, dependencies?)`

        参数:
        * <setup>：Effect处理函数,可以返回一个清理函数。组件挂载时执行setup,
                  依赖项更新时先执行cleanup再执行setup,组件卸载时执行cleanup。
        * <dependencies>(可选)：setup中使用到的响应式值列表(props、state等)。
                               必须以数组形式编写如[dep1, dep2]。不传则每次重渲染都执行Effect。

        *  返回值: useEffect 返回 undefined

   注意事项:
          *  必须处理依赖数组（Dependencies）, 遗漏依赖项会导致闭包问题（stale closure），使用旧的 props 或 state。
          *  避免无限循环依赖，如果 useEffect 中更新了依赖项，且未正确控制，会触发无限渲染。
          *  不要在 useEffect 中放置可变对象/函数作为依赖。
          *  必须清理副作用, 否则会导致内存泄漏。
       常见的必须清理副作用：
          *  网络请求 : fetch 请求 /axios 请求
          *  定时器 : setTimeout / setInterval
          *  订阅 : WebSocket / AbortController
          *  事件监听  : addEventListener / removeEventListener

   <典型应用>：
          * API 请求
          * 事件监听
          * 操作 DOM

    总结:
       * 有副作用，就用 useEffect；有副作用，必清理!!!
* */

import  { useEffect, useRef } from 'react';
// 基础操作DOM 案例
// function AddEffectDOM() {
//     const dom = document.getElementById('data')
//     console.log(dom) // 在"渲染阶段"执行，此时 DOM 尚未挂载,所以dom 还是 null
//     useEffect(() => {
//         const el = document.getElementById('data')
//         console.log(el) //useEffect 的回调函数在 "提交阶段"之后执行，也就是 DOM 已经挂载完成。
//                           //所以获取到 <div id='data'>AddEffect DOM</div>
//         if (el) {
//             el.style.color = 'red';
//         }
//     }, [])
//     return (
//         <div>
//             <h2>useEffect 基础操作DOM </h2>
//             <p id='data'>AddEffect DOM</p>
//         </div>
//     )
// }

// 优先使用 ref 操作 DOM  (推荐)
function AddEffectDOM() {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (elRef.current) {
            elRef.current.style.color = 'red';
        }
    }, []);
    return (
        <div>
            <h2>useEffect 使用ref操作DOM </h2>
            <p id='data'>AddEffect DOM</p>
        </div>
    )
}
export default AddEffectDOM;