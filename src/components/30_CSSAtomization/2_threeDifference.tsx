/*
 * CSS 原子化 / CSS* in* JS / CSS Modules 对比

  CSS 原子化（如 Tailwind）：
      *  思想：用大量微型类（如 `text-red-500`、`p-4`）组合样式。
      *  样式写在 HTML/JSX 的 class 里。
      *  构建时生成 CSS，无运行时开销。
      *  类名全局但无冲突，"性能好"，但 HTML 类名较长。

  • CSS* in* JS（如 styled-components）：
      *  思想：在 JS 中用模板字符串写 CSS。
      *  样式与组件绑定，支持动态 props（如 `${props => ...}`）。
      *  运行时注入样式，有轻微性能开销。
      *  作用域自动隔离，适合动态主题或状态驱动样式。

  • CSS Modules（如 *.module.css）：
      *  思想：给每个 CSS 文件生成唯一类名，实现局部作用域。
      *  写法仍是传统 CSS，只是类名被哈希化（如 .title → .title_x3k9a）。
      *  构建时处理，无运行时开销，调试友好。

 * 典型应用:
   CSS 原子化：
      *  项目标准化程度高（如用 Tailwind）
      *  追求开发速度和极致性能（静态站点、后台系统）

   CSS-in-JS：
      *  样式需根据状态/props 动态变化
      *  开发 React 组件库或需要强封装的 UI

  CSS Modules：
      *  想保留写 CSS 的习惯，又避免命名冲突
      *  项目偏传统或对运行时性能敏感

 使用建议:
    *  三者可混合使用（如 Tailwind + 少量 CSS* in* JS 处理动态部分）。
    *  原子化 ≠ 内联样式；CSS* in* JS ≠ 性能差（现代设备通常无感）。
*/