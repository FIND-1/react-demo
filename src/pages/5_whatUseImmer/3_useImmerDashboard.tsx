// DashboardConfig.tsx
import {useImmer} from 'use-immer';

function UseImmerDashboard() {
    const [config, setConfig] = useImmer({
        theme: 'light',
        autoRefresh: false,
        panels: {chart: true, log: false},
        lastUpdated: Date.now(),
    });

    const applyDarkMode = () => {
        setConfig(draft => {
            draft.theme = 'dark';
            draft.autoRefresh = true;
            draft.lastUpdated = Date.now();
        });
    };

    return (
            <div className={`my-8 p-4 border rounded-lg shadow-sm max-w-md ${
                    config.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
                }`}
            >
                <h2 className="font-bold text-gray-800">useImmer(局部) -- 批量修改多个字段</h2>
                <div className="text-sm  mt-1 space-y-1">
                    <div>主题: {config.theme}</div>
                    <div>自动刷新: {config.autoRefresh ? '✅' : '❌'}</div>
                    <div>最后更新: {new Date(config.lastUpdated).toLocaleTimeString()}</div>
                </div>
                <button onClick={applyDarkMode} className=" text-white rounded">
                    启用深色 + 自动刷新
                </button>
            </div>
            );
            }

            export default UseImmerDashboard;