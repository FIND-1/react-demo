/*
* 购物车案例
* */
import React, {useCallback, useReducer} from 'react';

// 🍎 水果数据类型定义
interface FruitItem {
    id: number;
    name: string;
    price: number;
    count: number;
    isEdit: boolean;
}

// 初始化数据：三种水果
const initialFruits: FruitItem[] = [
    {id: 1, name: '🍓草莓', price: 5.5, count: 1, isEdit: false},
    {id: 2, name: '🍌 香蕉', price: 3.2, count: 1, isEdit: false},
    {id: 3, name: '🍇 葡萄', price: 12.0, count: 1, isEdit: false},
];

// 🔧 Action 类型（更精确的联合类型）
type FruitAction =
    | { type: 'ADD'; id: number }
    | { type: 'SUB'; id: number }
    | { type: 'DELETE'; id: number }
    | { type: 'EDIT'; id: number }
    | { type: 'UPDATE_NAME'; id: number; newName: string };
// 工具函数：替换数组中指定 id 的 item
const updateItem = (
    items: FruitItem[],
    id: number,
    updater: (item: FruitItem) => FruitItem
): FruitItem[] => {
    return items.map(item => (item.id === id ? updater(item) : item));
};

// 工具函数：删除指定 id 的 item
const deleteItem = (items: FruitItem[], id: number): FruitItem[] => {
    return items.filter(item => item.id !== id);
};

function fruitReducer(state: FruitItem[], action: FruitAction): FruitItem[] {
    switch (action.type) {
        case 'ADD':
            return updateItem(state, action.id, item => ({ ...item, count: item.count + 1 }));

        case 'SUB':
            return updateItem(state, action.id, item =>
                item.count > 1 ? { ...item, count: item.count - 1 } : item
            );

        case 'DELETE':
            return deleteItem(state, action.id);

        case 'EDIT':
            return updateItem(state, action.id, item => ({
                ...item,
                isEdit: !item.isEdit,
            }));

        case 'UPDATE_NAME': {
            const newName = action.newName.trim();
            if (!newName) return state;
            return updateItem(state, action.id, item => ({
                ...item,
                name: newName,
                isEdit: false,
            }));
        }

        default:
            return state;
    }
}


// 🛒 主组件
const AddReducerCart: React.FC = () => {
    const [fruits, dispatch] = useReducer(fruitReducer, initialFruits);

    // ✅ 使用 useCallback 缓存回调函数
    const handleAdd = useCallback((id: number) => {
        dispatch({type: 'ADD', id});
    }, []);

    const handleSub = useCallback((id: number) => {
        dispatch({type: 'SUB', id});
    }, []);

    const handleDelete = useCallback((id: number) => {
        if (window.confirm('确定要删除这个水果吗？')) {
            dispatch({type: 'DELETE', id});
        }
    }, []);

    const handleEdit = useCallback((id: number) => {
        dispatch({type: 'EDIT', id});
    }, []);

    const handleUpdateName = useCallback((id: number, newName: string) => {
        dispatch({type: 'UPDATE_NAME', id, newName});
    }, []);

    // 💰 计算总价
    const totalPrice = fruits.reduce((sum, item) => sum + item.price * item.count, 0);

    return (
        <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
            <h2>useReducer --🛒 水果购物车</h2>
            <table
                cellPadding={8}
                cellSpacing={0}
                width={700}
                border={1}
                style={{
                    borderCollapse: 'collapse',
                    textAlign: 'center',
                    marginTop: '10px',
                }}
            >
                <thead>
                <tr style={{backgroundColor: '#f0f8ff'}}>
                    <th>水果</th>
                    <th>单价 (元)</th>
                    <th>数量</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {fruits.map((item) => (
                    <tr key={item.id} style={{height: '50px'}}>
                        <td align="center">
                            {item.isEdit ? (
                                <input
                                    type="text"
                                    defaultValue={item.name} // ✅ 使用 defaultValue，允许自由输入
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            const newName = e.currentTarget.value.trim();
                                            if (newName) {
                                                handleUpdateName(item.id, newName);
                                            }
                                        }
                                    }}
                                    onBlur={(e) => {
                                        const newName = e.currentTarget.value.trim();
                                        if (newName) {
                                            handleUpdateName(item.id, newName);
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape') {
                                            // 取消编辑：恢复原值并退出编辑模式
                                            e.currentTarget.value = item.name; // 恢复输入框内容
                                            handleEdit(item.id); // 退出编辑
                                        }
                                    }}
                                    autoFocus
                                    style={{padding: '4px', width: '80px', fontSize: '14px'}}
                                />
                            ) : (
                                <span>{item.name}</span>
                            )}
                        </td>
                        <td align="center">{item.price.toFixed(2)}</td>
                        <td align="center">
                            <button
                                onClick={() => handleSub(item.id)}
                                disabled={item.count <= 1}
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    margin: '0 5px',
                                    background: item.count <= 1 ? '#ccc' : '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    cursor: item.count <= 1 ? 'not-allowed' : 'pointer',
                                }}
                            >
                                −
                            </button>
                            <span style={{fontWeight: 'bold'}}>{item.count}</span>
                            <button
                                onClick={() => handleAdd(item.id)}
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    margin: '0 5px',
                                    background: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                }}
                            >
                                +
                            </button>
                        </td>
                        <td align="center">
                            <button
                                onClick={() => handleEdit(item.id)}
                                style={{
                                    padding: '4px 8px',
                                    marginRight: '8px',
                                    background: '#ffc107',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                {item.isEdit ? '保存' : '编辑'}
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                style={{
                                    padding: '4px 8px',
                                    background: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                删除
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={3}></td>
                    <td align="center" style={{fontWeight: 'bold', fontSize: '16px'}}>
                        总价: ¥{totalPrice.toFixed(2)}
                    </td>
                </tr>
                </tfoot>
            </table>

            {fruits.length === 0 && (
                <p style={{color: '#999', marginTop: '20px'}}>🛒 购物车空空如也</p>
            )}
        </div>
    );
};

export default AddReducerCart;