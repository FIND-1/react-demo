import { create } from 'zustand';

interface State {
    // 深层嵌套状态：葫芦娃 + 每个娃的技能和血量
    gourd: {
        oneChild: { name: string; hp: number; skills: string[] };
        twoChild: { name: string; hp: number; skills: string[] };
        // ...其他娃
    };
    // 手动更新：需要层层展开
    healOneChild: () => void;
}

const useManualStore = create<State>((set) => ({
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

    // ❌ 痛点：更新深层字段需手动展开对象嵌套的每一层！
    healOneChild: () =>
        set((state) => ({
            gourd: {
                ...state.gourd, // 展开葫芦娃
                oneChild: {
                    ...state.gourd.oneChild, // 展开大娃
                    hp: state.gourd.oneChild.hp + 20, // 更新血量
                },
            },
        })),
}));

export default useManualStore;