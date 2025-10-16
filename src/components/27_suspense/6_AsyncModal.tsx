/**
 *
 * `Suspense` 和 `createPortal` 是 React 中两个完全独立但可协同工作的功能：

     `Suspense`：用于在**异步操作期间**显示 fallback UI（如加载中）。
        * 解决问题：组件/数据未就绪时的 UI 协调。
        * <典型应用>：：lazy loading、异步数据请求（配合资源模式）。
        * 渲染位置：仍在原 React 树中。

     `createPortal`：用于将 JSX 渲染到**DOM 层级之外的节点**。
        * 解决问题：脱离父级样式限制（如 overflow: hidden）、提升 z-index 管理。
        * <典型应用>：：Modal、Tooltip、Notification、全屏 overlay。
        * 渲染位置：指定的 DOM 节点（如 document.body）。
 结论：
        * ❌ 二者**不能互相替代**，职责完全不同。
        * 可以**完美搭配使用**：例如“异步加载的 Modal”。
 */

import React, { Suspense } from 'react';
import { createPortal } from 'react-dom';

// 🔧 类型定义
interface AsyncModalProps {
    open: boolean;
    onClose: () => void;
}

// 🧱 模拟异步加载的组件（通常用于 code-splitting）

const ExpensiveComponent = React.lazy(() => {
    return new Promise<{ default: React.ComponentType }>(resolve => {
        setTimeout(() => {
            resolve({
                default: () => (
                    <div style={{ padding: '10px', background: '#f0f8ff', borderRadius: '4px' }}>
                        <p><strong>数据已加载</strong></p>
                        <p>用户：张三 | 年龄：26 | 城市：北京</p>
                    </div>
                ),
            });
        }, 2000); // 模拟网络延迟
    });
});

// 🧩 主组件：异步 Modal（Suspense + Portal）
const AddAsyncModal: React.FC<AsyncModalProps> = ({ open, onClose }) => {
    // ✅ 如果未打开，不渲染任何内容（Portal 也不会创建）
    if (!open) return null;
    return createPortal(
        <div className="modal-overlay" style={styles.overlay}>
            <div style={styles.modal}>
                <h3>用户详情</h3>
                {/* ✅ Suspense 控制异步内容的加载状态 */}
                <Suspense fallback={<div style={styles.loading}>📦 内容加载中，请稍候...</div>}>
                    <ExpensiveComponent />
                </Suspense>

                <button onClick={onClose} style={styles.closeButton}>
                    关闭
                </button>
            </div>
        </div>,
        document.body // ✅ Portal 渲染到 body，避免被裁剪
    );
};

export default AddAsyncModal;

// 🎨 内联样式（也可提取到 CSS 文件）

const styles = {
    overlay: {
        position: 'fixed' as const,
        inset: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        fontFamily: 'Arial, sans-serif',
    },
    modal: {
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    },
    loading: {
        padding: '16px',
        textAlign: 'center' as const,
        color: '#555',
        fontSize: '14px',
        fontStyle: 'italic',
    },
    closeButton: {
        marginTop: '16px',
        padding: '8px 16px',
        background: '#007acc',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
};
