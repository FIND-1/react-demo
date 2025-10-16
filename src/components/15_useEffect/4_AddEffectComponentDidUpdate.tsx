//组件在更新时类似于 componentDidUpdate + componentDidMount。
import {useEffect, useState} from "react";

const AddEffectComponentDidUpdate = () => {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('')
    useEffect(() => {
        console.log('count有变化,但是不能检测name的变化', count, name)
    }, [count]) //当count发生改变时执行
    return (
        <div id='data'>
            <h2>useEffect 在指定变量的变化时执行</h2>
            <div>
                <p>count:{count}</p>
                <button onClick={() => setCount(count + 1)}>+</button>
            </div>
            <div>
                <p>name:{name}</p>
                <input value={name} onChange={e => setName(e.target.value)}/>
            </div>
        </div>
    )
}

export default AddEffectComponentDidUpdate;