/*
    useSyncExternalStore 是什么?
       *  useSyncExternalStore 是 React 18 引入的一个 Hook，用于从外部存储（例如状态管理库、浏览器 API 等）获取状态并在组件中同步显示。

    怎么使用?
         * 语法格式: ` const res = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?) `
       参数:
         * <subscribe> ：用来订阅数据源的变化，接收一个回调函数，在数据源更新时调用该回调函数。
         * <getSnapshot>：获取当前数据源的快照（当前状态）。
         * <getServerSnapshot>?：在服务器端渲染时用来获取数据源的快照。
     返回值：该 res 的当前快照，可以在你的渲染逻辑中使用

    <典型应用>：
         * 订阅外部 store 例如(redux,Zustand)
         * 订阅浏览器API 例如(online,storage,location)等
         * 抽离逻辑，编写自定义hooks
         * 服务端渲染支持

   代码示例:
         const subscribe = (callback: () => void) => {
            // 订阅
            callback()
            return () => {
                // 取消订阅
            }
        }

        const getSnapshot = () => {
            return data
        }

        const res = useSyncExternalStore(subscribe, getSnapshot)

  注意事项:
        * 如果 getSnapshot 返回值不同于上一次，React 会重新渲染组件。这就是为什么，如果总是返回一个不同的值，
          会进入到一个“无限渲染”问题。

  怎么解决呢 ?
        * 文档详见: 2_fixGetSnapshot.tsx
        !!! 一定要看完 2_fixGetSnapshot.tsx 后再阅读后续代码/文档!!!
* */

/**
 * 订阅浏览器Api 实现自定义hook(useStorage)
 * @param key  存储到localStorage 的key
 * @param defaultValue  默认值
 */
import { useSyncExternalStore } from "react"

export const useStorage = <T,>(key: string, defaultValue: T): readonly [T, (value: T) => void] => {
    // 缓存当前值，避免重复解析
    let cachedValue: T | null = null;

    const subscribe = (callback: () => void) => {
        window.addEventListener('storage', callback);
        return () => window.removeEventListener('storage', callback);
    };

    const getSnapshot = (): T => {
        try {
            const raw = localStorage.getItem(key);
            const parsed = raw !== null ? JSON.parse(raw) : defaultValue;

            // 仅当值真正变化时才更新缓存
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (cachedValue === null || !deepEqual(cachedValue, parsed)) {
                cachedValue = parsed;
            }

            return cachedValue!;
        } catch (e) {
            console.error('Failed to read from localStorage', e);
            return defaultValue;
        }
    };
    /*
    *
      StorageEvent 是什么?
           * StorageEvent 是一种浏览器事件，用于通知页面中存储数据已发生更改。
      核心作用与机制：
            * 自动触发：当不同页面之间通过 `localStorage` 共享数据时，修改会触发 `StorageEvent`，通知其他页面数据已更新。
            * 不自动触发：在同一个页面中，直接使用 `localStorage.setItem()` 修改数据不会触发此事件。
            * 手动触发的必要性：为了让当前页面中所有依赖 `useStorage` Hook 的组件能实时响应数据变化，
              需要通过 `window.dispatchEvent(new StorageEvent('storage'))` 手动触发该事件，
              模拟跨页面通信，从而强制组件重新渲染。
      参数：
            * <key>手动触发时传递 `key` 参数，可以让监听器知道是哪个特定的存储项发生了变化，从而实现更精确的逻辑处理。
    *
    * */

    const setStorage = (value: T) => {
        try {
            const valueToStore = typeof value === 'function' ? value(getSnapshot()) : value;
            localStorage.setItem(key, JSON.stringify(valueToStore));
            window.dispatchEvent(new StorageEvent('storage', { key }));
        } catch (e) {
            console.error('Failed to write to localStorage', e);
        }
    };

    const value = useSyncExternalStore(subscribe, getSnapshot);

    return [value, setStorage] as const;
};


// 简易深比较（仅适用于简单对象/数组）
function deepEqual(a: never, b: never): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}

