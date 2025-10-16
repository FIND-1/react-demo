/*
  useCallback 是什么？
     * useCallback 是 React 性能优化的一个 Hook，用于缓存组件内的函数
     * 避免函数的重复创建

  怎么使用？
     * 语法格式：`const memoizedFn = useCallback(fn, deps);`

     参数：
     * <fn>：回调函数。
     * <[deps]>：依赖项，当依赖项变化时才会重新执行。
     返回值: 缓存后的函数(引用值不变,函数的基本操作也可以用)

  原理剖析：
     * 在 React 中，组件每次渲染都会重新创建函数，因此传给子组件的函数引用总是“新”的。
     * React.memo 只会比较 props 的浅层引用，如果函数每次都变，子组件就会重复渲染。
     * useCallback 的本质就是 useMemo(fn, deps) 的语法糖，只不过它返回的是“函数”而不是“值”。
     * 当 deps 发生变化时，才会重新执行 createFn 计算并更新缓存。
     - 因此，useCallback 保证在依赖不变时，返回的函数引用始终相同，从而减少不必要的子组件更新。


  注意事项：
     * 如果函数内部不依赖外部变量，可以不用加 useCallback。
     * 过度使用可能增加复杂度，建议在性能敏感的地方使用。

 <典型应用>：
     * 子组件接收函数作为 props 时（配合 React.memo 避免重复渲染）
     * 需要在依赖项不变时保持函数引用稳定，例如事件处理函数、回调等。


  总结:
     1.要把一个函数传给 React.memo 组件时，一定要用 useCallback！
       否则，函数引用变化 → props 变化 → React.memo 失效！
     2. useCallback 不是阻止函数的重新创建，而是通过依赖项决定是否复用上一次的函数引用，从而保持函数地址稳定。
*/

//案例 :   组件重新渲染时，根据 functionMap.get(changeSearch) 的函数ID 来 记录函数创建的次数
import React, {useCallback, useRef, useState} from 'react';
const functionMap = new WeakMap();

const AddFunctionCallback = () => {
    const counterRef = useRef(1);
    console.log('Render App');
    const [search, setSearch] = useState('');
    // 原本方式
    // const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearch(e.target.value) // 在严格模式下,输入4个数字 ,每次函数ID不一样
    // }

    // 使用 useCallback 后，函数引用保持稳定，避免重复创建
    const changeSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value); // 严格模式下,输入4个数字 ,每次函数ID都一样
    }, []);

    if (!functionMap.has(changeSearch)) {
        functionMap.set(changeSearch, counterRef.current);
        counterRef.current++;
    }

    console.log('函数ID:', functionMap.get(changeSearch));

    return (
        <>
            <h2>useCallback -- 记录回调函数的创建次数</h2>
            <input type="text" value={search} onChange={changeSearch} />
        </>
    );
};

export default AddFunctionCallback;


