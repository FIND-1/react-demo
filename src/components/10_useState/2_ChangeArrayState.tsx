/*
* 数组
    在React中, 需要将数组视为只读的，不可以直接修改原数组，而是要创建一个新数组来反映状态的变化。
    下面是常见数组操作的参考表。

 *    不可用的方法	                     推荐使用的方法
      添加元素 push，unshift	             concat，[...arr] 展开语法(例1)
      删除元素 pop，shift，splice	         filter，slice (例2)
      替换元素 splice，arr[i] = ... 赋值	 map (例3)
      排序元素 reverse, sort	             [...arr].sort() 先复制再排序	 (例4)
*
*
* */

// 例1: 添加元素
import {useState} from "react"
// const AddArrayState = () => {
//     const [list, setList] = useState([1, 2, 3])
//     return (
//         <div>
//             <button onClick={() => setList([...list, list.length + 1])}>
//                 添加元素
//             </button>
//             <ul>
//                 {list.map((item, index) => (
//                     <li key={index}>{item}</li>
//                 ))}
//             </ul>
//         </div>
//     )
// }


// 例2: 删除元素

// const AddArrayState = () => {
//     const [list, setList] = useState([1, 2, 3])
//     return (
//         <div>
//             <button onClick={() => setList(list.filter((item) => item !== 0))}>
//                 删除元素
//             </button>
//             <ul>
//                 {list.map((item, index) => (
//                     <li key={index}>{item}</li>
//                 ))}
//             </ul>
//         </div>
//     )
// }


// 例3: 替换元素

// const AddArrayState = () => {
//     const [list, setList] = useState([1, 2, 3])
//     return (
//         <div>
//             <button onClick={() => setList(list.map((item) => item === 2 ? 20 : item))}>
//                 替换元素
//             </button>
//             <ul>
//                 {list.map((item, index) => (
//                     <li key={index}>{item}</li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// 例4: 排序元素
const AddArrayState = () => {
    const [list, setList] = useState([1, 2, 3])
    return (
        <div>
            <h2>useState --数组排序</h2>
            <button onClick={() => setList([...list].sort((a, b) => b - a))}>
                排序元素
            </button>
            <ul>
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default AddArrayState