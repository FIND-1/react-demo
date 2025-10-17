/*
    什么是“浅合并”？
       *  仅合并对象的顶层字段，嵌套对象会被"整体替换"，而非部分更新。

    原理剖析：
     * Zustand 的 `set()` 函数在更新状态时,默认只对状态对象的第一层属性进行合并，
       而不会递归合并嵌套对象（即“深层合并”）

    为什么 Zustand 这么设计？
      1. 性能考虑：深合并需要递归遍历对象，开销大，尤其状态树复杂时。
      2. 可预测性：JavaScript 的展开语法（{...obj}）本身就是浅拷贝，Zustand 遵循这一语义。
      3. 鼓励扁平化状态：React 生态推荐“扁平状态结构”，避免过深嵌套（如 Redux 最佳实践）。

    怎么实现深层次合并？
     详见: ./2_normalDeepUpdate.tsx
*/

// 3: 在组件中使用
import useShallowStore from "../../store/shallowMergeStore.ts";

const ShallowMerge = () => {
    const { count, userInfo, updateCount, updateNameOnly } = useShallowStore();

    return (
        <div>
            <h2>Zustand 浅合并演示</h2>
            <p>Count: {count}</p>
            <p>
                User: {userInfo.name} | Email:{" "}
                {userInfo.email || '❌ 丢失了!'} {/* 若 email 为 undefined，说明更新时未保留 */}
            </p>

            <button onClick={updateCount}>
                更新 Count（安全） {/* 第一层字段，set({ count: x }) 天然安全 */}
            </button>
            <button onClick={updateNameOnly}>
                只更新 Name（危险！） {/* 未展开 userInfo，导致 email 被覆盖 */}
            </button>
        </div>
    );
};

export default ShallowMerge;