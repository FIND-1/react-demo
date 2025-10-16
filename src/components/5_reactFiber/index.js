/*
* 什么是react Fiber?
* 含义:
*     React Fiber是React 16引入的一种新的协调算法，用于解决和优化 React 应用的性能问题。
*
* 先导知识(requestIdleCallback):  是浏览器提供的 API，允许开发者在浏览器空闲时间执行低优先级任务，避免阻塞关键的渲染和用户交互。
* 具体作用:
*    1. 可中断的渲染：Fiber 允许将大的渲染任务拆分成多个小的工作单元，
*                   使得 React 可以在空闲时间执行这些小任务。
*                   当浏览器需要处理更高优先级的任务时（如用户输入、动画），
*                   可以暂停渲染，先处理这些任务，然后再恢复未完成的渲染工作。

*    2. 优先级调度：  React 可以根据不同任务的优先级决定何时更新哪些部分。
*                   React 会优先更新用户可感知的部分（如动画、用户输入），
*                   而低优先级的任务（如数据加载后的界面更新）可以延后执行。

*    3. 双缓存树：    Fiber 架构中有两棵 Fiber 树——current fiber tree（当前渲染树）
*                   和 work in progress tree（工作树）。
*                   React 使用这两棵树保存更新前后的状态，高效地进行比较和更新。

*    4. 任务切片：    在浏览器的空闲时间内（利用 requestIdleCallback API），
*                   React 可以将渲染任务拆分成多个小片段，
*                   逐步完成 Fiber 树的构建，避免阻塞。
*
/

 */
/*
* 深入理解任务切片 ==> 要先理解切片得先理解浏览器一帧做些什么 ?
*  浏览器一帧大概16ms, 主要做三件事:
*  1. 处理用户交互事件 (Event Handling)
*  2. 更新应用状态 (State Updates)
*  3. 渲染UI (Rendering)
*   在浏览器空闲时间 (Idle Time),也就会执行 requestIdleCallback
*
* 任务切片:
* 图片详见: ./TaskSlicing.webp
*  “任务切片”的核心概念是: 将大的渲染任务拆分成多个小的工作单元（Unit of Work），每次处理的量取决于当前帧的剩余时间 ,不是平均分，也不是随意分，而是动态适配
* 这样可以确保浏览器有足够的时间处理用户交互和其他高优先级任务，从而提升应用的响应速度。
*
*
*  Fiber 架构:
// let tasks = [10000 个任务]
// let deadline = 0;
//
// function frameCallback(deadlineArg) {
//     deadline = deadlineArg.timeRemaining(); // 当前帧剩余时间
//     performWorkUntilDeadline();
//     requestAnimationFrame(frameCallback);
// }
//
// function performWorkUntilDeadline() {
//     while (tasks.length > 0 && deadline.timeRemaining() > 1) { // 留1ms余量
//         const task = tasks.shift();
//         executeTask(task);
//     }
// }
* */
