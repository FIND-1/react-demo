/*
    useRef 是什么?
        * useState 是 React 中的一个 Hook，用于处理DOM元素或需要在组件渲染之间保持持久性数据时,
        (类似于 Vue 3 中的 `ref`)。

    怎么使用?
        * 语法格式: `const refValue = useRef(initialValue)`
        * 获取当前值(非响应式): `refValue.current`
        参数:
         * initialValue: 初始值,默认为 null, 在首次渲染后被忽略。
        返回值:
        * <useRef>: 返回一个对象，对象的 current 属性指向传入的初始值。 {current:xxxx}

   注意事项:
       * 改变 ref.current 属性时，React 不会重新渲染组件。
       * 除了 初始化 外不要在渲染期间写入或者读取 ref.current，否则会使组件行为变得不可预测。
       * useRef 的值不能作为 useEffect 等 Hooks 的依赖项，因为它不是响应式状态
       * useRef 不能直接获取子组件的实例（特别是函数组件），必须配合 `forwardRef` 和 `useImperativeHandle` 实现跨层级命令式操作。
       * 【补充】在（Strict Mode）下，开发环境会故意挂载-卸载-重新挂载组件以检测副作用问题，此时 useRef 能帮助保留状态（相比局部变量更稳定）。
   <典型应用>：
       *  访问 DOM 元素
       *  保存上一次的 props 或 state
       *  实现命令式 API（配合 forwardRef + useImperativeHandle）
                        详见: 18_useImperativeHandle
       *  存储定时器 ID 或 WebSocket 实例等不会触发渲染但需持久保存的值
       *  性能优化：避免重复创建昂贵对象

    总结:
      *  useRef 提供了一个在渲染间持久存在的“盒子” { current: ... }
      *  useRef 不会触发组件重新渲染
      核心用途是：访问 DOM、保存可变实例字段、跨越渲染保持数据。

      * 与 state 对比：
          - useState: 数据驱动 UI 更新（响应式）
          - useRef: 数据独立于 UI 生命周期（非响应式）

    使用建议：读写 ref 应发生在副作用或事件中，而非渲染逻辑内。

* */


// useRef 获取dom元素
import { useRef } from "react"
function AddDOMRef() {
    //1: 首先，声明一个 初始值 为 null 的 ref 对象
    const div = useRef(null)
    const handleClick = () => {
        //2: 当 React 创建 DOM 节点并将其渲染到屏幕时，React 将会把 DOM 节点设置为 ref 对象的 current 属性
        console.log(div) //{current:div}
        console.log(div.current) //<div>div-dom</div>
    }
    return (
        <>
            <h2>useRef --- 获取dom元素</h2>
            {/*3:然后将 ref 对象作为 ref 属性传递给想要操作的 DOM 节点的 JSX*/}
            <div ref={div}>div-dom</div>
            <button onClick={handleClick}>获取dom元素</button>
        </>
    )
}


export default AddDOMRef;
