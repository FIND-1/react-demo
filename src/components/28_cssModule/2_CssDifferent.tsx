/*
  * CSS Modules vs Vue scoped CSS —— 原理与对比

 CSS Modules 原理:
    * 核心："构建时"将类名哈希化（如 .root → Button_root__abc123），实现局部作用域。
    * 实现：通过 Webpack/Vite 的 css-loader（modules: true）处理 .module.css 文件。
    * 使用：import styles from './xxx.module.css'，然后用 styles.root 作为 className。
    * 优点：
        - 真隔离，无冲突
        - 支持样式组合（composes）
        - 可生成 TypeScript 类型
        - 跨框架通用（React/Vue/原生）

  Vue scoped 原理:
    * 核心："编译时"给组件 DOM 添加唯一属性（如 data-v-f3f423a1），
            并将 CSS 选择器转为属性选择器（.root[data-v-xxx]）。
    * 仅适用于 Vue 单文件组件（SFC）。
    * 优点：写法简单，深度选择器支持好（::v-deep）。

  关键区别:
    |                | CSS Modules             | Vue scoped             |
    |----------------|-------------------------|------------------------|
    | 机制            | 重命名类名                | 添加属性选择器           |
    | 作用域          | 类名唯一                  | 属性唯一                |
    | 框架支持         | 通用（React/Vue/JS）     | 仅 Vue SFC             |
    | 样式穿透         | 不支持（需全局样式）       | 支持（::v-deep）        |
    | 可组合性         | ✅ 支持 composes        | ❌ 不支持               |
    | TypeScript      | ✅ 可生成类型            | ❌ 无类型支持            |

  总结:
    * 它们目标相同（样式隔离），但实现完全不同。
    * React 项目推荐 CSS Modules 或 CSS-in-JS。
    * Vue 项目可用 scoped（简单）或 CSS Modules（更规范、可复用）。
    * Vue 也支持 CSS Modules：通过 <style module> 使用。
*/

// Button.tsx
import React from 'react';
import styles from './Button.module.css';
interface Props {
    primary?: boolean
    children?: React.ReactNode
}

/**
 * 一个使用 CSS Modules 的按钮组件
 * - 样式定义在 Button.module.css 中
 * - 通过 styles.root 引用局部类名
 */
const Button: React.FC<Props> = (props) => {
    return (
        <button className={`${styles.root} ${props.primary ? styles.primary : ''}`}>
            {props.children}
        </button>
    );
};

export default Button;