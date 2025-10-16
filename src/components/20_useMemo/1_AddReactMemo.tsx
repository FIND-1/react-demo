/*
  useMemo 是什么？
     * useContext 是 React 性能优化的一个 Hook，用于在记忆上一次的计算结果，仅当依赖项变化时才会重新计算
     * 避免每次渲染时执行复杂的计算和对象重建
      (类似于 Vue 中的 computed)。

  怎么使用？
     * 语法格式：`const memoizedValue = useMemo(createFn, [deps])`

     参数：
     * <createFn>：用于返回需要缓存的值的函数(常用作包裹子组件)。
     * <[deps]?>：(可选)，当依赖项变化时才会重新执行 createFn。
     返回值: 缓存的计算结果（只读）。

  原理剖析：
     * React 在每次渲染时都会调用组件函数，如果有复杂运算会导致性能浪费。
     * useMemo 会在初次渲染时执行 createFn，并缓存结果。
     * 当依赖 deps 没有变化时，会直接返回缓存的结果，而不会重新计算。
     * 当 deps 发生变化时，才会重新执行 createFn 计算并更新缓存。

  注意事项：
     * useMemo 缓存的是“值”，而非“函数”；如果要缓存函数，请用 useCallback。

 <典型应用>：
     * 复杂计算缓存
     * 列表过滤 / 排序优化
     * 避免子组件不必要的渲染(配合 React.memo，防止子组件因引用变化而重复渲染)
     * UI 状态共享（如语言、布局配置）

  总结:
     1. 仅在计算开销大或依赖稳定时使用 useMemo，不要滥用。
     2. 避免把所有函数都包在 useMemo 里，这样反而可能增加复杂度。
*/

//React.memo 案例
/*
* 适用场景:
* 组件大量、复杂逻辑、高渲染频率的组件，
*  组件props很少变化时
   组件为纯展示型 :(头像,卡片等)
*
* */
import React, { useState } from 'react';

// 普通组件：每次父组件渲染，它都会重新执行
const Profile = ({ name }: { name: string }) => {
    // 每次渲染，随机变个背景色
    const bgColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
    return (
        <div style={{
            backgroundColor: bgColor,
            padding: '20px',
            margin: '10px 0',
            border: '2px solid #333',
            display: 'inline-block'
        }}>
            <h3>用户名：{name}</h3>
            <p>这是一个普通组件</p>
            <small>背景色变了？说明重新渲染了！</small>
        </div>
    );
};

// ✅ 用 React.memo 包裹的组件：只有 name 改变时才重新渲染
const MemoProfile = React.memo(({ name }: { name: string }) => {
    const bgColor = `hsl(${Math.random() * 360}, 70%, 80%)`;

    console.log('MemoProfile 组件渲染了！');

    return (
        <div style={{
            backgroundColor: bgColor,
            padding: '20px',
            margin: '10px 0',
            border: '2px solid green',
            display: 'inline-block'
        }}>
            <h3>用户名：{name}</h3>
            <p>这是一个 memo 化组件</p>
            <small>边框是绿色，背景色不变？说明没重新渲染！</small>
        </div>
    );
});

function AddReactMemo() {
    const [search, setSearch] = useState('');
    const [name] = useState('小红'); // 注意：name 固定不变！

    return (
        <div style={{ padding: 20 }}>
            <h2>📌 React.memo 可视化演示</h2>

            {/* 搜索框 */}
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="在这里打字..."
                style={{ fontSize: '18px', padding: '10px', width: '200px' }}
            />
            <p>当前搜索词：{search}</p>

            <hr />

            <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
                {/* 左边：普通组件 */}
                <div>
                    <h3>🔴 普通组件（无优化）</h3>
                    <Profile name={name} />
                </div>

                {/* 右边：memo 组件 */}
                <div>
                    <h3>🟢 Memo 组件（已优化）</h3>
                    <MemoProfile name={name} />
                </div>
            </div>
        </div>
    );
}

export default AddReactMemo;


