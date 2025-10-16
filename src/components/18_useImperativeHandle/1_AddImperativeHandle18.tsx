/*
    useImperativeHandle 是什么?
        * useImperativeHandle 是 React 中的一个高级 Hook，用于在函数组件中自定义暴露给父组件的“实例值”（即 ref 对象的内容）。
        * 它允许子组件暴露特定的方法或属性，供父组件通过 ref 调用，实现“命令式控制”。
         (类似于 Vue 3 中的 `defineExpose`)。

    怎么使用?
        * 语法格式: `useImperativeHandle(ref, createHandle, [deps])`

        参数:
        <ref>: 父组件传递的ref对象。
        <createHandle>: 返回一个对象，对象的属性就是子组件暴露给父组件的方法或属性。
        <[deps]?> : (可选)依赖项，当依赖项发生变化时，会重新调用 createHandle 函数，类似于 useEffect 的依赖项
        * 不传 [deps]         每次渲染都会执行 createHandle（不推荐，可能导致 ref 频繁变化）
        * 传[deps],但没有值:   仅在组件挂载时执行一次（最常见用法）
        * 传[deps]且有值 :     挂载时 + 依赖变化时重新执行

        原理剖析:
        * React 的 ref 默认指向 DOM 元素或组件实例, 但在函数组件中没有“实例”概念。
        * useImperativeHandle 结合 forwardRef，让函数组件也能“模拟”出一个可被父组件操作的“句柄”（handle），
          从而实现跨组件命令式通信。

   注意事项:
        * <React 18> 需要配合 forwardRef 一起使用
            使用 forwardRef 包装组件，接收 ref 参数:
            forwardRef(function(props, ref) {})
        * <React 19> 直接使用即可, 不需要配合 forwardRef 一起使用


   <典型应用>：
       * 视频播放器（暴露 play/pause/seek 方法）
       * 模态框 / 抽屉控制（暴露 open/close 方法）
       * 表单组件封装（暴露 validate、reset 方法）

    总结:
       1. useImperativeHandle 主要用于：当子组件需要“暴露方法”给父组件时。
       2. 必须配合 forwardRef 使用（React 18 及以下版本）。
       3. 注意性能,合理传递依赖数组，避免 ref 频繁变化

    原则：
      * 优先使用声明式（props 驱动），只有在必要时才使用命令式（ref 驱动）。
* */
import React, {useState, useRef, useImperativeHandle, forwardRef} from 'react';

interface ChildRef {
    name: string
    count: number
    addCount: () => void
    subCount: () => void
}

//React18.2 需要 useImperativeHandle 搭配 forwardRef
const Child = forwardRef<ChildRef>((_, myRef) => {
    const [count, setCount] = useState(0)
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    
    //useImperativeHandle 的 ref 参数，返回一个对象，对象中定义了子组件的方法和属性
    useImperativeHandle(myRef, () => {
        return {
            name: 'child',
            count,
            addCount: () => setCount(count + 1),
            subCount: () => setCount(count - 1),

        }
    }, [count]) // 依赖项
    
    // 处理输入框值变化，如果输入的是数字，则更新count值并保留两位小数
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        
        // 如果输入的是有效数字，则更新count
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
            setCount(parseFloat(numValue.toFixed(2)));
        }
    };
    
    return <div>
        <p>我是子组件</p>
        <div>count:{count}</div>
        <button onClick={() => setCount(count + 1)}>增加</button>
        <button onClick={() => setCount(count - 1)}>减少</button>
        {/* 子组件单独控制输入框聚集,并修改当前count的值并保留2位小数 */}
        <div>
            <input 
                ref={inputRef}
                type="text" 
                value={inputValue} 
                onChange={handleInputChange}
                placeholder="输入数字..."
                id="child-input-field"
            />
            <button onClick={() => {
                inputRef.current?.focus();
                setInputValue(count.toFixed(2));
            }}>聚焦</button>
        </div>
    </div>
})

const AddImperativeHandle18: React.FC = () => {
    const childRef = useRef<ChildRef>(null)
    const showRefInfo = () => {
        console.log(childRef.current)
    }
    return (
        <div>
            <h2>useImperativeHandle --- 18.2搭配forwardRef: 父组件使用子组件的方法和属性</h2>
            <p>我是父组件</p>
            <button onClick={showRefInfo}>获取子组件信息</button>
            <button onClick={() => childRef.current?.addCount()}>操作子组件+1</button>
            <button onClick={() => childRef.current?.subCount()}>操作子组件-1</button>
            <hr/>
            <Child ref={childRef}></Child>
        </div>
    );
}


export default AddImperativeHandle18;
