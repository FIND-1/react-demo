/*
    useState 是什么?
        * useState 是 React 中的一个 Hook，用于在函数组件中添加状态管理功能

    怎么使用?
        * 语法格式: `const [state, setState] = useState(initialValue);`
        * 更新状态: 使用 setState 函数来更新状态值
    注意事项:
        * useState 是一个 Hook，因此只能在 组件的顶层 或自己的 Hook 中调用它。不能在循环或条件语句中调用它。
        * 状态更新是异步的
        * 避免直接修改状态
        * 可以使用函数式更新
       <函数式>: 关注 “做什么”（What to do）,即:用函数组合、数据转换的方式表达逻辑
                  const numbers = [1, 2, 3, 4];
                  const squared = [];
                  const squared = numbers.map(x => x * x);
       <命令式>: 关注 “怎么做”（How to do）,即:用一系列命令和步骤来描述逻辑
             for (let i = 0; i < numbers.length; i++) {
                    squared.push(numbers[i] * numbers[i]);
                }

* */

// 添加一个状态
import  { useState } from "react"
const AddState  = () => {
    //命名状态变量，例如 [index, setIndex]。
    //useState 返回一个只包含两个项的数组 :
    // 1: 该状态变量 当前的 state，最初设置为你提供的 初始化 state。
    // 2: set 函数，它允许你在响应交互时将 state 更改为任何其他值。
    const [count, setCount] = useState(0)
    return (
        <div>
            <h1>useState --计数器</h1>
            <p>You clicked {count} times</p>
            {/*调用 set 函数会异步的更新 state 将会重新渲染组件。*/}
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    )
}
export default AddState