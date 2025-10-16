/*
* 
 什么是高阶组件（HOC, Higher-Order Component）？
     * 高阶组件是一种**复用组件逻辑**的高级技巧。
     * 它本质上是一个函数，接收一个组件作为参数，并返回一个新的组件。

 语法格式：
     const EnhancedComponent = HOC(WrappedComponent);

 参数：
     * WrappedComponent：需要包装的组件。
 返回：
     * 一个新的组件，功能增强后的组件。

 工作原理：
     1. HOC 包裹原始组件；
     2. 在内部添加新的逻辑（如权限控制、数据注入、日志等）；
     3. 返回一个功能增强后的新组件。

 优点：
     * 逻辑复用：多个组件可共享相同逻辑；
     * 职责分离：UI 与逻辑解耦；
     * 提升可维护性与扩展性。

 注意事项：
     * 不要在 render 内创建 HOC（会导致性能问题）；
     * 保留组件的 displayName 以便调试；
     * 注意 props 透传，避免丢失原有属性。

 <典型应用>：
     * 权限控制（Access Control）--推荐
               封装权限判断逻辑，未登录用户自动跳转登录页或显示提示。
     * 日志与埋点（Logging / Analytics）--推荐
               自动追踪组件挂载、卸载等行为，用于用户行为分析。
     * 数据请求与加载状态（Data Fetching）
               统一封装接口请求逻辑，在组件中直接接收数据。
     * 样式增强（UI Enhancement）
               自动为组件添加统一的样式或动画包裹层。
     * 错误边界（Error Boundary）--推荐
               捕获组件渲染错误，防止整个应用崩溃。
*/


import React from "react";

// ✅ 定义 HOC 工厂函数
function withAuth<P extends object>(
    WrappedComponent: React.ComponentType<P>
): React.FC<P> {
    return (props: P) => {
        const isLogin = Boolean(localStorage.getItem("token"));

        if (!isLogin) {
            return <div>请先登录</div>;
        }

        return <WrappedComponent {...props} />;
    };
}

// ✅ 定义一个普通组件
const Profile: React.FC<{ username: string }> = ({ username }) => {
    return <h2>欢迎回来, {username}</h2>;
};

// ✅ 用 HOC 包装成新的组件
const ProtectedProfile = withAuth(Profile);

// ✅ 正确使用
function AddHOCComponent() {
    return (
        <div>
            <ProtectedProfile username="张三" />
        </div>
    );
}


export default AddHOCComponent
