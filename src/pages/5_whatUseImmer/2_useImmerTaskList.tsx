
import { useImmer } from 'use-immer';

 function UseImmerTaskList() {
    const [tasks, setTasks] = useImmer([
        { id: 1, text: '写文档', completed: false },
        { id: 2, text: '修复 bug', completed: true },
        { id: 3, text: 'Code Review', completed: false },
    ]);

    const toggleTask = (id: number) => {
        setTasks(draft => {
            const task = draft.find(t => t.id === id);
            if (task) task.completed = !task.completed;
        });
    };

    return (
        <div className=" my-8 p-4 border rounded-lg bg-white shadow-sm max-w-md">
            <h2 className="font-bold text-gray-800">useImmer(局部) -- 修改数组中的某一项</h2>
            <ul className="mt-2 space-y-2">
                {tasks.map(task => (
                    <li key={task.id} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="rounded"
                        />
                        <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
                          {task.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UseImmerTaskList;