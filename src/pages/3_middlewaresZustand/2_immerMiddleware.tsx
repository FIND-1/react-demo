

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface UserState {
    user: {
        name: string;
        hobbies: string[];
    };
    addHobby: (hobby: string) => void;
    setName: (name: string) => void;
}

const useUserStore = create<UserState>()(
    immer((set) => ({
        user: { name: 'Alice', hobbies: ['reading'] },
        addHobby: (hobby) =>
            set((state) => {
                state.user.hobbies.push(hobby); // 直接“修改” draft
            }),
        setName: (name) =>
            set((state) => {
                state.user.name = name;
            }),
    }))
);

 function ImmerMiddleware() {
    const { user, addHobby, setName } = useUserStore();

    const handleAdd = () => {
        const hobby = prompt('输入新爱好:');
        if (hobby) addHobby(hobby);
    };

    return (
        <div className="p-5 font-sans">
            <h2>Middleware -- immer更新</h2>
            <p>使用“可变”写法更新嵌套状态，无需手动展开。</p>
            <p>姓名: {user.name}</p>
            <p>爱好: {user.hobbies.join(', ')}</p>
            <button onClick={handleAdd}>添加爱好</button>
            <button
                onClick={() => setName('Bob')}
                className='ml-2'
            >
                改名为 Bob
            </button>
        </div>
    );
}

export default ImmerMiddleware;