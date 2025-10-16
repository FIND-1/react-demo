//组件在挂载的时候就执行了useEffect的副作用函数。
import {useEffect} from "react";
function AddEffectComponentDidMount() {
    // 空依赖数组表示只在组件挂载时执行一次
    useEffect(() => {
        console.log('组件已挂载，useEffect 执行了！');
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>useEffect 在组件挂载时执行</h2>
        </div>
    );
}
export default AddEffectComponentDidMount;