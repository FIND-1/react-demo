/*
  非受控组件 是什么？
    * 表单元素的值由 DOM 自身管理，而非 React state。
    * 使用 `defaultValue` 设置初始值，通过 `ref` 在需要时读取当前值。
    * 适用于仅需提交时获取值、性能敏感或集成原生 DOM 的场景（如文件上传）。

  注意事项：
    * 不能通过 state 动态修改其值，灵活性较低。
    * 避免与受控模式混用（如同时使用 value 和 defaultValue）。

  推荐使用：
    * 简单输入、文件输入（<input type="file" />）、第三方非 React 组件集成。

  总结:
    非受控组件 = ref + defaultValue	“DOM 管数据，React 去读它”
*/

import React, { useRef } from 'react';

const AddUncontrolled: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const value = inputRef.current?.value ?? '';
        alert(`当前输入值: ${value}`);
    };

    return (
        <div>
            <h2>非受控组件</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    用户名：
                    <input
                        type="text"
                        defaultValue="请输入用户名"
                        ref={inputRef}
                    />
                </label>
                <button type="submit">提交</button>
            </form>
        </div>
    );
};

export default AddUncontrolled
