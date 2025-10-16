/**
 *
  目的：解决 useSyncExternalStore 中因 getSnapshot 返回新引用
     *  导致的“无限渲染”问题，适用于所有自定义 Hook（如 useStorage、useHistory 等）

 核心原则：
     *  getSnapshot 必须是“幂等”的：(只有当“外部状态真正变化”时，getSnapshot 才返回新值)
     *  只要外部状态未变，返回值的引用就不能变。
 */


// ============================================================================
// ✅ 通用解决策略（适用于所有自定义 Hook）
// ============================================================================

/**
 * 🛠 策略 1：优先返回原始不可变值（字符串、数字等）
 *
 * ✅ 适用场景：外部状态本身就是值类型（如 localStorage 字符串、URL、端口等）
 * ✅ 推荐指数：★★★★★
 *
 * 原理：字符串、数字是值比较，相同内容即相等。
 */
const getSnapshot_ValueType = () => {
    return window.location.href; // string，"a" === "a"
};

// 示例：useStorage 中直接返回 JSON 字符串（不 parse）
const getSnapshot_RawString = (key: string) => {
    return localStorage.getItem(key) ?? ''; // 返回 string，稳定
};

// ============================================================================

/**
 * 🛠 策略 2：缓存 + 浅/深比较（适用于对象）
 *
 * ✅ 适用场景：必须返回对象（如 { pathname, search }）
 * ✅ 推荐指数：★★★★☆
 *
 * 原理：手动缓存上一次结果，只在内容真正变化时更新引用。
 */
let cachedResult: { pathname: string; search: string } | null = null;

const getSnapshot_StableObject = () => {
    const current = {
        pathname: window.location.pathname,
        search: window.location.search,
    };

    // 浅比较判断是否变化
    if (
        !cachedResult ||
        cachedResult.pathname !== current.pathname ||
        cachedResult.search !== current.search
    ) {
        cachedResult = current; // 更新缓存
    }

    return cachedResult; // 返回稳定引用
};

// ============================================================================

/**
 * 🛠 策略 3：使用 JSON.stringify 做快照比较（简单对象可用）
 *
 * ✅ 适用场景：对象结构简单，且不频繁更新
 * ⚠️ 注意：仍需缓存引用，避免 JSON.parse 创建新对象
 * ✅ 推荐指数：★★★☆☆
 */
let lastStringifies = '';
let parsedCache: { count: number } = { count: 0 };

const getSnapshot_WithJSON = () => {
    const current = { count: Number(localStorage.getItem('count') || 0) };
    const str = JSON.stringify(current);

    if (str !== lastStringifies) {
        lastStringifies = str;
        parsedCache = current; // 更新缓存引用
    }

    return parsedCache; // 返回相同引用
};

// ============================================================================

/**
 * 🛠 策略 4：封装成通用工具函数（推荐用于多个 Hook 複用）
 *
 * ✅ 适用场景：多个自定义 Hook 都需要稳定 getSnapshot
 * ✅ 推荐指数：★★★★★（中大型项目）
 */
const createStableSnapshot = <T,>(getValue: () => T, isEqual: (a: T, b: T) => boolean) => {
    let lastValue: T | null = null;
    let lastResult: T;

    return (): T => {
        const current = getValue();

        if (lastValue === null || !isEqual(lastValue, current)) {
            lastResult = current;
            lastValue = current;
        }

        return lastResult;
    };
};

// 使用示例：创建稳定的 history 快照
const getStableLocation = createStableSnapshot(
    () => ({
        pathname: window.location.pathname,
        search: window.location.search,
    }),
    (a, b) => a.pathname === b.pathname && a.search === b.search
);
 export  default  {
     getStableLocation ,
     getSnapshot_WithJSON,
     getSnapshot_StableObject,
     getSnapshot_RawString,
     getSnapshot_ValueType
 }
// ============================================================================

/**
 * 🚫 错误做法：禁止在 getSnapshot 中使用 Hook
 *
 * ❌ 原因：getSnapshot 是普通函数，不是 React 组件或 Hook。
 */
/*
const getSnapshot = () => {
  // ❌ 错误！不能在普通函数中使用 useMemo
  // 什么是 useMemo , useMemo 是一个Hook,会缓存函数的返回值 ,类似于 v-memo
  return useMemo(() => ({ data }), [data]);
};
*/


// ============================================================================
// ✅ 总结：最佳实践清单
// ============================================================================

/**
 * | 场景                         | 推荐策略                     |
 * |------------------------------|------------------------------|
 * | 返回 string/number          | 直接返回原始值                |
 * | 返回简单对象                 | 缓存 + 手动比较               |
 * | 返回复杂对象                 | 使用 createStableSnapshot    |
 * | 多个 Hook 共享逻辑           | 抽象成工具函数                |
 * | 怀疑无限循环                 | 打 log 检查调用频率           |
 *
    核心口诀：
         * 不变状态，不换引用	外部数据没变？getSnapshot 就返回同一个对象（引用）
         * 引用一换，渲染不断	返回了新对象？React 就认为变了，会不停重渲染（可能导致无限循环）
 */