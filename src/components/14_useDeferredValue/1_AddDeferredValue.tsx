/*
    useDeferredValue 是什么?
        * useState 是 React 中的一个 Hook，用于延迟更新非紧急的值，避免组件因频繁/昂贵渲染而卡顿

    怎么使用?
        * 语法格式: `const deferredValue = useDeferredValue(value)`
        返回值:
        * <deferredValue>: 延迟更新的值,在初始渲染期间，返回的延迟值将与提供的值相同。

    原理剖析:
        value: 实时响应旧值，保证输入流畅（高优先级）。
        deferredQuery：延迟匹配 新的 value 值，其更新为低优先级。
        React 会在主线程空闲时再应用 deferredQuery 的变化，避免卡顿。
        ✅ 效果等价于“自动防抖”，但基于 React 调度机制，更智能。

   注意事项:
       * 当 useDeferredValue 接收到与之前不同的值（使用 Object.is) 进行比较,它会先使用旧值,来保留当前渲染的稳定性,
         并安排一个可被后续更新中断的低优先级渲染任务，最终确保只完成最后一次有意义的更新，从而优化性能。
       * !它不等同于防抖,因为防抖是需要一个固定的延迟时间, 而 useDeferredValue 会根据用户设备的情况进行延迟。

   <典型应用>：
        大列表过滤/搜索
        内容预览（如 Markdown 实时预览）
        动画或过渡中避免重渲染阻塞

    useTransition 和 useDeferredValue 的区别
       * 抽象层级	更新操作级（命令式）	              值级（声明式）
       * 控制方式	手动包裹 setState	              自动延迟值更新
       * isPending	✅ 是                             ❌ 否
       * 适用粒度	复杂状态逻辑、需反馈的过渡	          单一值的延迟、派生计算昂贵
       * 底层机制	调度低优先级 update	              内部也是 transition，但自动触发

    总结:
      * useTransition:  适用于需要显式控制更新时机 + 提供用户反馈的场景。
      * useDeferredValue: 适用于值的派生计算昂贵，且希望自动防抖式延迟更新。

    建议使用:  useDeferredValue + useMemo 缓存过滤结果 ,以免在渲染流程中同步执行时，阻塞了主线程
* */
import React, { useState, useDeferredValue, useMemo } from 'react';
import { Input, List } from 'antd';

function AddDeferredValue() {
    const [input, setInput] = useState('');

    // 延迟更新查询值
    const deferredQuery = useDeferredValue(input);

    // 检查是否为延迟状态（UI 显示旧结果）
    const isStale = deferredQuery !== input;

    // 模拟大型列表
    const list = useMemo(() => Array.from({ length: 1000 }, (_, i) => `value ${i}`), []);

    //错误做法：因为这个方法是同步的，会导致阻塞
    // const filteredList = () => {
    //     return list.filter(item => item.toLowerCase().includes(filter.toLowerCase()))
    // }


    // ✅ 使用 useMemo 缓存过滤结果，仅当 deferredQuery 变化时重新计算
    const filteredList = useMemo(() => {
        console.log('Filtering with:', deferredQuery);
        return list.filter((item) => item.includes(deferredQuery));
    }, [list, deferredQuery]);

    return (
        <>
            <h2>Search with useDeferredValue</h2>
            <Input
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                placeholder="Value to search..."
            />

            {/* 视觉反馈：正在过渡 */}
            <div style={{opacity: isStale ? 0.5 : 1, transition: 'opacity 0.3s'}}>
                <List
                    dataSource={filteredList}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta title={item}/>
                        </List.Item>
                    )}
                />
            </div>
        </>
    );
}

export default AddDeferredValue;
