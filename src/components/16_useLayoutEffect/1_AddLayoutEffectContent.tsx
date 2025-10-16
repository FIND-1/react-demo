/*
    useLayoutEffect 是什么?
        * useLayoutEffect 是 React 中的一个 Hook，用于在浏览器重新绘制屏幕之前触发。
          与 useEffect 类似。

    怎么使用?
        * 语法格式: `useLayoutEffect(() => {
                  // 副作用代码
                  return () => {
                    // 清理代码
                  }
                }, [dependencies]);
                `
        参数:
        * <setup> : 同 useEffect 一样，用于设置副作用。
        * <dependencies>(可选)： 同 useEffect 一样，用于指定依赖项。

        * 返回值: useLayoutEffect 返回 undefined

    注意事项:
        * useLayoutEffect 是同步阻塞的，如果执行时间过长，会延迟页面渲染，导致卡顿。
        * 在服务端渲染（SSR）中，useLayoutEffect 的回调不会执行，React 会发出警告，因为它依赖浏览器 DOM。
          Warning: useLayoutEffect does nothing on the server.

   <典型应用>：
        * 搜索框：当用户输入时，显示搜索结果。
        * 模态框：当模态框打开时，显示模态框内容。
        * 输入框自动完成：当用户输入时，自动完成输入。
        * 记录滚动条位置：等用户返回这个页面时。

    useLayoutEffect 和 useEffect 的区别
        * 执行时机	     浏览器完成布局和绘制“之前”执行副作用	        浏览器完成布局和绘制“之后”执行副作用
        * 执行方式	     同步执行                      	        异步执行
        * 是否阻塞DOM渲染	 ✅ 是                                  ❌ 否
        * 适用场景	     需要立即读取或修改 DOM 布局，避免视觉闪烁	大多数副作用（数据请求、事件监听等）
        * 性能影响         可能造成卡顿（长时间操作会延迟页面渲染）	    更流畅，不阻塞用户交互

    总结:
        * 动画初始化、模态框位置计算、需要精确读取 DOM 尺寸等使用 useLayoutEffect
        * 不影响视觉表现的副作用，使用 useEffect

   使用建议：优先使用 useEffect，只有在出现闪烁或布局问题时再换 useLayoutEffect。
* */


// useEffect 立即显示内容

// import  { useEffect, useState } from 'react';
// function AddLayoutEffectContent() {
//     const [text, setText] = useState('Loading...');
//
//     const heavySyncTask = (name: string) => {
//         const start = performance.now();
//         while (performance.now() - start < 1000) {
//             // 空循环
//         }
//         console.log(`${name}: 耗时任务完成`);
//         setText('Hello World (useEffect)');
//     };
//
//     // ✅ useEffect：异步执行，不阻塞渲染
//     useEffect(() => {
//         heavySyncTask('useEffect');
//     }, []);
//
//     return (
//         <div style={{ padding: 20 }}>
//             <h2>🟢useEffect 不阻塞页面</h2>
//             <p>{text}</p>
//             <p><small>你会先看到 Loading，1 秒后变成 Hello World</small></p>
//         </div>
//     );
// }

// useLayoutEffect 阻塞页面1s后显示内容
import  { useLayoutEffect, useState } from 'react';
function AddLayoutEffectContent() {
    const [text, setText] = useState('Loading...');

    // 模拟一个非常耗时的同步操作（比如计算 DOM 布局）
    const heavySyncTask = (name:string) => {
        const start = performance.now();
        while (performance.now() - start < 1000) {
            // 空循环，阻塞主线程 1 秒
        }
        console.log(`${name}: 耗时任务完成`);
        setText('Hello World (useLayoutEffect)');
    };

    // ✅ useLayoutEffect：同步执行，阻塞渲染
    useLayoutEffect(() => {
        heavySyncTask('useLayoutEffect');
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h2>🔴 useLayoutEffect 阻塞页面</h2>
            <p>{text}</p>
            <p><small>你会卡住 1 秒看不到内容</small></p>
        </div>
    );
}




export default AddLayoutEffectContent;