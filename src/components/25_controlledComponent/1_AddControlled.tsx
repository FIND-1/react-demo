/*
  受控组件 是什么？
    * 表单元素的值由 React 组件状态（state）控制。
    * 通过 `value` 属性绑定数据，并配合 `onChange` 事件同步更新 state。
    * React state 是数据的唯一来源，实现数据与 UI 的双向同步。
    * 适用于需要实时校验、动态控制或复杂交互的表单场景。

  注意事项：
    * 必须同时设置 `value` 和 `onChange`，否则输入框将变为只读。
    * 初始值应使用空字符串或明确值，避免 state 为 undefined/null 导致受控状态切换错误。

  推荐使用：
    * 大多数表单场景应优先使用受控组件，以保证数据流清晰可控。

   总结:
    受控组件 = value + onChange + state	“React 管数据，DOM 跟着变”
*/

import React, { useState } from 'react';

const AddControlled: React.FC = () => {
    const [name, setName] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        // e.target.value = 'xxx'; // ❌ 不要这样做，破坏受控逻辑
        setName(e.target.value);
    };
    //    const handleChange = (e: any) => { ... } // ❌ 类型不安全
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        alert(`提交的值: ${name}`);
    };

    return (
        <div>
            <h2>受控组件</h2>
                <form onSubmit={handleSubmit}>
                <label>
                    请输入名字：
                      {/*<input onChange={handleChange} /> ❌ 错误！缺少 value */ }
                    <input
                        type="text"
                        value={name}
                        onChange={handleChange}
                        placeholder="输入姓名"
                    />
                </label>
                <p>实时预览：{name}</p>
                <button type="submit">提交</button>
            </form>
        </div>
    );
};

export default AddControlled;

