// DraggableList.tsx
import { useImmer } from 'use-immer';

function UseImmerDraggable() {
    const [items, setItems] = useImmer([
        { id: 'a', name: '🍎 苹果' },
        { id: 'b', name: '🍌 香蕉' },
        { id: 'c', name: '🍇 葡萄' },
    ]);

    const moveItem = (from: number, to: number) => {
        setItems(draft => {
            const [moved] = draft.splice(from, 1);
            draft.splice(to, 0, moved);
        });
    };

    return (
        <div className=" my-8 p-4 border rounded-lg bg-white shadow-sm max-w-md">
            <h2 className="font-bold text-gray-800">useImmer(局部) -- 交互密集型 UI</h2>
            <ul className="mt-2 space-y-2">
                {items.map((item, index) => (
                    <li
                        key={item.id}
                        className="px-3 py-2 bg-gray-100 rounded cursor-move hover:bg-gray-200 transition"
                        draggable
                        onDragStart={e => e.dataTransfer.setData('from', index.toString())}
                        onDragOver={e => e.preventDefault()}
                        onDrop={e => {
                            e.preventDefault();
                            const from = parseInt(e.dataTransfer.getData('from'));
                            moveItem(from, index);
                        }}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
            <p className="text-xs text-gray-500 mt-2">拖拽项目可调整顺序</p>
        </div>
    );
}

export default UseImmerDraggable;