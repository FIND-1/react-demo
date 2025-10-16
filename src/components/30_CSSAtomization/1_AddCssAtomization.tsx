/*
  CSS原子化 是什么？
    * 把样式拆分成最小、不可再分的“原子类”（atomic classes），每个类只负责一个单一的样式属性。
    * 它是一种 CSS 架构思想，而不是某个具体工具或库。

  怎么使用？
    * 语法格式: 在 HTML 元素的 class 中直接组合多个原子类，例如：
        <button class="bg-blue-500 text-white px-4 py-2 rounded">按钮</button>
    * 常见类名含义示例：
        - bg-blue-500 → 背景色
        - text-white   → 文字颜色
        - px-4 / py-2  → 水平/垂直内边距
        - rounded      → 圆角

    * 优点:
        1: 样式高度复用，避免重复编写 CSS。
        2: 生成的 CSS 体积极小（仅包含实际用到的类）。
        3: 开发效率高，无需切换文件写样式。
        4: 天然避免类名冲突（命名规范统一）。

    * 缺点:
        1: HTML 类名冗长，可读性较差。
        2: 语义信息弱化（如 .card-header 这类语义类名难以表达）。
        3: 需要记忆大量原子类命名规则。
        4: 对复杂交互或动态主题支持较弱（需额外配置）。

  原理剖析：
    * 原子化框架（如 Tailwind）在构建时扫描项目中所有使用的 class，
      仅生成对应的 CSS 规则，未使用的类不会被打包。
    * 每个原子类对应一条 CSS 声明（如 .text-white { color: #fff; }），
      通过组合实现完整样式，而非写完整组件样式块。

  注意事项：
    * 原子化 ≠ 内联样式：原子类仍是标准 CSS 类，支持媒体查询、伪类等。
    * 避免过度组合类名，可封装常用组合为组件（如用 React 封装 <PrimaryButton>）。
    * 务必配置 PurgeCSS（或 Tailwind 的 content 配置），否则生产包会包含全部类，体积巨大。

  使用建议:
    * 适合中小型项目、快速原型开发或团队熟悉原子化语法的场景。
    * 大型项目建议结合设计系统，通过自定义配置（如 theme、plugins）统一风格。
    * 若需强动态样式（如根据 API 数据变色），可搭配少量 CSS-in-JS 或内联样式补充。

  典型应用：
    * Tailwind CSS：最主流的原子化 CSS 框架。
    * UnoCSS：高性能、按需生成的原子化引擎，支持自定义规则。
    * Windi CSS（已停止维护）：早期 Tailwind 替代方案。
*/


// 使用 Tailwind
//1:安装 npm install tailwindcss @tailwindcss/vite
//2: vite.config.ts页, 并在该页面引入 tailwindcss 插件，然后配置 tailwindcss 插件
//3: 新建一个 src/tailwind.css, 并在 main.ts 页 引入 tailwindcss 的样式
//4: 根据编译器配置对应的插件提示，然后开始使用
  // Vscode / Cursor,安装 TailWind Css 插件
  // webstorm : 新建tailwind.config.js，
    // 内容：
    // /** @type {import('tailwindcss').Config} */
    // module.exports = {
    //     content: [
    //         './index.html',
    //         './src/**/*.{vue,js,ts,js,jsx,tsx}'
    //     ],
    //     theme: {
    //         extend: {},
    //     },
    //     plugins: [],
    // };
    //
// 重启！！

// * 当很多类名堆叠在一起的话，可以 @apply 进行组合使用
// * 语法格式: className { @apply class1 class2 ...}
// 注意是在 src/tailwind.css内定义 apply

import React from "react";

const AddCssAtomization: React.FC = () => {
    return (
        <div>
            <h2> 原子化 CSS --tailwind </h2>
            <div className="blob-bg">
                <p className='blob-text'>
                    tailwind--apply
                </p>
            </div>
        </div>
    );
};

export default AddCssAtomization;