/*
    useTransition 是什么?
        * useState 是 React 中的一个 Hook，用于在处理长时间运行的状态更新时,管理 UI 中的过渡状态

    怎么使用?
        * 语法格式: `const [isPending, startTransition] = useTransition();`
        * 参数: 无。
        返回值(一个包含两个元素的数组):
        * <isPending>(boolean)，是否存在待处理的 transition。
        * <startTransition>(function)，使用此方法将状态更新标记为 transition。

    原理剖析:
         将状态更新标记为“过渡”（transition），以低优先级执行，避免阻塞高优先级的交互。

         通过“并发调度器”管理任务优先级：
         高优先级任务：如输入、点击，需立即响应，优先执行。
         低优先级任务：如搜索结果渲染、大型列表更新，可延迟、可中断。

      过程:
         1. 将其中的状态更新标记为“非紧急”。
         2. 先响应用户输入等高优先级操作。
         3. 在空闲时段或浏览器帧间隔中，逐步处理过渡更新。
         4. 配合 `isPending` 提供加载反馈，提升体验。

     本质：时间切片 + 优先级调度，让关键交互更流畅。

   <典型应用>：
         搜索框 + 搜索结果列表

    注意事项:
        * useTransition 仅适用于长任务，如数据请求、计算等。
        * 在(React18) startTransition在必须是同步的, 避免在过渡期间执行阻塞操作，如 DOM 操作、API 调用等。
        * 在(React19) startTransition可以异步执行，但必须返回一个Promise，否则会报错。

* */

import React, { useState, useTransition } from 'react';
import { Input, List } from 'antd';
function AddTransition() {
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState('');
    const [isPending, startTransition] = useTransition();

    const list = Array.from({ length: 1000 }, (_, i) => `Item ${i}`);

    // 过滤后的列表
    const filteredList = () => {
        console.log('Filtering Loading:',);
        return list.filter(item => item.toLowerCase().includes(filter.toLowerCase()))
    }


    // 处理输入变化
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);

        // 使用 startTransition 将状态更新标记为“过渡”
        startTransition(() => {
            setFilter(value);
        });
    };

    return (
        <>
            <h2>Search with useTransition</h2>
            <Input
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="Item to search..."
                style={{ fontSize: '18px', padding: '10px', width: '95%' }}
            />

            {/* 显示过渡状态 */}
            {isPending ? <p style={{ color: 'gray' }}>Searching...</p> : null}

            {/* 显示搜索结果 */}
            <List
                dataSource={filteredList()}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta title={item} />
                    </List.Item>
                )}
            />
        </>
    );
}


export default AddTransition;
