/*
     高阶组件（Higher-Order Component, HOC）是什么？
     * React 中的一种高级模式，用于复用组件逻辑。
  
     作用：
     *  接收一个 React 组件作为参数，返回一个新的、经过增强的组件。
     *  在不修改原始组件源码的前提下，为其注入额外的 props、状态、副作用或渲染控制逻辑。
     *  实现关注点分离：将通用逻辑（如权限校验、数据加载、日志埋点）从 UI 组件中抽离。

     怎么使用？
     <基础语法>:
         *  const EnhancedComponent = withFeature(WrappedComponent);

     参数:
         *  <WrappedComponent> React.ComponentType 被包装的原始组件（可以是函数组件或类组件）。
            HOC 会将其作为子组件渲染，并可能注入额外的 props。

     返回值:
         *  一个新的 React 组件（函数组件），其行为在原始组件基础上被增强。
         *  新组件通常会：
            通过 useState/useEffect 等 Hook 管理内部状态或副作用；
            将计算后的数据或方法作为 props 传递给 WrappedComponent；
            在特定条件下控制是否渲染 WrappedComponent（如权限不足时返回提示）。

     <典型应用>：
         * 注入全局状态（如用户信息、主题）
         * 自动加载数据并注入 loading/error 状态
         * 权限控制（鉴权拦截）
         * 组件生命周期日志或埋点
         * 错误边界封装（统一错误降级 UI）

     注意事项:
         * 避免在 render 方法或函数组件体内动态创建 HOC（会导致组件反复卸载/挂载）；
         * 多个 HOC 嵌套可能导致“Wrapper Hell”，应优先考虑自定义 Hook；
         * 注入的 prop 名称应避免与原始组件 props 冲突；
         * 静态方法不会自动透传，需手动处理（如 hoistNonReactStatics）。

     使用建议:
         * 大多数 HOC 场景可使用 自定义 Hook（Custom Hook）实现，逻辑更清晰、组合更灵活。
         * 仅在需要“控制组件是否渲染”或“封装 UI 层通用容器行为”时推荐使用 HOC。
*/

// withAuth.tsx
import React from 'react';
import type { ComponentType } from 'react';

/*
 * 权限控制 HOC：检查用户是否已登录（通过 localStorage.token）
 * 若未登录，显示提示；否则渲染原始组件
 */

interface AuthProps {
    isAuthenticated?: boolean;
}

const withAuth = <P extends object>(
    WrappedComponent: ComponentType<P>
) => {
    const AuthHOC: React.FC<Omit<P, keyof AuthProps>> = (props) => {
        // 简单模拟：检查 localStorage 是否有 token
        const isAuthenticated = !!localStorage.getItem('token');

        if (!isAuthenticated) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                    <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md w-full">
                        <div className="text-5xl mb-4">🔒</div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">访问受限</h2>
                        <p className="text-gray-600 mb-4">
                            请先登录以访问此页面。
                        </p>
                        <button
                            onClick={() => {
                                // 模拟登录
                                localStorage.setItem('token', 'fake-jwt-token');
                                window.location.reload();
                            }}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                        >
                            模拟登录
                        </button>
                    </div>
                </div>
            );
        }

        return <WrappedComponent {...(props as P)} />;
    };

    AuthHOC.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;
    return AuthHOC;
};


const Dashboard = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
            <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">HOC -- 权限控制</h2>
                <p className="text-gray-600 mb-4">你已成功通过权限验证！</p>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                >
                    退出登录
                </button>
            </div>
        </div>
    );
};

const AuthProtectedDashboard = withAuth(Dashboard);

export default AuthProtectedDashboard;