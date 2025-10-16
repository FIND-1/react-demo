// useMemo 优化示例

import { useState, useMemo } from 'react';

/**
 * React.memo 与 useMemo的 区别点：
 *
  类型：
     *  React.memo: 高阶组件（HOC）
     *  useMemo: React Hook
  用在哪里：
     *  React.memo: 用于包裹函数组件
     *  useMemo: 用于函数组件内部
  缓存内容：
     *  React.memo: 缓存整个组件的渲染结果（避免子组件不必要的重新渲染）
     *  useMemo: 缓存一个计算出来的值（如数字、对象、数组）
  触发条件：
     *  React.memo: 当传入的 props 发生浅比较变化时，才会重新渲染子组件
     *  useMemo: 当依赖项数组 [dep1, dep2] 中的值发生变化时，才会重新计算
 <典型应用>：
     *  React.memo: 列表项、头像、卡片等子组件（props 不常变，但父组件频繁更新）
     *  useMemo: 复杂计算逻辑，例如过滤、排序、求和等，避免重复计算


  使用建议：
     *  子组件 props 很少变化 ->  React.memo
     *  组件渲染很慢（大列表） ->  React.memo
     *  计算量大（排序、过滤） ->  useMemo
     *  返回复杂对象/数组     ->  useMemo
     *  避免传递新函数给子组件 ->  useCallback（useMemo 的函数版）

 * 总结: React.memo -> 缓存组件 ( props 没变，就别重新渲染！)
        useMemo  ->  缓存值 useMemo ( 依赖项没变，就别重新计算！)
 */

function AddUseMemo() {
    const [number, setNumber] = useState(2);
    const [ignored, setIgnored] = useState(0);

    // ❌ 没有优化：每次组件渲染，都会重新计算
    // const square = calculateSquare(number);

    // ✅ 用 useMemo 缓存结果
    const square = useMemo(() => {
        return calculateSquare(number);
    }, [number]);

    return (
        <div style={{padding: 20}}>
            <h2>useMemo：记住了结果</h2>
            <label>
                数字：
                <input
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(Number(e.target.value))}
                    style={{marginLeft: '10px', fontSize: '16px'}}
                />
            </label>

            <button onClick={() => setIgnored(ignored + 1)} style={{marginLeft: '20px'}}>
                点我（和数字无关）
            </button>

            <p>
                <strong>{number} 的平方是：{square}</strong>
            </p>
            <small>👉 打开控制台 , 没有使用useMemo的话,每次点“点我”按钮，都会重新计算一次！</small>
        </div>
    );
}

function calculateSquare(n: number) {
    console.log(`🔥 正在计算 ${n} 的平方...`);
    let result = 0;
    for (let i = 0; i < 100000; i++) {
        result = n * n;
    }
    return result;
}

export default AddUseMemo;