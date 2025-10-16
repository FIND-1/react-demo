import { useEffect, useState } from 'react';
import type {GitHubUser} from "../../types/FetchGitHubUsr.ts";
// 网络请求案例
function AddEffectFetch() {
    const [userData, setUserData] = useState<GitHubUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('https://api.github.com/users/octocat')
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
    }, []);

    if (loading) {
        return <div style={{ padding: '20px' }}>Loading user data...</div>;
    }

    if (error) {
        return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
    }

    if (!userData) {
        return <div style={{ padding: '20px' }}>No user data available</div>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>useEffect 网络请求</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                <img
                    src={userData.avatar_url}
                    alt={`${userData.name}'s avatar`}
                    style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
                <div>
                    <h2>{userData.name || userData.login}</h2>
                    <p>Username: {userData.login}</p>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <p><strong>Bio:</strong> {userData.bio || 'No bio available'}</p>
                <p><strong>Location:</strong> {userData.location || 'Not specified'}</p>
                <p><strong>Company:</strong> {userData.company || 'Not specified'}</p>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
                <div><strong>Public Repos:</strong> {userData.public_repos}</div>
                <div><strong>Followers:</strong> {userData.followers}</div>
                <div><strong>Following:</strong> {userData.following}</div>
            </div>

            <div style={{ marginTop: '20px' }}>
                <a
                    href={userData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        backgroundColor: '#000',
                        color: '#fff',
                        padding: '10px 20px',
                        textDecoration: 'none',
                        borderRadius: '5px'
                    }}
                >
                    View on GitHub
                </a>
            </div>
        </div>
    );
}

export default AddEffectFetch;