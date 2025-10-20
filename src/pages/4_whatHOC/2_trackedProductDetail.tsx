import React, { useEffect } from 'react';
import type { ComponentType } from 'react';
import {type TrackEventData, trackService} from './2_1_trackService.tsx';
/*
    displayName 是什么？
     * 在 React 中，每个组件都有一个可选的静态属性 displayName。

    为什么是静态属性?
     * 它是 React 识别组件身份的约定属性，必须直接挂在函数组件上（不是 props，也不是实例属性）。

    作用：
     * 在 React DevTools（开发者工具）、错误堆栈、警告信息中，显示组件的“可读名称”。
     * 若不设置的话,React 会尝试从函数名推断，但高阶组件（HOC）包装后的组件默认会丢失原始名称，导致调试困难。

    怎么使用？
      <基础语法>:
     * HOC_NAME(OriginalComponentName, [optional-context])

    参数:
     * <HOC_NAME> : 高阶组件的名称（即包装函数的函数名）,通常以 with 开头，用于表明该组件经过了何种增强逻辑。
     * <OriginalComponentName>: 被包装的原始组件的名称，优先使用其 displayName，若无则使用函数名（Component.name）。
     * <optional-context ?> string (可选):用于传递 HOC 的上下文信息，帮助区分同一 HOC 在不同场景下的用途。

    返回值:
     * 无（该属性为赋值操作，不返回值）。

    使用建议:
     * 所有自定义 HOC 都应为其返回的组件设置 displayName。
     * 格式统一为：HOC_NAME(OriginalComponentName, [context])，便于全局搜索和识别。
     * 避免使用默认的函数名（如 "EnhancedComponent"），那对调试毫无帮助。

* */

// 注入的 props 类型
interface WithTrackProps {
    trackEvent: (eventType: string, data?: TrackEventData) => void;
}

// 扩展原始组件的 props，注入 trackEvent
const withTrack = <P extends object>(
    WrappedComponent: ComponentType<P>,
    trackType: string
) => {
    const TrackedComponent: React.FC<Omit<P, keyof WithTrackProps>> = (props) => {
        useEffect(() => {
            // 组件挂载：上报 MOUNT 事件
            trackService.sendEvent(`${trackType}-MOUNT`);

            // 组件卸载：上报 UNMOUNT 事件
            return () => {
                trackService.sendEvent(`${trackType}-UNMOUNT`);
            };
        }, []);

        // 注入给子组件的埋点方法
        const trackEvent = (eventType: string, data?: Record<string, any>) => {
            trackService.sendEvent(`${trackType}-${eventType}`, data);
        };

        return <WrappedComponent {...(props as P)} trackEvent={trackEvent} />;
    };

    TrackedComponent.displayName = `withTrack(${WrappedComponent.displayName || WrappedComponent.name}, ${trackType})`;
    return TrackedComponent;
};

// ========= 示例使用组件 =========
const ProductDetailPage = ({ trackEvent }: { trackEvent: WithTrackProps['trackEvent'] }) => {
    const handleAddToCart = () => {
        trackEvent('ADD_TO_CART', { productId: 'p123', quantity: 1 });
    };

    const handleShare = () => {
        trackEvent('SHARE_CLICK', { platform: 'wechat' });
    };

    return (
        <div className=" bg-gray-50 py-12 px-4 sm:px-6">
            <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">📱 商品详情页</h2>
                <p> 点击下方按钮，查看控制台埋点日志。</p>

                <div className="space-y-3">
                    <button onClick={handleAddToCart}>
                        ➕ 加入购物车
                    </button>

                    <button onClick={handleShare}>
                        📤 分享商品
                    </button>
                </div>

                <div className="mt-6 p-3 bg-blue-50 text-blue-800 text-sm rounded">
                    💡 打开浏览器控制台，查看埋点事件日志。
                </div>
            </div>
        </div>
    );
};

// 应用 HOC：为 ProductDetailPage 添加埋点能力，事件前缀为 "PRODUCT_DETAIL"
const TrackedProductDetailPage = withTrack(ProductDetailPage, 'PRODUCT_DETAIL');

export default TrackedProductDetailPage;

/*
    为什么写成模板字符串？
      `withTrack(${WrappedComponent.displayName || WrappedComponent.name}, ${trackType})`
     * 表明这是被 withTrack HOC 包装的组件
     * 显示埋点类型，便于区分不同用途的埋点组件

    name 属性是什么？
     * 是 JavaScript 函数的内置属性。
      （如 function WrappedComponent() {} 的 name 是 "WrappedComponent"）。
     * 但箭头函数或匿名函数的 name 可能是空或 "Anonymous"，所以这是一种 fallback。
*/