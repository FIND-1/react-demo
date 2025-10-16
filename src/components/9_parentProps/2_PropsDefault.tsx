// 子组件
import React, {type JSX} from "react"

interface Props {
    title?: string
    id: number
    obj: {
        a: number
        b: number
    }
    arr: number[]
    cb: (a: number, b: number) => number
    empty: null
    element: JSX.Element,
    isGirl?: boolean
}

// 方法一 : 将props进行解构，定义默认值 {title = '默认标题'}
// const PropsDefault:React.FC<Props> = ({title = '默认标题'}) => {
//     return <div>Test{ title}</div>
// }

// 方法二 : 使用defaultProps进行默认值赋值，最后把defaultProps 和 props 合并，
// 注意顺序要先写defaultProps，再写props 因为props会覆盖defaultProps的值(不推荐)。

const defaultProps: Partial<Props> = {
    title: 'defaultProps默认标题',
}
//props
const PropsDefault: React.FC<Props> = () => {
    // const { title } = { ...defaultProps, ...props }
    return (
        <div>
            <h2>没有props传参的情况下,使用默认值: </h2>
            <p>{defaultProps.title}</p>
        </div>
    )
}


export default PropsDefault


