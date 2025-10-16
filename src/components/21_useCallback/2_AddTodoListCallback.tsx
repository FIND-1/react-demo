import React, { useState, useCallback } from 'react';

// 案例 : todo 列表
// （用 React.memo 优化）前 也就是点击 “撤销”,每次都会打印 "Render TodoItem 1"  "Render TodoItem 2"  "Render TodoItem 3"
// （用 React.memo 优化）后 点击 “撤销”,每次 ,只会打印被移除的任务项
const TodoItem = React.memo(({ todo, onToggle }: { todo: { id: number; text: string; done: boolean }, onToggle: (id: number) => void }) => {

// const TodoItem = ({ todo, onToggle }: { todo: { id: number; text: string; done: boolean }, onToggle: (id: number) => void }) => {
    console.log(`Render TodoItem ${todo.id}`); // 观察是否重复渲染

    const handleToggle = () => {
        onToggle(todo.id);
    };

    return (
        <li style={{ margin: '10px 0', padding: '8px', border: '1px solid #ddd', borderRadius: 4 }}>
          <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
            <button onClick={handleToggle} style={{ marginLeft: 10 }}>
                {todo.done ? '撤销' : '完成'}
            </button>
        </li>
    );
});
// };

// 父组件
const AddTodoListCallback = () => {
    const [search, setSearch] = useState('');
    const [todos, setTodos] = useState([
        { id: 1, text: '学习 React', done: false },
        { id: 2, text: '掌握 useCallback', done: false },
        { id: 3, text: '理解 React.memo', done: false },
    ]);

    // 不使用 useCallback ,回调函数每次渲染都会创建新的函数
    // 同  React.memo 前渲染一致
    // const handleToggle = (id: number) => {
    //     setTodos(prev =>
    //         prev.map(todo =>
    //             todo.id === id ? { ...todo, done: !todo.done } : todo
    //         )
    //     );
    // }

    // ✅ 用 useCallback 缓存回调函数 , 避免重复创建
    // 同  React.memo 后渲染一致
    const handleToggle = useCallback((id: number) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            )
        );
    }, []); // 回调不依赖外部变量，空数组即可

    return (
        <div style={{ padding: 20 }}>
            <h2>✅ useCallback + React.memo 示例</h2>

            {/* 输入框：触发父组件重新渲染 */}
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="输入搜索内容..."
                style={{ padding: 8, fontSize: 16, marginBottom: 20 }}
            />

            {/* 任务列表 */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={handleToggle} // 传入缓存的函数
                    />
                ))}
            </ul>
        </div>
    );
};



export default AddTodoListCallback