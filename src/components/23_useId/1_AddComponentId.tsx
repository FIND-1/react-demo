/*
  useId 是什么？
    * useId 是 React 18 新增的一个 Hook，用于生成 稳定且唯一的 ID。
    * 主要用于 SSR（服务端渲染）和 CSR（客户端渲染）混合应用中，
      避免由于服务端与客户端生成的 ID 不一致而导致的 hydration 警告。
    * 每次渲染生成的 ID 都是稳定的（不会因组件重新渲染而变化）。

  hydration mismatch 是什么 ?
    * hydration mismatch 是一种提示,说明 React 在服务端渲染和客户端渲染之间发生的不匹配。
    * useId 本就会导致“HTML 不匹配”，但这不是 bug，而是设计如此！

  为什么 服务端客户端 ID 一致, 控制台还显示 hydration mismatch？
    * 原因：React 的 hydration 检查机制很严格 ,(尤其在 React 18~19 初期版本常见）
    * 解决 : 在使用id的组件上  添加: suppressHydrationWarning={true}

  怎么使用？
    * 语法格式：
        const id = useId();

    * 入参：
         无

    * 返回值：
         返回一个字符串形式的唯一 ID，例如 ":r0:"，多次调用会生成不同的 ID（值递增）。

  原理剖析：
    * React 内部维护了一个 ID 计数器（Fiber Tree 上分配）。
    * 在 SSR 阶段生成的 ID 与 CSR 阶段生成的 ID 会保持一致，从而避免 hydration mismatch。
    * useId 的 ID 与组件树的渲染顺序绑定，而不是与渲染次数绑定，所以它是稳定的。

  注意事项：
    * useId 不是用来生成全局唯一的 ID（如数据库主键），而是"用来保证同一组件树内的稳定 ID"。
    * 不能将 useId 的结果用于 key 属性，key 需要与列表数据绑定。
    * ID 前缀格式可能因 React 版本不同而变化，通常表现为 ` :r0:`、` :r1:` 之类。

  <典型应用>：
    * 表单场景：label 与 input 的 for/id 绑定
    * 多个表单项时，每个 useId 调用会生成不同的 ID，避免冲突。

  使用建议:
    * 需要在 “无状态组件中生成稳定 ID” 时使用 useId（尤其是 SSR 应用）。
    * 如果需要全局唯一 ID（如数据库、日志追踪），建议使用 uuid 等第三方库。

  useId 与 Math.random / uuid 的区别：
    * useId：渲染稳定、SSR 与 CSR 一致，避免 hydration 警告（React 内部控制）。
    * Math.random：每次渲染都会生成不同的值，SSR 与 CSR 渲染时可能不一致。
    * uuid：能生成全局唯一 ID，但 SSR/CSR 渲染时生成的 ID 不一致，可能导致 hydration mismatch。
*/
/*
* 💡 什么是 CSR（客户端渲染）？
    * 页面内容由浏览器端通过 JavaScript 动态生成和渲染。

  🚀工作流程:
    1. 浏览器请求页面，服务器返回基本 HTML + JS 文件；
    2. 浏览器下载并执行 JS；
    3. JS 在客户端获取数据并生成页面内容；
    4. 浏览器呈现最终页面。

 优点：
    * 页面交互性强，体验流畅；
    * 减轻服务器压力：渲染工作由客户端完成
    * 适合构建复杂的单页应用（SPA）
 缺点：
    * 首屏加载较慢：需要先下载并执行JS才能显示内容
    * SEO不友好：搜索引擎爬虫可能无法正确索引内容
    * 对网络速度要求较高

 与 SSR（服务端渲染）区别:
   * SSR：服务器生成完整 HTML；
   * CSR：浏览器端通过 JS 动态生成内容

* */



import {useId} from "react";
// 为组件生成唯一 ID
export const AddComponentId = () => {
    const id = useId()
    console.log(id) // «r0»
    return (
        <>
            <h2> useId --- 为组件添加一个唯一的 ID</h2>
            <label htmlFor={id}>Name</label>
            <input id={id} type="text"/>
        </>
    )
}


export default AddComponentId;


