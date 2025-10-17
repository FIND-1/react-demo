import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer'; // ← 关键：引入 immer 中间件

interface State {
    gourd: {
        oneChild: { name: string; hp: number; skills: string[] };
        twoChild: { name: string; hp: number; skills: string[] };
    };
    // 使用 immer 后：直接“修改”状态！
    healOneChild: () => void;
    addSkillToTwoChild: () => void;
}

// 3: 用 immer 包裹 store 创建函数
const useImmerStore = create<State>()(
    immer((set) => ({
        gourd: {
            oneChild: {
                name: '大娃',
                hp: 100,
                skills: ['力大无穷'],
            },
            twoChild: {
                name: '二娃',
                hp: 80,
                skills: ['千里眼', '顺风耳'],
            },
        },

        // ✅ 用 immer：直接赋值，像写 mutable 代码！
        healOneChild: () =>
            set((state) => {
                state.gourd.oneChild.hp += 20; // ← 看起来像直接修改，实际是 immutable！
            }),

        // ✅ 甚至可以修改数组！
        addSkillToTwoChild: () =>
            set((state) => {
                state.gourd.twoChild.skills.push('隐身术'); // immer 会自动处理不可变更新
            }),
    }))
);

export default useImmerStore;