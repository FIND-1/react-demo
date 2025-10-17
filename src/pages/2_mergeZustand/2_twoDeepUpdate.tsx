/*
  什么是 Immer？
     是一个允许以“可变”方式编写代码，却能生成不可变（immutable）更新 的库。
     在 Zustand 中，通过 `zustand/middleware/immer` 中间件集成后，
     可以在 `set()` 回调中直接“修改”状态对象，而无需手动展开嵌套结构。

   immutable是什么意思?
      不可变: 状态对象一旦创建，就永远不能被修改 任何“更新”都必须通过创建一个全新的对象来实现。

   简而言之: Zustand + immer 中间件：让 set 支持 Immer 语法

   怎么使用:
      1. 安装依赖：npm install immer
      2. 导入：import { immer } from 'zustand/middleware/immer'
         详见: '../../store/immerDeepUpdate'

   原理剖析：
       *  Immer 使用 JavaScript Proxy 拦截对状态对象的“修改”操作。
       *  它在内部自动构建一个"全新的、不可变的状态副本"，确保 React 能正确触发重渲染。

   为什么需要 Immer？
       *  当状态结构较深（如 gourd.oneChild.hp）时，手动展开（...state.gourd.oneChild）非常繁琐。
       *  容易遗漏字段，导致数据意外丢失（浅合并陷阱）。
       *  Immer 让深层更新代码更简洁、可读、不易出错。

  <典型应用>：
       *  更新嵌套对象的某个字段
          state.user.profile.name = 'New Name';
       *  修改数组（push, splice, sort 等）
          state.items.push(newItem);

       *  条件性更新深层状态
         if (state.gourd.sevenChild.isAwakened) {
          state.gourd.sevenChild.power += 100;
         }

       *  复杂表单状态管理（如多级嵌套的表单项）

   注意事项：
      1. 不要在 Immer 回调中返回新对象,因为Immer 创建的“新对象”的状态是 “immutable”。
         ❌ 错误：set((state) => ({ ...state, user: newUser }))
         ✅ 正确：set((state) => { state.user = newUser })
         → 在 immer 模式下，应直接“修改” state，而不是返回新对象。

       2. 仅修改传入的 `state` 对象
         不要创建局部变量再赋值，否则 Immer 无法追踪变更：
         ❌ 错误：
            const user = state.user;
            user.name = 'Bob'; // Immer 无法代理这个引用！
        ✅ 正确：
            state.user.name = 'Bob';

       3. 性能权衡
          Immer 在极深或极大对象上可能有轻微性能开销（通常可忽略），
          但对于绝大多数应用，其带来的开发体验提升远大于成本。

       4. 不能与返回式 set 混用
          在同一个 store 中，要么全部用 immer 的“修改式”，
          要么不用 immer —— 不要混用两种风格，避免混淆。

   使用建议：
       *  状态结构超过 2 层嵌套时，优先考虑使用 immer。
       *  保持状态尽量扁平仍是首选，immer 是“复杂嵌套时的优雅退路”。

   immer 还能用在 Zustand 的其他地方吗？
      详见: ./3_storeWithImmer.tsx
*/
import useManualStore from '../../store/manualDeepStore.ts';
import useImmerStore from '../../store/immerDeepStore.ts';

const TwoDeepUpdate = () => {
    // 手动更新示例
    const { gourd: g1, healOneChild: heal1 } = useManualStore();
    // Immer 更新示例
    const { gourd: g2, healOneChild: heal2, addSkillToTwoChild } = useImmerStore();

    return (
        <div style={{ display: 'flex', gap: '40px', padding: '20px' }}>
            {/* 手动更新 */}
            <div style={{ border: '1px solid #ccc', padding: '15px' }}>
                <h3>🔧 手动深层更新</h3>
                <p>大娃血量: {g1.oneChild.hp}</p>
                <button onClick={heal1}>给大娃加血（+20）</button>
                <p>✅ 正确但代码啰嗦</p>
            </div>

            {/* Immer 更新 */}
            <div style={{ border: '1px solid #999', padding: '15px' }}>
                <h3>✨ Immer 深层更新</h3>
                <p>大娃血量: {g2.oneChild.hp}</p>
                <p>二娃技能: {g2.twoChild.skills.join(', ')}</p>
                <button onClick={heal2}>给大娃加血（+20）</button>
                <button onClick={addSkillToTwoChild}>给二娃加技能</button>
                <p>✅ 代码简洁，像直接修改对象！</p>
            </div>
        </div>
    );
};

export default TwoDeepUpdate;
