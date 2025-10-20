/*
     中间件是什么(Middleware)?
         * 是一种用于增强或扩展 Zustand 状态管理功能的机制。它本质上是一个高阶函数。

     作用：
         *  通过包装原始 store 配置函数，拦截或增强 set/get 行为，实现横切关注点（cross-cutting concerns）的解耦。

     怎么使用?
     <基础语法>:
          *  const useStore = create(middleware(config))
          *  支持链式组合：create(middleware1(middleware2(config)))

     参数:
          *  <config> Function，原始 store 的配置函数，形如 (set, get, api) => ({ ...state })
          *  中间件本身是一个高阶函数，接收 config 并返回新的配置函数

     返回值:
          *  返回一个增强后的 store 配置函数，可直接传入 Zustand 的 create()

     <典型应用>：
          *  persist：将状态持久化到 localStorage/sessionStorage
          *  immer：支持“可变”写法实现不可变更新
          *  devtools：集成 Redux DevTools 调试工具

     注意事项:
          *  中间件的组合顺序很重要，"通常 persist 放最外层，devtools 放最内层"
          *  自定义中间件需确保正确透传 set/get/api，避免破坏 store 行为
          *  中间件仅在 store 创建时应用一次，无法动态增删
*/

//  persist：状态持久化

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CounterState {
    count: number;
    inc: () => void;
    reset: () => void;
}

const useCounterStore = create<CounterState>()(
    persist(
        (set) => ({
            count: 0,
            inc: () => set((state: CounterState) => ({ count: state.count + 1 })),
            reset: () => set({ count: 0 }),
        }),
        {
            name: 'counter-storage',
            storage: createJSONStorage(() => sessionStorage), // 或 localStorage
        }
    )
);

function PersistMiddleware() {
    const { count, inc, reset } = useCounterStore();

    return (
        <div className="p-5 font-sans">
            <h2>Middleware -- persist持久化</h2>
            <p>刷新页面后，计数器状态将被保留（使用 sessionStorage）。</p>
            <p>当前计数: <strong>{count}</strong></p>
            <button onClick={inc}>+1</button>
            <button onClick={reset} className='ml-2'>重置</button>
        </div>
    );
}
export default PersistMiddleware;