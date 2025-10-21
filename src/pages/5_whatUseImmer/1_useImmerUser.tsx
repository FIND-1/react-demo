
/*
     useImmer 是什么？
         *  基于 immer 的 React Hook，允许用“可变”写法安全更新局部状态。
            它封装了 useState 与 immer 的 produce 函数。

     作用：
         *  简化嵌套对象/数组的不可变更新，避免冗长的展开语法。

     怎么使用？
     安装：
         *  npm install immer use-immer   // 需同时安装 immer 和 use-immer（use-immer 是官方轻量封装）。

     <基础语法>:
         *  const [state, updateState] = useImmer(initialState);

     参数:
         *  <initialState>：任意类型的初始状态值（对象、数组、嵌套结构等），作为状态的初始值。
         *  draft 是当前状态的一个“可变代理（mutable proxy）”，
            在 reducer 或更新函数中像修改普通对象一样操作它，
            而 Immer 会在背后自动为你生成一个全新的、不可变的（immutable）状态。
     返回值:
         *  一个包含两个元素的数组：
             - state：当前状态的只读快照（不可变）。
             - updateState：用于更新状态的函数，接受一个“草稿函数”（draft => { ... }）
               或一个新状态值（不推荐用于复杂结构）。

     <典型应用>：
         *  更新深层嵌套对象（如用户资料、配置树）：
         *  修改数组中的某一项：
         *  批量修改多个字段：
         *  与表单、编辑器、拖拽等交互密集型 UI 状态管理结合使用。

     注意事项:
         *  draft 仅在 update 函数内有效，不可"逃逸"使用。
            "逃逸": 不能在 update 函数外使用 draft。
         *  简单状态（如 number、string）建议直接用 useState。

     为什么不能"逃逸"？
         *  draft 是 临时 Proxy 对象，只在 update 执行期间有效；Immer 在 update 结束后会立即销毁这个 Proxy；
            逃逸出去的 draft 要么是“僵尸对象”，要么行为异常（比如 JSON.stringify(draft) 得到 {}）；
            违反了 “纯函数”原则 —— update 应该只描述状态如何变，不产生副作用。

     使用建议:
         *  状态嵌套 ≥2 层或频繁多字段更新时使用。
         *  可与 Zustand（全局）配合，useImmer 专注组件局部状态。

*/


import { useImmer } from 'use-immer';
import { useEffect } from 'react';
// 1. 定义类型
interface Address {
    city: string;
    district: string;
}

interface Profile {
    age: number;
    address: Address;
}

interface User {
    name: string;
    profile: Profile;
}
function UseImmerUser() {
    const [user, setUser] = useImmer({
        name: '张三',
        profile: {
            age: 28,
            address: { city: '深圳', district: '南山区' },
        },
    });

    // ✅ 正确保存方式：用 useEffect 监听 user 变化
    useEffect(() => {
        saveDraft(user); // ← user 是 User 类型，安全！
    }, [user.profile.address.city]);

    // ✅ 安全操作：用 useImmer
    const updateCity = () => {
        setUser(draft => {
            draft.profile.address.city = '上海';
            // 注意：draft 的类型自动是 Draft<User>，不能传出去！
        });
    };
    //  函数参数
    function saveDraft(d: User) {
        localStorage.setItem('saveCity', JSON.stringify(d));
    }

    // ❌ 危险操作：把 draft 逃逸到 ref（典型错误！）
    // const draftRef = useRef<any>(null); // 用来“逃逸”保存 draft
    // const updateCity = () => {
    //     setUser(draft => {
    //         draft.profile.address.city = '上海';
    //         draftRef.current = draft;
    //     });
    //
    //     // ⚠️ 紧接着在 update 外部使用逃逸的 draft
    //     // 这里会出问题！
    //     setTimeout(() => {
    //         try {
    //             // 尝试读取逃逸 draft 的属性 → 可能是 undefined 或 Proxy 行为异常
    //             console.log('逃逸的 draft 城市:', draftRef.current.profile.address.city);
    //             // 尝试 stringify → 可能空对象 {}（在某些 Immer 版本或严格模式下）
    //             const str = JSON.stringify(draftRef.current);
    //             console.log('逃逸 draft 的 JSON:', str);
    //             // 如果你把 {} 存进 localStorage，就丢数据了！
    //             localStorage.setItem('BAD_SAVE', str);
    //         } catch (err) {
    //             console.error('💥 崩溃了！', err);
    //         }
    //     }, 0);
    // };

    return (
        <div className="p-4 border rounded-lg bg-white shadow-sm max-w-md">
            <h2 className="font-bold text-gray-800">useImmer - 修改深层嵌套对象</h2>
            {/*<h2 className="font-bold text-gray-800">useImmer - 💥明显逃逸示例</h2>*/}
            <p className="text-sm text-gray-600 mt-1">
                城市: <span className="font-mono">{user.profile.address.city}</span>
            </p>
            <button
                onClick={updateCity}>
                切换到上海
                {/*触发逃逸（看控制台！）*/}
            </button>
        </div>
    );
}

export default UseImmerUser;