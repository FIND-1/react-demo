/*
  什么是 MessageChannel?
*    MessageChannel 是 HTML5 引入的一种在不同执行上下文（如不同的窗口、iframe 或 web worker）之间进行双向通信的机制。
*    它允许在两个独立的执行环境之间发送消息，而不需要依赖传统的跨域通信方法，如 postMessage。
*    MessageChannel 由两个主要部分组成：
                    MessageChannel(1个对象): 用于创建通信通道
                    MessagePort(2个对象): 用于发送和接收消息
     注意点:  MessagePort(2个对象)完全对等的，没有“主从”之分，任何一端都可以发消息给另一端。
     
  为什么是“两个端口”？
    这种“一个通道 + 两个端口”的设计，源于经典的 双工通信模型（Duplex Communication），类似于：
        电话线：两个人通话，每人拿一个听筒
        管道：两端都可以读写数据
        WebSocket：客户端和服务器双向通信
 
 为什么选择 MessageChannel?
*    它是一个微任务队列，优先级高于宏任务队列（如 setTimeout 和 setInterval），但低于同步代码,且不会被浏览器渲染打断,阻塞页面

 为什么不选 setTimeout?
*    setTimeout 属于宏任务队列，优先级较低，可能会被浏览器渲染打断,阻塞页面,
    且会出现一个<嵌套超时>的问题:
    HTML标准 中规定: 一旦对setTimeout的嵌套调用被安排了5次,浏览器将强制执行4毫秒的最小超时。
    参考网址: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout

特殊情况下可以使用 setTimeout:
*   若浏览器不支持 MessageChannel,则可以使用 setTimeout。

* */

// 创建 MessageChannel
const channel = new MessageChannel();
const port1 = channel.port1;
const port2 = channel.port2;

// 设置 port1 的消息处理函数
port1.onmessage = (event) => {
    console.log('Received by port1:', event.data);
    port1.postMessage('Reply from port1'); // 向 port2 发送回复消息
};

// 设置 port2 的消息处理函数
port2.onmessage = (event) => {
    console.log('Received by port2:', event.data);
};

// 通过 port2 发送消息给 port1
port2.postMessage('Message from port2');
