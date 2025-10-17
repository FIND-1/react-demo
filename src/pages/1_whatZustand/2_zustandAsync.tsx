import React from "react";
import useUserStore from "../../store/userStore";

const ZustandAsync: React.FC = () => {
    const { user, loading, error, fetchUser, clearUser } = useUserStore();

    return (
        <div>
            <h2>Zustand — 异步操作封装</h2>

            <button onClick={() => fetchUser(123)} disabled={loading}>
                {loading ? "加载中..." : "获取用户"}
            </button>
            <button onClick={clearUser}>清空</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {user && (
                <p>
                    用户: <strong>{user.name}</strong> (ID: {user.id})
                </p>
            )}
        </div>
    );
};

export default ZustandAsync;
