
// useRef 解决计时器无法被停止的问题
import {useRef, useState} from 'react';
function AddTimerRef() {
    //原因: 每次点击按钮都会重新渲染页面，导致计时器被重新创建，从而导致计时器无法被停止
    console.log('render')
    // const timer: NodeJS.Timeout | null = null
    const  timer = useRef<null | NodeJS.Timeout>(null)
    const [count, setCount] = useState(0)
    const handleClick = () => {
        timer.current = setInterval(() => {
            setCount(count => count + 1)
        }, 300)
    };
    const handleEnd = () => {
        console.log(timer.current);
        if (timer.current) {
            clearInterval(timer.current)
            timer.current = null
        }
    };
    return (
        <div>
            <h2>useRef --- 计时器无法停止</h2>
            <button onClick={handleClick}>开始计数</button>
            <button onClick={handleEnd}>结束计数</button>
            <div>{count}</div>
        </div>
    );
}


export default AddTimerRef;
