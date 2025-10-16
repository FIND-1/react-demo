/*
    什么是 requestIdleCallback ?
*   作用:
     * 它提供了一种机制，允许开发者在浏览器空闲时运行低优先级的任务，而不会影响关键任务和动画的性能。
       接受一个回调函数 callback 并且在回调函数中会注入参数 deadline
*  <callback> 会在浏览器空闲时被调用
*  <deadline> 有两个值:
   deadline.timeRemaining() 返回是否还有空闲时间(毫秒)
   deadline.didTimeout 返回是否因为超时被强制执行(布尔值)
   
  * options:
        { timeout: 1000 } 指定回调的最大等待时间（以毫秒为单位）。如果在指定的 timeout 时间内没有空闲时间，回调会强制执行，避免任务无限期推迟
 */

//模拟在浏览器空闲时，渲染1000条dom元素，非常流畅
const total = 1000; // 定义需要生成的函数数量，即1000个任务
const arr = [];    // 存储任务函数的数组

// 生成1000个函数并将其添加到数组中
function generateArr() {
    for (let i = 0; i < total; i++) {
        // 每个函数的作用是将一个 <div> 元素插入到页面的 body 中
        arr.push(function() {
            document.body.innerHTML += `<div>${i + 1}</div>`; // 将当前索引 + 1 作为内容
        });
    }
}
generateArr(); // 调用函数生成任务数组

// 用于调度和执行任务的函数
function workLoop(deadline) {
    // 检查当前空闲时间是否大于1毫秒，并且任务数组中还有任务未执行
    if (deadline.timeRemaining() > 1 && arr.length > 0) {
        const fn = arr.shift(); // 从任务数组中取出第一个函数
        fn(); // 执行该函数，即插入对应的 <div> 元素到页面中
    }
    // 再次使用 requestIdleCallback 调度下一个空闲时间执行任务
    requestIdleCallback(workLoop);
}

// 开始调度任务，在浏览器空闲时执行 workLoop
requestIdleCallback(workLoop,{ timeout: 1000});

/*
*
     为什么React不用原生 requestIdleCallback 实现呢？
   * 因为: 1: 兼容性差 Safari 并不支持(图片详见: ./requestIdleCallback.jpg)
          2: 控制精细度 React 要根据组件优先级、更新的紧急程度等信息，更精确地安排渲染的工作
             执行时机requestIdleCallback(callback) 回调函数的执行间隔是 50ms（W3C规定），也就是 20FPS，1秒内执行20次，间隔较长。
          3:差异性 每个浏览器实现该API的方式不同，导致执行时机有差异有的快有的慢
          
     requestIdleCallback替代方案是什么?
     * 1: 浏览器的 requestAnimationFrame API
     * 2: MessageChannel API
     * 3: setTimeout(fn, 0) 或 setImmediate (Node.js 环境)
     * 4: React 自己的调度器 (scheduler)
     这里首选: MessageChannel API. 详情参见:  messageChannel.js
* */

