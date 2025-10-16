// pages/TodoPage.tsx
import React from 'react';
import { useStorage } from './1_useStorage.ts';

// 定义 Todo 类型
type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

const TodoPage: React.FC = () => {
    // 使用 useStorage 持久化 todos
    const [todos, setTodos] = useStorage<Todo[]>('todos', []);

    // 添加新任务
    const addTodo = () => {
        const input = document.getElementById('todo-input') as HTMLInputElement;
        const text = input.value.trim();
        if (!text) return;

        const newTodo: Todo = {
            id: Date.now(), // 简单的 ID 生成（生产环境可用 uuid）
            text,
            completed: false,
        };

        setTodos([...todos, newTodo]);
        input.value = '';
    };

    // 切换完成状态
    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // 删除任务
    const removeTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>useSyncExternalStore案例 -- 🗒 我的待办事项 </h1>

            {/* 输入框 + 添加按钮 */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    id="todo-input"
                    type="text"
                    placeholder="输入新任务"
                    style={{
                        padding: '8px',
                        width: '200px',
                        marginRight: '8px',
                        fontSize: '16px',
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                />
                <button
                    onClick={addTodo}
                    style={{
                        padding: '8px 12px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    添加
                </button>
            </div>

            {/* 待办列表 */}
            {todos.length === 0 ? (
                <p style={{ color: '#666' }}>暂无任务</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px',
                                margin: '4px 0',
                                backgroundColor: '#f9f9f9',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        >
              <span
                  style={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? '#888' : '#333',
                  }}
                  onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
                            <button
                                onClick={() => removeTodo(todo.id)}
                                style={{
                                    padding: '4px 8px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                删除
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* 显示总数 */}
            <p style={{ marginTop: '20px', color: '#666' }}>
                共 {todos.length} 项任务
            </p>

            {/* 提示：打开另一个浏览器标签页测试同步 */}
            <p style={{ fontSize: '12px', color: '#999', marginTop: '40px' }}>
                💡 提示：打开另一个标签页访问此页面，可看到数据实时同步！
            </p>
        </div>
    );
};

export default TodoPage;