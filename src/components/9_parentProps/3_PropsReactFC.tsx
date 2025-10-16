/**
* React.FC 是一个函数组件的类型声明，它表示一个接受任意属性的函数组件。
      <FC> : Function Component的缩写
  作用:
        1. 提供类型检查: 使用 React.FC 可以确保组件的 props 类型正确，
           避免在使用组件时传递错误的属性类型。
        2. 提供默认属性: 通过设置默认属性，可以确保组件的属性有默认值，
        3. 避免在使用组件时忘记传递某些属性。

  注意事项:
       *   在<React18>之前,React.FC是包含 PropsWithChildren 这个声明,
           <React18+> 后,因为React.FC<T> 类型定义中直接内置了 children?: ReactNode,
           所以在后续使用中: 不推荐使用 React.FC ===> 隐式 children 容易导致错误
      *    推荐写法（现代 React + TypeScript）: 用 ReactElement 替换 React.FC
           相关详情参考 : 4_PropsReactNode

* */

import React from "react";

// 定义组件属性接口
interface UserCardProps {
    name: string;
    age: number;
    email?: string; // 可选属性
    isActive: boolean;
    avatar: string;
    onProfileClick: () => void; // 事件处理函数
    children?: React.ReactNode; // 子元素（在<React18>之后,React.FC不自动包含）
}

// 使用 React.FC 声明函数组件
const UserCard: React.FC<UserCardProps> = ({
   name, age, email = "no-email@example.com", // 设置默认值
    isActive,avatar,onProfileClick, children }) => {
    return (

        <div
            style={{
                border: "1px solid #ccc",
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: isActive ? "#f0f8ff" : "#f5f5f5"
            }}
            onClick={onProfileClick}
        >
            <h2>使用 React.FC 声明函数组件</h2>
            <img
                src={avatar}
                alt={`${name}'s avatar`}
                style={{width: "50px", height: "50px", borderRadius: "50%"}}
            />
            <h3>{name}</h3>
            <p>年龄: {age}</p>
            <p>邮箱: {email}</p>
            <p>状态: {isActive ? "活跃" : "非活跃"}</p>
            {children && <div>{children}</div>}
        </div>
    );
};


export default UserCard;
