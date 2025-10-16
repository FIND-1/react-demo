/*
  自定义Hook 是什么？
    * 在 React 内置 Hooks 中没有满足需求时，可以创建一个自定义 Hook。
    * 本质上是一个普通的函数，内部可以调用 React 的其他 Hook，实现逻辑复用。

   为什么叫 Hook ？
    *  因为它“钩入”了 React 的渲染周期和状态管理机制

  规则:
    * 自定义 Hook 的名称必须以 use 开头（如 useWatermark、useRequest）。
    * 自定义 Hook 必须返回一个值（可以是 state、方法、对象等）。

  原理剖析：
    * 自定义 Hook 并不是 React 提供的特殊能力，而是利用函数和内置 Hook 的组合。
    * 当多个组件需要相同逻辑时，可以抽离为自定义 Hook，避免重复代码。
    * 每次组件调用自定义 Hook 时，都会生成独立的 state 和副作用，互不干扰。

  注意事项：
    * 不要在条件语句、循环中调用自定义 Hook，必须遵循 Hook 的调用规则。
    * 自定义 Hook 内部可以使用其他 Hook，但调用顺序必须保持一致。
    * 自定义 Hook 只负责逻辑复用，不负责渲染 UI。

  推荐使用:
    * 社区库：ahooks（Ant Group 出品，包含大量高质量自定义 Hook）
      https://ahooks.js.org/zh-CN/hooks/use-request/index

  <典型应用>：
    * 请求数据（useRequest）
    * 管理计时器（useInterval）
    * 监听事件（useEventListener）
    * 控制状态（useToggle、useBoolean）

  自定义 Hook 与高阶组件（HOC）的区别？
    * HOC 使用组件包裹，容易产生“嵌套地狱”和 props 冲突。
    * 自定义 Hook 更简洁、直观，逻辑复用更自然，是 React 官方推荐的方式。
*/

// 自定义水印Hook:  详见 useWatermark

import {useWatermark} from "../../hooks/useWatermark.tsx";
import React, { useState } from "react"

const AddHook: React.FC = () => {
    const [text, setText] = useState("默认水印")
    const [updateWatermark] = useWatermark({
        content: text,
        fontColor: "red",
        fontSize: 20,
        gapX: 180,
        gapY: 120,
    })

    const handleChange = () => {
        const newText = "点击后更新的水印"
        setText(newText)
        updateWatermark({ content: newText }) // 更新 hook 内部的水印内容
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>水印 Hook 示例</h2>
            <p>当前水印内容：{text}</p>
            <button onClick={handleChange}>更新水印</button>
        </div>
    )
}

export default AddHook
