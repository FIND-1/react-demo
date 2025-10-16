/*
  兄弟组件通信原理: 发布订阅设计模式
     *   使用原生浏览器事件中心
* */

import React from "react"

const BrotherOlder: React.FC = () => {
    const event = new Event('on-card') //添加到事件中心
    const clickTap = () => {
        console.log(event)
        event.params = { name: '兄长派发信息' }
        window.dispatchEvent(event) //派发事件
    }
    return (
        <div>
            <h2>兄长组件</h2>
            <button onClick={clickTap}>派发事件</button>
        </div>
    )
}
//扩充event类型
declare global {
    interface Event {
        params: { name: string }
    }
}

/*
 * 这段代码在 React.StrictMode 下可能存在问题：
 * 
 * 1. 使用非标准方式扩展 Event 对象：
 *    直接给 event.params 赋值不是标准做法，更推荐使用 CustomEvent 和 detail 属性
 * 
 * 2. 更好的实现方式是使用 CustomEvent：
 * 
 *    const clickTap = () => {
 *        // 创建自定义事件并传递参数
 *        const event = new CustomEvent('on-card', {
 *            detail: { name: '兄长派发信息' }
 *        });
 *        window.dispatchEvent(event); // 派发事件
 *    }
 */

export default BrotherOlder