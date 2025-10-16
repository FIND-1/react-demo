/*
  Suspense 是什么？
    * React 提供的一个组件，用来处理异步渲染。
    * 它允许在组件渲染前，等待某些异步操作（如数据加载、代码分割）完成。
    * 在等待过程中，可以显示一个后备内容 (fallback)。

    怎么使用？
    * 基本语法：
            <Suspense fallback={<Loading />}>
                <SomeComponent />
            </Suspense>

     参数:
     *  <fallback>: 在子组件未准备好时渲染的备用 UI。
     *  <children>: 需要被 Suspense 包裹的异步组件。

    返回值:
     * 返回一个 React 元素，负责渲染 fallback 或 children。

  原理剖析：
    * Suspense 会捕获子组件渲染过程中抛出的 "Promise"。
    * 当 Promise 未完成时，Suspense 渲染 fallback。
    * 当 Promise resolve 后，重新触发渲染，显示真正的内容。

  注意事项：
    * Suspense 本身不会发起数据请求，只是负责处理等待逻辑。
    * 必须配合 React.lazy 或基于 Suspense 的数据获取方案（如 React 18 的 `use` 或 `relay`）。
    * fallback 只能是一个 ReactNode，不能传函数。
    * Suspense 边界可以嵌套，内部 Suspense 会覆盖外层的 fallback。

 <典型应用>：
    * 代码分割 (React.lazy)
    * 数据请求 (React 18 + use / React Cache / Relay)
    * 并发渲染 (Concurrent Rendering)
    * 路由切换时的占位符 (React Router v6 的 lazy routes)

  推荐使用：
    * React.lazy 与 Suspense 结合实现组件按需加载。
    * React 18 中与 `use` API 搭配实现数据获取与并发渲染。
    * 通常在请求错误时,会搭配 ErrorBoundary 组件处理。
*/

//异步加载组件
import React from "react";

const AsyncComponent: React.FC = () => {
    return <div>我是异步加载的组件 🎉</div>;
};

export default AsyncComponent;




