/**
 * React 简易版调度器实现
 
  * React 调度器核心机制：
      1. 为每个任务分配优先级
      2. 为每个任务设置过期时间（过期时间越短，优先级越高）
      3. 使用 MessageChannel 实现异步调度，避免阻塞主线程
 
 * 调度器工作流程：
      ┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
      │   scheduleCallback │───▶│  taskQueue排序  │───▶  MessageChannel │
      └─────────────────┘    └──────────────────┘    └─────────────────┘
                                                             │
      ┌─────────────────┐    ┌──────────────────┐    ┌───────▼─────────┐
      │  performWorkUntil│◀───│    workLoop     │◀───│ 任务执行调度    │
      └─────────────────┘    └──────────────────┘    └─────────────────┘
 */

// TODO: 梳理 React 源码中 Scheduler 的实现细节
// 任务优先级定义
const ImmediatePriority = 1;    // 立即执行优先级 - 最高（点击事件、输入框等）
const UserBlockingPriority = 2; // 用户阻塞优先级（滚动、拖拽等）
const NormalPriority = 3;       // 正常优先级（渲染列表、动画、网络请求等）
const LowPriority = 4;          // 低优先级（分析统计等）
const IdlePriority = 5;         // 空闲优先级（console.log 等可延迟任务）

/**
 * 获取当前高精度时间戳
 * @returns {number} 当前时间（毫秒）
 */
function getCurrentTime() {
    return performance.now();
}

class SimpleScheduler {
    /**
     * 调度器构造函数
     * 初始化任务队列和 MessageChannel 通信机制
     */
    constructor() {
        this.taskQueue = [];           // 任务队列：存储待执行任务
        this.isPerformingWork = false; // 工作状态标识：防止并发执行
        
        // 初始化 MessageChannel 用于异步调度
        const channel = new MessageChannel();
        this.port = channel.port2;
        channel.port1.onmessage = this.performWorkUntilDeadline.bind(this);
    }
    
    /**
     * 调度任务接口
     * @param {number} priorityLevel - 任务优先级
     * @param {Function} callback - 任务回调函数
     */
    scheduleCallback(priorityLevel, callback) {
        const currentTime = getCurrentTime();
        let timeout;
        
        // 根据优先级确定任务超时时间
        switch (priorityLevel) {
            case ImmediatePriority:
                timeout = -1;          // 立即过期
                break;
            case UserBlockingPriority:
                timeout = 250;         // 250ms 后过期
                break;
            case LowPriority:
                timeout = 10000;       // 10s 后过期
                break;
            case IdlePriority:
                timeout = 1073741823;  // 很大值，几乎永不超时
                break;
            case NormalPriority:
            default:
                timeout = 5000;        // 5s 后过期
                break;
        }
        
        // 创建任务对象
        const task = {
            callback,                  // 任务回调函数
            priorityLevel,            // 任务优先级
            expirationTime: currentTime + timeout // 任务过期时间
        };
        
        this.push(this.taskQueue, task); // 将任务加入队列并排序
        this.schedulePerformWorkUntilDeadline(); // 触发任务调度
    }
    
    /**
     * 通过 MessageChannel 调度任务执行
     * 利用微任务机制确保任务在下一帧执行
     */
    schedulePerformWorkUntilDeadline() {
        if (!this.isPerformingWork) {
            this.isPerformingWork = true;
            this.port.postMessage(null); // 触发异步调度
        }
    }
    
    /**
     * 执行任务的入口函数
     * 由 MessageChannel 消息触发
     */
    performWorkUntilDeadline() {
        this.isPerformingWork = true;
        try {
            this.workLoop(); // 执行任务循环
        } finally {
            this.isPerformingWork = false;
        }
    }
    
    /**
     * 任务执行循环
     * 按优先级顺序执行队列中的任务
     */
    workLoop() {
        let currentTask = this.peek(this.taskQueue);
        
        // 依次执行队列中的任务
        while (currentTask) {
            const callback = currentTask.callback;
            if (typeof callback === 'function') {
                callback(); // 执行任务回调
            }
            
            this.pop(this.taskQueue); // 移除已完成任务
            currentTask = this.peek(this.taskQueue); // 获取下一个任务
        }
    }
    
    /**
     * 获取队列中优先级最高的任务（队首元素）
     * @param {Array} queue - 任务队列
     * @returns {Object|null} 任务对象或 null
     */
    peek(queue) {
        return queue[0] || null;
    }
    
    /**
     * 向队列中添加任务并按优先级排序
     * @param {Array} queue - 任务队列
     * @param {Object} task - 任务对象
     */
    push(queue, task) {
        queue.push(task);
        // 按过期时间升序排列（过期时间越小优先级越高）
        queue.sort((a, b) => a.expirationTime - b.expirationTime);
    }
    
    /**
     * 从队列中移除并返回优先级最高的任务
     * @param {Array} queue - 任务队列
     * @returns {Object} 被移除的任务
     */
    pop(queue) {
        return queue.shift();
    }
}

// 测试用例：验证不同优先级任务的执行顺序
const scheduler = new SimpleScheduler();

scheduler.scheduleCallback(LowPriority, () => {
    console.log('Task 1: Low Priority');
});

scheduler.scheduleCallback(ImmediatePriority, () => {
    console.log('Task 2: Immediate Priority');
});

scheduler.scheduleCallback(IdlePriority, () => {
    console.log('Task 3: Idle Priority');
});

scheduler.scheduleCallback(UserBlockingPriority, () => {
    console.log('Task 4: User Blocking Priority');
});

scheduler.scheduleCallback(NormalPriority, () => {
    console.log('Task 5: Normal Priority');
});
//执行顺序为 2 4 5 1 3