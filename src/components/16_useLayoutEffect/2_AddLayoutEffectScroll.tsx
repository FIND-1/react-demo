import  { useLayoutEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../../assets/style/16_useLayoutEffect.css';

// 滚动位置存储
const scrollPositions: { [key: string]: number } = {};

// 列表页
function ListPage() {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const savedPosition = scrollPositions['/list'] || 0;
        window.scrollTo(0, savedPosition);
    }, []);

    const handleItemClick = (id: number) => {
        scrollPositions['/list'] = window.scrollY;
        navigate(`/detail/${id}`);
    };

    return (
        <div className="layout-container">
            <h2>useLayoutEffect --记住滚动位置</h2>
            <p>向下滚动后点击一个商品，再点击“返回”查看效果</p>
            {Array.from({ length: 50 }, (_, i) => (
                <div
                    key={i}
                    onClick={() => handleItemClick(i + 1)}
                    className="item-card"
                >
                    商品 {i + 1}
                </div>
            ))}
        </div>
    );

}

// 详情页
function DetailPage() {
    const navigate = useNavigate();
    return (
        <div style={{ padding: '20px', textAlign: 'center', minHeight: '100vh' }}>
            <h1>商品详情页</h1>
            <p>这里是某个商品的详情内容</p>
            <button onClick={() => navigate(-1)} style={{ padding: '10px 20px', fontSize: '16px' }}>
                ← 返回列表
            </button>
        </div>
    );
}

// 根组件
function AddLayoutEffectScroll() {
    return (
            <Routes>
                <Route path="/" element={<ListPage />} />
                <Route path="/detail/:id" element={<DetailPage />} />
            </Routes>
    );
}


export default AddLayoutEffectScroll;
