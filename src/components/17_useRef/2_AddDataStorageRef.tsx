
// useRef 实现数据存储
import  {  useState ,useRef} from 'react';
function AddDataStorageRef() {
        // let num = 0  {/*没有使用 userRef, num值没有及时更新*/}
        const num = useRef(0);
        const [count, setCount] = useState(0)
        const handleClick = () => {
            setCount(count + 1)
            num.current = count;
        };
        return (
            <div>
                <h2>useRef --- 数据存储</h2>
                <button onClick={handleClick}>增加</button>
                <div>{count}:{num.current}</div>
            </div>
        );
}


export default AddDataStorageRef;
