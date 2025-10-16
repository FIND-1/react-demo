/**
 * 订阅history实现路由跳转
 *
 * 用于在 React 函数组件中安全地监听和操作浏览器的历史记录（URL）。
 * 支持并发渲染（Concurrent Rendering）和服务端渲染（SSR）兼容。
 * 使用 useSyncExternalStore 确保状态同步、避免 hydration 错误。
 *
 * 返回当前 URL、以及 push 和 replace 方法，类似于 React Router 的 history API。
 */
import { useSyncExternalStore } from "react"

export const useHistory = () => {
    /**
     * 订阅浏览器历史变化事件
     *
     * 监听 popstate（如前进/后退按钮）和 hashchange（如锚点跳转）事件，
     * 当 URL 发生变化时触发回调函数，通知 React 重新渲染。
     *
     * @param callback - 当 URL 变化时执行的函数（由 React 内部调用）
     * @returns 清理函数，用于移除事件监听器
     */
    const subscribe = (callback: () => void) => {
        window.addEventListener('popstate', callback);
        window.addEventListener('hashchange', callback);
        return () => {
            window.removeEventListener('popstate', callback);
            window.removeEventListener('hashchange', callback);
        };
    };

    /**
     * 获取当前 URL 的“快照”
     *
     * 这是一个同步函数，返回当前页面的完整 URL。
     * useSyncExternalStore 会在每次渲染时调用它来获取最新值。
     *
     * @returns 当前页面的 URL 字符串（如：'http://localhost:3000/home'）
     */
    const getSnapshot = () => {
        return window.location.href;
    };

    /**
     * 向浏览器历史栈中添加一条新记录（push）
     *
     * 调用后会改变 URL，并允许用户通过“后退”按钮返回上一页。
     *
     * @param path - 要跳转的路径（如 '/home' 或 'https://example.com'）
     */
    const push = (path: string) => {
        window.history.pushState(null, '', path);
        // 手动触发 popstate 事件，通知 useSyncExternalStore 更新
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    /**
     * 替换当前历史记录（replace）
     *
     * 调用后会改变 URL，但不会在历史中留下记录，用户无法通过“后退”返回上一页。
     *
     * @param path - 要替换的路径
     */
    const replace = (path: string) => {
        window.history.replaceState(null, '', path);
        // 手动触发 popstate 事件，通知 useSyncExternalStore 更新
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    // 使用 useSyncExternalStore 安全地读取当前 URL
    const res = useSyncExternalStore(subscribe, getSnapshot);

    // 返回只读元组：[当前 URL, push, replace]
    return [res, push, replace] as const;
};