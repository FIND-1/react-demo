/**
 useReducer 是什么?
        * useReducer 是 React 中的一个 "高级"Hook，用于在函数组件中添加"集中式"状态管理功能

    怎么使用?
        * 导入 useReducer: `import { useReducer } from 'react';`
    <基础语法>:
         const [state, dispatch] = useReducer(reducer, initialArg, init?);
    参数:
       * <reducer> 是一个处理函数，用于更新状态, reducer 里面包含了两个参数，
         第一个参数是 state，第二个参数是 action。reducer 会返回一个新的 state。
       * <initialArg> 是 state 的初始值。
       * <init> 是一个可选的函数，用于初始化 state，如果编写了init函数，
         则默认值使用init函数的返回值，否则使用initialArg。
    图片详见: ./reducerConstruction.webp

    返回值:
       * useReducer 返回一个包含两个值的数组：当前 state 和 dispatch 函数。
         初始 state 为 init(initialArg) 或 initialArg（若无 init 函数）。

    更新状态: 使用 dispatch 函数来更新状态值

    <典型应用>：
       * 表单处理
       * 购物车
       * 多步骤流程（如向导）
       * 主题切换、用户认证等全局状态管理雏形

* */

import React, { useReducer } from 'react';
interface CounterState {
    count: number;
}
//  定义 Action 类型（描述“发生了什么”）
type CounterAction =
    | { type: 'INCREMENT' }
    | { type: 'DECREMENT' }
    | { type: 'RESET' }
    | { type: 'SET'; payload: number };
// Reducer 函数（纯函数，根据 action 更新 state）
const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        case 'DECREMENT':
            return { count: state.count - 1 };
        case 'RESET':
            return { count: 0 };
        case 'SET':
            return { count: action.payload };
        default:
            throw new Error(`Unsupported action type: ${(action as string)}`);
    }
};

//  组件使用 useReducer
const AddReducer: React.FC = () => {
    // 初始化状态
    const initialState: CounterState = { count: 0 };

    // 使用 useReducer
    const [state, dispatch] = useReducer(counterReducer, initialState);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2> useReducer ---🧮计数器</h2>
            <p>
                <strong>当前数值：</strong>
                <span style={{ fontSize: '1.5em', margin: '0 10px' }}>{state.count}</span>
            </p>

            {/* 控制按钮 */}
            <div style={{ marginTop: '20px' }}>
                <button onClick={() => dispatch({ type: 'INCREMENT' })} style={btnStyle}>
                    ➕ 加 1
                </button>
                <button onClick={() => dispatch({ type: 'DECREMENT' })} style={btnStyle}>
                    ➖ 减 1
                </button>
                <button onClick={() => dispatch({ type: 'RESET' })} style={btnStyle}>
                    🔄 重置
                </button>
                <button
                    onClick={() => dispatch({ type: 'SET', payload: 100 })}
                    style={{ ...btnStyle, backgroundColor: '#9c27b0', color: 'white' }}
                >
                    💯 设为 100
                </button>
            </div>

            <div style={{ marginTop: '20px', color: '#666', fontSize: '0.9em' }}>
                ✅ 状态更新由 reducer 集中处理，逻辑清晰可预测。
            </div>
        </div>
    );
};

// 按钮样式
const btnStyle: React.CSSProperties = {
    padding: '8px 16px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
};
export default AddReducer