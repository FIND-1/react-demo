import React, { useImperativeHandle, useRef, useState} from "react";

interface ChildRef {
    name: string
    count: number
    addCount: () => void
    subCount: () => void
}

//React19 直接使用 useImperativeHandle
    const Child = ({ ref }: { ref: React.Ref<ChildRef> }) => {
        const [count, setCount] = useState(0)
        useImperativeHandle(ref,() => ({
                name: 'child',
                count,
                addCount: () => setCount(count + 1),
                subCount: () => setCount(count - 1)
        }), [count]);

        return <div>
            <p>我是子组件</p>
            <div>count:{count}</div>
            <button onClick={() => setCount(count + 1)}>增加</button>
            <button onClick={() => setCount(count - 1)}>减少</button>
        </div>
    }

    function AddImperativeHandle19() {
    //重点: 将 useRef 的参数改为必须传入一个参数
        const childRef = useRef<ChildRef>(null)
        const showRefInfo = () => {
            console.log(childRef.current)
        }
        return (
            <div>
                <h2>useImperativeHandle --- 19: 直接使用 ref 使用子组件的方法和属性</h2>

                <p>我是父组件</p>
                <button onClick={showRefInfo}>获取子组件信息</button>
                <button onClick={() => childRef.current?.addCount()}>操作子组件+1</button>
                <button onClick={() => childRef.current?.subCount()}>操作子组件-1</button>
                <hr/>
                <Child ref={childRef}></Child>
            </div>
        );
    }

export default AddImperativeHandle19