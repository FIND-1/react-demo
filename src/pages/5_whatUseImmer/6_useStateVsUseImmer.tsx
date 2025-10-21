
import { useState } from 'react';
import { useImmer } from 'use-immer';

function  UseState() {
    // useState 方式
    const [count1, setCount1] = useState(0);
    return (
        <div className="p-5 border rounded-xl bg-white shadow">
            <h2 className="font-bold text-gray-800 mb-3">useState</h2>
            <p className="text-4xl font-mono my-4">{count1}</p>
            <div className="flex gap-2">
                <button
                    onClick={() => setCount1(c => c + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    +1
                </button>
                <button
                    onClick={() => setCount1(c => c - 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    -1
                </button>
                <button
                    onClick={() => setCount1(0)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    重置
                </button>
            </div>
        </div>
    )
}

function  UseImmer() {
    // useImmer 方式
    const [count2, setCount2] = useImmer(0);

    return (
        <div className="p-5 border rounded-xl bg-white shadow">
            <h2 className="font-bold text-gray-800 mb-3">useImmer</h2>
            <p className="text-4xl font-mono my-4">{count2}</p>
            <div className="flex gap-2">
                <button
                    onClick={() => setCount2(draft => draft + 1)} // draft 是 number
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    +1
                </button>
                <button
                    onClick={() => setCount2(draft => draft - 1)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    -1
                </button>
                <button
                    onClick={() => setCount2(0)} // 也可直接赋值
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    重置
                </button>
            </div>
        </div>
    )
}

function UseStateVsUseImmer() {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2>useState vs useImmer（基本类型）</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* useState */}
                <UseState/>
                {/* useImmer */}
                <UseImmer/>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
                💡 对基本类型（number/string/boolean），<code>useImmer</code> 的 <code>draft</code> 就是当前值本身（不是
                Proxy），可直接运算。
                行为与 <code>useState</code> 一致，但 API 风格不同。
            </div>
        </div>
    );
}

export default UseStateVsUseImmer;