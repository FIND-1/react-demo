// pages/NavigationPage.tsx
import React from 'react';
import { useHistory } from './4_useHistory.ts';

const NavigationPage: React.FC = () => {
    const [currentUrl, push, replace] = useHistory();

    // 提取当前路径（用于展示）
    const pathname = new URL(currentUrl).pathname;

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>useSyncExternalStore --🌐 自定义 useHistory </h1>
            <p><strong>当前 URL：</strong> {currentUrl}</p>
            <p><strong>当前路径：</strong> {pathname}</p>

            <div style={{ margin: '20px 0' }}>
                <h3>导航操作</h3>

                {/* 使用 push 添加历史记录 */}
                <button
                    onClick={() => push('/home')}
                    style={{ margin: '0 10px', padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                    Push 到 /home
                </button>

                {/* 使用 replace 替换当前记录 */}
                <button
                    onClick={() => replace('/profile')}
                    style={{ margin: '0 10px', padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                    Replace 到 /profile
                </button>

                {/* 返回上一页 */}
                <button
                    onClick={() => window.history.back()}
                    style={{ margin: '0 10px', padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                    返回上一页
                </button>
            </div>

            <div style={{ marginTop: '30px', color: '#555' }}>
                <h3>💡 使用说明</h3>
                <ul>
                    <li><strong>push</strong>：会添加历史记录，点击“返回”可回到前一页。</li>
                    <li><strong>replace</strong>：不会添加历史记录，“返回”将跳过当前页。</li>
                    <li>打开控制台，观察 URL 变化和历史栈行为。</li>
                    <li>可在单页应用（SPA）中实现轻量级路由控制。</li>
                </ul>
            </div>
        </div>
    );
};

export default NavigationPage;