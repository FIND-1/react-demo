/**
 * 父向子组件传递 props
       * props 是一个对象，会作为函数的第一个参数接受传过来的props值

   支持的类型如下：
       * string  title={'测试'}
       * number id={1}
       * boolean isGirl={false}
       * null  empty={null}
       * undefined  empty={undefined}
       * object  obj={ { a: 1, b: 2 } }
       * array  arr={[1, 2, 3]}
       * function cb={(a: number, b: number) => a + b}
       * JSX.Element element={<div>测试</div>}

   注意事项:
       * 单向数据流，子组件不能直接修改父组件的props
       * 在React源码中会使用 <Object.freeze> 冻结 props，限制props的修改。

   Object.freeze() 的作用是冻结对象，不能修改对象属性。
       * 用法: Object.freeze(obj)
* */
// 子组件
import React, {type JSX} from "react"
interface Props {
    title: string
    id: number
    obj: {
        a: number
        b: number
    }
    arr: number[]
    cb: (a: number, b: number) => number
    empty: null
    element: JSX.Element,
    isGirl: boolean
}

// 父(main.tsx)向子(PropsTest.tsx)组件传递 props
const PropsTest:React.FC<Props> = (props) => {
    console.log(props)
    return (
        <div>
            <h2>父向子组件传参</h2 >
            <div>父组件接受props传参title: {props.title}</div>
            <div>以下是传入的element:</div>
            <div>{props.element}</div>
        </div>
    )
}

export default PropsTest

