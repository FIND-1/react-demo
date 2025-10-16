//副作用函数运行之前，会清楚上一次的副作用函数,类似于componentWillUnmount
import {useEffect, useState} from "react";

// 子组件
const Child = (props: { name: string }) => {
    useEffect(() => {
        console.log('输入框值的变化', props.name)
        // 返回一个清理函数
        return () => {
            console.log('返回一个清理函数', props.name)
        }
    }, [props.name])
    return <div>Child组件的name属性:{props.name}</div>
}
const AddEffectComponentWillUnmount = () => {
    const [show, setShow] = useState(true)
    const [name, setName] = useState('')
    return (
        <div id='data'>
            <h2>useEffect 运行前清除上一次副作用函数</h2>
            <div>
                <h3>父组件</h3>
                <input value={name} onChange={e => setName(e.target.value)}/>
                <button onClick={() => setShow(!show)}>显示/隐藏</button>
            </div>
            <hr/>
            <h3>子组件</h3>
            {show && <Child name={name}/>}
        </div>
    )
}


export default AddEffectComponentWillUnmount;