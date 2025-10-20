import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DevtoolsState {
  count: number;
  inc: () => void;
  dec: () => void;
}

const useDevtoolsStore = create<DevtoolsState>()(
  devtools(
    (set) => ({
      count: 0,
      inc: () => set((state) => ({ count: state.count + 1 }), false, 'increment'),
      dec: () => set((state) => ({ count: state.count - 1 }), false, 'decrement'),
    }),
    { name: 'Counter Store' }
  )
);

 function DevtoolsMiddleware() {
  const { count, inc, dec } = useDevtoolsStore();

  return (
      <div className="p-5 font-sans">
          <h2>Middleware -- devtools调试状态变化</h2>
          <p>
              打开浏览器 <strong>Redux DevTools</strong> 扩展，可查看状态变化、时间旅行调试。
          </p>
          <p>
              当前计数: <span className="font-bold text-purple-600">{count}</span>
          </p>
          <div className="flex space-x-3">
              <button
                  onClick={inc}
              >
                  +1
              </button>
              <button
                  onClick={dec}
              >
                  -1
              </button>
          </div>
      </div>
  )
      ;
 }

export default DevtoolsMiddleware;