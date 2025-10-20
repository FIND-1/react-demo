/*
  🧠 Zustand 是什么？
   * 一个轻量级、无样板代码（boilerplatefree）的 React 状态管理库，
      (由 React Three Fiber 的作者团队开发。)
   *  它使用简单的函数式 API（无 context provider、无 reducer），
   *  通过 hooks 直接管理全局或局部状态。

  与 Redux 相比：
   *  更简洁（不需要 action/reducer）
   *  性能更高（状态粒度更新）
   *  语法更接近原生 React Hooks
   *  没有强制的架构约束

  怎么使用？
    1: 安装： npm install zustand
    2: 创建 store：详见 ../store/usePriceStore
    
  优点:
   1: 极轻量，无需 Provider 或 Context
   2: 语法简单直观：使用 hooks 读写状态
   3: 高性能：只会让使用该状态的组件重新渲染
   4: 支持中间件（如持久化、devtools 调试）
   5: 状态天然可组合（多个 store 可独立或组合使用）

 
  缺点:
   1: 社区生态比 Redux 小（但在增长中）
   2: 缺少 Redux 那样的结构约束（适合小中型项目）
   3: 大型团队协作时规范性较弱（灵活但易分散）

 
  原理剖析：
   Zustand 的核心是：
     *  使用 `create()` 创建一个全局 store（内部是一个小型订阅系统）
     *  每个组件调用 hook 时会订阅相关状态片段
     *  当 `set()` 修改状态时，Zustand 仅通知依赖该状态的组件重新渲染
     *  实现基于浅比较（shallow compare）避免不必要重渲染
     *  没有使用 React Context，而是用外部闭包维护状态（性能更好）


 
  注意事项：
    *  状态更新是"同步"的，若要异步操作需自行封装 async 函数
    *  若使用 `zustand/persist` 进行持久化，需注意序列化数据结构
    *  如果 store 很大，应拆分为多个独立 store
    *  在 SSR（Next.js）中使用时需手动隔离客户端状态
    *  从Zustand v4++后，persist 不再支持 deserialize 和 serialize，
        而是改用 storage 自定义 或 在 onRehydrateStorage 中处理迁移。

 
  使用建议：
    *  小中型项目可直接用 Zustand 替代 Redux
    *  状态较多时：一个领域（如用户、购物车、过滤器）一个 store
    *  UI 局部状态仍建议使用 React useState
    *  配合 devtools / persist 中间件可增强调试与持久化体验

  <典型应用>：
    *  管理全局应用状态（如用户信息、主题、语言）
    *  保存筛选器、分页等中间状态（例如电商商品列表）
    *  游戏 / 3D 场景状态管理（如 React Three Fiber）
    *  与非 React 模块共享状态（因不依赖 Context）
*/

//3:在组件中使用
import React from "react";
import usePriceStore from "../../store/priceStore.ts";

const ZustandPrice: React.FC = () => {
    const { price, incrementPrice, decrementPrice, resetPrice, getPrice } = usePriceStore();
    return (
        <div>
            <h2>zustand-- 调整价格</h2>
            <p>价格: {price}</p>
            <button onClick={incrementPrice}>增加</button>
            <button onClick={decrementPrice}>减少</button>
            <button onClick={resetPrice}>重置</button>
            <button onClick={getPrice}>获取</button>
        </div>
    );
};

export default ZustandPrice;