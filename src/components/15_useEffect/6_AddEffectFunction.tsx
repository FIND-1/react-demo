//清理函数应用场景
import React, {useEffect, useState} from "react";
import type {GitHubUser} from "../../types/FetchGitHubUsr.ts";

function AddEffectFunction() {
    const [userId, setUserId] = useState(1); // 假设初始用户ID为1
    const [userData, setUserData] = useState<GitHubUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch(`https://api.github.com/user/${userId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data: GitHubUser) => {
                setUserData(data);
                setLoading(false);
            })
            .catch(error => {
                setError((error as Error).message);
                setLoading(false);
            });
    }, [userId]);

    const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value)) {
            setUserId(value);
        }
    };

    return (
        <div>
            <h2>useEffect --查询用户信息</h2>
            <label>
                输入用户ID:
                <input type="number" value={userId} onChange={handleUserChange} min="1" max="10"
                       style={{width: "300px", padding: "5px"}}/>
            </label>

            {error && <p>错误: {error}</p>}
            <h2>用户信息</h2>
            {userData && !loading && (
                <div>
                    <img src={userData.avatar_url} alt="用户头像" loading={"lazy"}
                         style={{width: "100px", height: "100px"}}/>
                    <p>姓名: {userData.name}</p>
                    <p>地址: {userData.location}</p>
                    <p>仓库地址: <a href={userData.html_url} target="_blank"
                                    rel="noopener noreferrer">{userData.html_url}</a></p>
                    <p>公开仓库数: {userData.public_repos}</p>
                    <p>正在关注数: {userData.following}</p>
                </div>
            )}
            {loading && <p>加载中...</p>}
        </div>
    );
}

export default AddEffectFunction;