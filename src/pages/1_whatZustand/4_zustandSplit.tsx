import { useState } from 'react';
import { useUIStore } from "../../store/uiStore";
import { useProfileStore } from "../../store/profileStore.ts";

const ZustandSplit = () => {
    const { sidebarOpen, toggleSidebar } = useUIStore();
    const { name, updateName } = useProfileStore();

    // 本地输入状态（受控组件）
    const [inputValue, setInputValue] = useState(name);

    // 当 store 中的 name 变化时（如页面刷新恢复），同步到输入框
    // 注意!!：Zustand 持久化恢复是异步的，所以需要监听
    // 但简单场景下，初始化时用 name 作为 defaultValue 也可

    const handleSave = () => {
        updateName(inputValue); // ← 触发 Zustand 更新 + 自动持久化
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Zustand — 拆分 Store + 持久化</h2>
            <div>
                <label>
                    名字:
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="输入你的名字"
                        style={{ marginLeft: "8px", padding: "4px" }}
                    />
                </label>
                <button
                    onClick={handleSave}
                    style={{ marginLeft: "10px", padding: "4px 8px" }}
                >
                    保存
                </button>
            </div>

            <p>当前生效的名字: <strong>{name}</strong></p>

            <hr style={{ margin: "20px 0" }} />

            <button onClick={toggleSidebar}>
                {sidebarOpen ? "关闭侧边栏" : "打开侧边栏"}
            </button>
            {sidebarOpen && (
                <div
                    style={{
                        marginTop: "10px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    侧边栏内容（不持久化）
                </div>
            )}

            <p>✅ 刷新页面后，“名字”会保留，但侧边栏状态会重置</p>
        </div>
    );
};


export default ZustandSplit;