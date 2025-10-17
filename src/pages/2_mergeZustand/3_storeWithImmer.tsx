// pages/UserProfilePage.tsx
import React, { useState,useEffect } from 'react';
import userStoreWithImmer from "../../store/userStoreWithImmer.ts";

const StoreWithImmer: React.FC = () => {
    const { user, updateUserName, toggleNotifications, updateUserEmail } = userStoreWithImmer();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    // 同步输入框与 store（可选）
    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
    }, [user.name, user.email]);

    return (
        <div className="p-5 max-w-[400px] mx-auto">
            <h2>immer 的 produce --用户设置</h2>

            <div>
                <label>
                    姓名:
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => updateUserName(name)}
                        className="block w-full mt-1"
                    />
                </label>

                <label className=" mt-3">
                    邮箱:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => updateUserEmail(email)}
                        className="block w-full mt-1"
                    />
                </label>

                <div  className=" mt-3">
                    <label>
                        <input
                            type="checkbox"
                            checked={user.settings.notifications}
                            onChange={toggleNotifications}
                        />
                        接收通知
                    </label>
                </div>

                <details className=" mt-4">
                    <summary>🔍 当前完整状态</summary>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </details>
            </div>
        </div>
    );
};

export default StoreWithImmer;