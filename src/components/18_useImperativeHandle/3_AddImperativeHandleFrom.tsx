import React, { useImperativeHandle, useRef, useState } from "react";

interface ChildRef {
    name: string;
    validate: () => {
        isValid: boolean;
        errors: {
            username?: string;
            password?: string;
            email?: string;
        };
    };
    reset: () => void;
}

const Child = React.forwardRef<ChildRef>((_, ref) => {
    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
    });

    // ✅ 新增：错误状态，控制提示显示
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        email: "",
    });

    // 校验函数
    const validate = () => {
        const newErrors = {
            username: !form.username ? "用户名不能为空" : "",
            password: !form.password ? "密码不能为空" : "",
            email: !form.email ? "邮箱不能为空" : "",
        };

        const isValid = Object.values(newErrors).every((error) => !error);

        // ✅ 更新错误状态，让 UI 显示
        setErrors(newErrors);

        return {
            isValid,
            errors: newErrors,
        };
    };

    // 重置函数
    const reset = () => {
        setForm({
            username: "",
            password: "",
            email: "",
        });
        // ✅ 重置时清空错误
        setErrors({
            username: "",
            password: "",
            email: "",
        });
    };

    // 暴露给父组件的方法
    useImperativeHandle(ref, () => ({
        name: "child",
        validate,
        reset,
    }), [form]); // 🔔 依赖 form，确保 validate 捕获最新值（可选优化）

    return (
        <div style={{ marginTop: "20px" }}>
            <p>我是表单组件</p>

            <div>
                <input
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    placeholder="请输入用户名"
                    type="text"
                    style={{ width: "200px", marginBottom: "5px" }}
                    // ✅ 失焦时触发校验
                    onBlur={validate}
                />
                {/* 显示错误 */}
                {errors.username && (
                    <p style={{ color: "red", fontSize: "12px", margin: "0" }}>
                        {errors.username}
                    </p>
                )}
            </div>

            <div>
                <input
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="请输入密码"
                    type="password"
                    style={{ width: "200px", marginBottom: "5px" }}

                />
                {errors.password && (
                    <p style={{ color: "red", fontSize: "12px", margin: "0" }}>
                        {errors.password}
                    </p>
                )}
            </div>

            <div>
                <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="请输入邮箱"
                    type="email"
                    style={{ width: "200px", marginBottom: "5px" }}
                    // ✅ 失焦时触发校验
                    onBlur={validate}
                />
                {errors.email && (
                    <p style={{ color: "red", fontSize: "12px", margin: "0" }}>
                        {errors.email}
                    </p>
                )}
            </div>
        </div>
    );
});

// 必须使用 forwardRef，否则 ref 无法传递
Child.displayName = "Child";

function AddImperativeHandleFrom() {
    const childRef = useRef<ChildRef>(null);
    const showRefInfo = () => {
        console.log(childRef.current);
    };

    const submit = () => {
        const res = childRef.current?.validate(); // ✅ 调用后也会更新 errors 并显示
        console.log(res);
    };
    
    return (
        <div>
            <h2>useImperativeHandle --- 表单组件: 重置/校验</h2>
            <p>我是父组件</p>
            <button onClick={showRefInfo}>获取子组件信息</button>
            <button onClick={submit}>校验子组件</button>
            <button onClick={() => childRef.current?.reset()}>重置</button>
            <hr/>
            <Child ref={childRef}></Child>
        </div>
    );
};

export default AddImperativeHandleFrom;