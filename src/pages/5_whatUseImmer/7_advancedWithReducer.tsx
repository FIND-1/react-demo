// AdvancedCounter.tsx
import { useImmerReducer } from 'use-immer';

interface State {
    count: number;
    history: number[];
    isLoading: boolean;
}

type Action =
    | { type: 'INCREMENT' }
    | { type: 'DECREMENT' }
    | { type: 'RESET' }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'ADD_TO_HISTORY' };

const initialState: State = {
    count: 0,
    history: [],
    isLoading: false,
};

/*
✅ 关键点：useImmerReducer 的核心优势

1. **可变写法，不可变结果**
   在 reducer 中可以直接写 `draft.count += 1` 或 `draft.history.push(...)`，
   而无需手动展开（...state）或使用不可变更新库。
   → 代码更简洁、逻辑更直观，尤其适合嵌套/复杂状态。

2. **集中状态逻辑**
   所有状态变更通过 action 驱动，逻辑收拢在 reducer 内，
   避免分散在多个 useState 的 setter 中，便于测试与维护。

3. **天然支持复杂状态结构**
   同时管理 count（number）、history（array）、isLoading（boolean）等不同类型字段，
   无需拆分成多个 useState 或手动合并。

4. **与异步流程无缝配合**
   可在异步操作中多次 dispatch，immer 自动合并中间状态，
   避免 useState 的闭包陷阱（stale state）。
*/

function counterReducer(draft: State, action: Action) {
    switch (action.type) {
        case 'INCREMENT':
            draft.count += 1;
            break;
        case 'DECREMENT':
            draft.count -= 1;
            break;
        case 'RESET':
            draft.count = 0;
            break;
        case 'SET_LOADING':
            draft.isLoading = action.payload;
            break;
        case 'ADD_TO_HISTORY':
            draft.history.push(draft.count); // 直接 push！无需 [...draft.history, draft.count]
            break;
    }
}

function AdvancedCounter() {
    const [state, dispatch] = useImmerReducer(counterReducer, initialState);

    const handleIncrement = () => {
        dispatch({ type: 'SET_LOADING', payload: true });

        setTimeout(() => {
            // 多次 dispatch 不会丢失中间状态，且 draft 始终反映最新值
            dispatch({ type: 'INCREMENT' });
            dispatch({ type: 'ADD_TO_HISTORY' });
            dispatch({ type: 'SET_LOADING', payload: false });
        }, 500);
    };

    return (
        <div className="p-6 max-w-md mx-auto border rounded-xl bg-white shadow">
            <h2 className="text-xl font-bold mb-4">useImmerReducer：复杂状态的理想选择</h2>

            <div className="mb-4">
                <span>当前值: {state.count}</span>
                {state.isLoading && <span className="text-blue-500 ml-2">加载中...</span>}
            </div>

            <div className="flex gap-2 mb-4">
                <button onClick={handleIncrement} disabled={state.isLoading} className="px-3 py-1 bg-green-500 text-white rounded">
                    增加
                </button>
                <button onClick={() => dispatch({ type: 'DECREMENT' })} disabled={state.isLoading} className="px-3 py-1 bg-yellow-500 text-white rounded">
                    减少
                </button>
                <button onClick={() => dispatch({ type: 'RESET' })} disabled={state.isLoading} className="px-3 py-1 bg-red-500 text-white rounded">
                    重置
                </button>
            </div>

            {state.history.length > 0 && (
                <div>
                    <h3 className="font-semibold mb-1">历史记录:</h3>
                    <ul className="list-disc pl-5 text-sm">
                        {state.history.map((v, i) => (
                            <li key={i}>{v}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AdvancedCounter;