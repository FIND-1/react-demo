import React, { Suspense, lazy } from "react";

// 使用 lazy 动态导入组件 (Webpack/Vite 会单独打包这个模块)
const AsyncComponent = lazy(() => import("./1_asyncComponent.tsx"));

const AddSuspenseComponent: React.FC = () => {
    return (
        <div>
            <h2>Suspense -- 使用异步组件</h2>

            {/* Suspense 用来处理异步组件加载时的占位 UI */}
            <Suspense fallback={<div>Loading...</div>}>
                <AsyncComponent />
            </Suspense>
        </div>
    );
};

export default AddSuspenseComponent;
