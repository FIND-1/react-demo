/*
 子组件给父组件传值 :
     *  React 没有像 Vue 那样的emit派发事件，因此使用 回调函数模拟emit派发事件
         父组件传递函数过去,其本质就是: 录用子组件的函数的回调
* */


import React from "react"
interface Props {
    callback: (params: string) => void
    children?: React.ReactNode
}

const ChildByFunction: React.FC<Props> = (props) => {
    return (
        <div>
            <h1>子组件</h1>
            <button onClick={() => props.callback('我见过龙')}>子组件派发事件</button>
        </div>
    )
}

export default ChildByFunction
