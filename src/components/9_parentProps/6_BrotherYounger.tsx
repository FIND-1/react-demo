
import  { useEffect } from "react";
/**
 兄弟组件传参可能遇到的问题 :
     *  1: 严格模式<StrictMode>导致的重复监听
     *  原因: 在开发环境下，严格模式 会故意对组件函数执行两次（mount -> unmount -> mount）挂载组件，
             以检测副作用

     *  2:  若未正确清理，会导致同一事件被添加多个监听器，触发时重复执行
     *      (StrictMode → 双次执行 → 暴露副作用问题)

 解决方案：
     *  addEventListener → 必须配对 removeEventListener
     *  useEffect 清理函数 → 防止泄漏
 */
// 错误示例
// export default function BrotherYounger() {
//     //接受参数
//     window.addEventListener('on-card', (e) => {
//         console.log(e.params, '接受兄发送的事件') // 因此这里会被打印 2 次
//     })
//
//     return <div className="card"></div>
// }

//正确示例
export default function BrotherYounger() {
    // 接受参数
    useEffect(() => {
        const handleEvent = (e: CustomEvent) => {
            console.log(e.detail, '接受兄发送的事件')
        };
        window.addEventListener('on-card', handleEvent as EventListener);
        
        // 清理函数：组件卸载时移除事件监听器
        return () => {
            window.removeEventListener('on-card', handleEvent as EventListener);
        };
    }, []); // 空依赖数组表示只在组件挂载和卸载时执行

    return (
        <div>
            <h2>兄弟组件接受事件参数</h2>
        </div>
    )
}

